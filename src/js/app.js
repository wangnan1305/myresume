$(function(){
	//
	console.log("index");

	//主事件监听
	var mediator = {};
	_.extend(mediator,Backbone.Events);

	var GO_TO_MAIN_PAGE_EVENT = "goToMainPage";//去主页

	//页面信息基类Model
	var MyInfo = Backbone.Model.extend({
		defaults:{}
	});
	//我的信息
	var MyInfoView = Backbone.View.extend({
		tagName:"header",
		className:"title",
		template:_.template($("#resume_header").html()),
		initialize:function () {
			//...
		},
		render:function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	//左栏学校信息
	var MyInfoUniversityView = Backbone.View.extend({
		tagName:"section",
		className:"basic",
		template:_.template($("#university_information").html()),
		initialize:function () {
			// body...
		},
		render:function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	//左栏实习经验
	var MyInfoExeprience = Backbone.View.extend({
		tagName:"section",
		className:"work",
		template:_.template($("#exeprience").html()),
		initialize:function () {
			//body...		
		},
		render:function (argument) {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	//右栏技能清单
	var MySkillDetail = Backbone.View.extend({
		tagName:"section",
		className:"skill",
		template:_.template($("#skill").html()),
		initialize:function () {
			// body...
		},
		render:function (argument) {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var PageBaseView = Backbone.View.extend({
		tagName:"main",
		show:function () {
				
		},
		destroy:function(){
			this.remove();
		}
	});

	//页面数据对象
	var PageModel = Backbone.Model.extend({
		defaults:{
			pageid:null,
			data:null
		}
	});
	
	//首页视图
	var MainPage = PageBaseView.extend({
		template:_.template($("#resume_container").html()),
		events:{
			//事件
		},
		initialize:function(){
			//初始化
		},
		render: function() {
			//渲染

			this.$el.html(this.template(this.model.toJSON()));
			this.leftBlock = this.$(".left");
			this.rightBlock = this.$(".right");
			this.container = this.$(".resume_container");
			this.contentBlock = this.$(".content_important");

			this.container.append(this.drawHeader(data_handle[0]["header"], data_handle[0]["data"] || "").render().el);
			
			_.each(data_handle, function(item, index) {
				if(item["module"] === "university_information" || item["module"] === "expreience"){
					this.leftBlock.append(this.drawItemView(item["module"], item["data"] || "").render().el);
				}
				if(item["module"] === "skill"){
					console.log(item["data"])
					this.rightBlock.append(this.drawItemView(item["module"], item["data"] || "").render().el);
				}
			}, this);

			this.contentBlock.append(this.leftBlock);
			this.contentBlock.append(this.rightBlock);
			this.container.append(this.contentBlock)

			return this;

		},
		drawItemView:function (module,data,title) {
			//根据模块类型创建视图
			var itemView;
			var itemModel = new MyInfo({data:data});
			
			switch(module)
			{
				case "university_information":
					itemView = new MyInfoUniversityView({model:itemModel});
				break;
				case "expreience":
					itemView = new MyInfoExeprience({model:itemModel});
				break;
				case "skill":
					itemView = new MySkillDetail({model:itemModel});
				break;
			}
			return itemView;
		},
		drawHeader:function(module,data,title){
			
			var itemView;
			var itemModel = new MyInfo({data:data});

			itemView = new MyInfoView({model:itemModel});

			return itemView;

		}
	});

	//app
	var AppView = Backbone.View.extend({
		el:"html",
		events:{

		},
		initialize:function(){
			//初始化
			mediator.on(GO_TO_MAIN_PAGE_EVENT,this.goToMainPage,this);

			this.pages = [];

			this.container = this.$("body");

			this.mainview = new MainPage({
				model:new PageModel()
			});


			this.pages.push(this.curview);
		},
		goToMainPage:function(){
			//去主页
			if(this.mainview && this.curview != this.mainview)
			{
				if(this.curview) this.curview.destroy();//上一页面移除

				this.curview = this.mainview;

				this.container.append(this.mainview.render().el);
				this.mainview.show();
			}
		}
	});

	var Router = Backbone.Router.extend({
		routes:{
			//路径
			"":"main"
		},
		main:function(){
			mediator.trigger(GO_TO_MAIN_PAGE_EVENT);
		}
	});


	var appView = new AppView();
	
	var router = new Router();//路由
	//路由开始
	var history = Backbone.history.start();
	console.log("history:",history);
});
