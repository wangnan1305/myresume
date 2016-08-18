var data = [
	{
		module:"header",
		data:[
			{
				name:"王楠",
				target_job:"前端开发工程师/实习",
				phone:"13797079445",
				qq:"453261940",
				email:"453261940@qq.com",
				github:"https://github.com/wangnan1305",
				blog:"http://wangnan1305.github.io/"
			}
		]
	},
	{
		module:"university_information",
		data:[
			{
				university:"武汉理工大学",
				graduation:"本科（2013-2017）"
			}
		]
	},
	{
		module:"expreience",
		data:[
			{
				title:"金山wps安卓研发部",
				time:"2016.07-09",
				position:"前端开发（实习）",
				task:[
					"参与开发`Hybrid APP wps`的书城项目和导购项目的开发，项目使用`gulp`自动化构建工具和`Git`版本控制",
					"解决外部系统遗留的 bug 及浏览器兼容问题（IE7+）",
					"使用`SVG`等技术开发内部系统数据可视化图表"
				]
			},
			{
				title:"武汉益行人",
				time:"2016.04-07",
				position:"前端开发（实习）",
				task:[
					"参与某集团内部办公系统**（OA）**的前端开发，基于 `jQuery UI` 与 `Bootstrap` 实现前端组件及数据交互",
					"解决遗留的 bug 及浏览器兼容问题（IE8+）",
					"使用 `Grunt` 及 `Less `完成皮肤开发"
				]
			},
			{
				title:"山西阿法尔",
				time:"2015.12-2016.01",
				position:"前端开发（实习）",
				task:[
					"负责公司官网开发及网站后台维护",
					"使用`bootstrap`搭建了公司后台管理系统",
					"解决遗留的 bug 及浏览器兼容问题（IE8+）"
				]
			},
			{
				title:"Resume",
				task:[
					"这份在线简历的生成器",
					"从data.js中读取数据，使用`Backbone.js`构建并渲染`ejs`模板生成HTML，`Less` 生成响应式样式",
					"使用 `Gulp` 驱动页面生成、压缩合并转移文件、架设本地服务器、帮助部署到 GitHub Pages"
				]
			},
			{
				title:"Simple book storage system",
				task:[
					"一个简易的图书存储系统，RESful风格的Backbone应用程序",
					"使用backbone+node+mongoDB",
					"能够从mongoDB中获取，添加，更新，删除书籍信息并渲染到页面"
				]
			},
			{
				title:"网易云课堂",
				task:[
					"网易云课堂前端工程师微专业-大作业使用原生js，运用了ajax，cookie以及基础的切图，div+css布局"
				]
			}
		]
	},
	{
		module:"skill",
		data:[
			{
				title:"Web前端",
				data:[
					{
						title:"HTML/CSS",
						description:[
							"能够编写语义化的 HTML，模块化的 CSS，实现较复杂的布局与动画",
							"熟悉已标准化的 `HTML5 / CSS3` 新特性，实验项目中能尝试使用未广泛实现的新标准"
						]
					},
					{
						title:"ECMAScript",
						description:[
							"熟悉 ECMAScript（JavaScript），对 JavaScript 引擎及相关 JIT 技术有一定的了解",
							"了解 ECMAScript 新标准与相关后处理工具并能在项目中使用"
						]
					},
					{
						title:"DOM / BOM 及常见 Web API",
						description:[
							"熟悉原生 DOM 与 BOM 的使用及相关标准（W3C / WHATWG），有桌面 / 移动端前端组件的开发经验",
							"对 WebGL / Web Workers / WebSocket / Web Components / SVG 等 API 有一定的使用经验",
							"阅读过 WebKit / Blink 源码中的部分实现，了解常见的 Web API 兼容性问题及其解决方案"
						]
					},
					{
						title:"前端工程实践",
						description:[
							"使用 Meteor / AngularJS / Polymer 编写过简单的 CRUD SPA，了解 Backbone.js / React 及前端 MV* 模型",
							"熟悉 jQuery / jQuery UI / Bootstrap 的使用、定制与扩展, 阅读过部分源代码",
							"在项目中使用过 Sea.js / RequireJS / Browserify / Bower / WebPack 等多种模块化解决方案",
							"在项目中使用过 Less / Sass / PostCSS / CoffeeScript / TypeScript 等预处理/后处理工具"
						]
					}
				]
			},
			{
				title:"Web后端",
				data:[
					{
						title:"Node.js",
						description:[
							"能够使用 Node.js API / Express / Koa 搭建简单的后端程序与数据库交互、渲染模板及提供 RESTful API",
							"了解异步 I/O 及事件驱动的服务器模型，掌握常见的异步编程解决方案",
							"能编写简单的 Express / Connect / Koa 中间件，使用 Mocha 与 Chai 编写单元测试"
						]
					},
					{
						title:"其他",
						description:[
							"使用 Tornado / Flask（Python） 搭建过简单的服务器",
							"有使用 MongoDB / MySQL 数据库，Redis 缓存，nginx 反向代理的经验"
						]
					}
				]
			}
		]
	}
]

//将md语法``和**替换成标签
function replace(data) {
	data.forEach(function(item, index) {
		item.data.forEach(function(item2, index2) {
			if (item2.task) {
				item2.task.forEach(function(item3, index3) {
					item2.task[index3] = item3.replace(/`(.+?)`/g, '<strong>$1</strong>')
						.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
				})
			}
		})
	});
	return data;
}
var data_handle = replace(data);






