/**
* gulp打包
*/

var gulp = require("gulp");
var cssnano = require('gulp-cssnano');//-压缩css
var connect = require('gulp-connect'); //创建web服务器
var watch = require('gulp-watch');//监听文件变化
var less = require('gulp-less');//less
var uglify = require('gulp-uglify');//js压缩混淆
var concat = require('gulp-concat');//文件合并all-in-one
var path = require('path');
//var browserSync = require('browser-sync').create(); //浏览器同步测试工具

//路径配置

/* js */
var _js_dir = [
	"src/lib/js/jquery-1.11.0.min.js",
	"src/lib/js/json2.js",
	"src/lib/js/underscore-min.js",
	"src/lib/js/backbone-min.js",
	"src/lib/js/backbone.localStorage-min.js",
	"data.js",
	"src/js/*.js"
	
];//js文件

var _js_dist_dir = "dist/js/";//js导出目录
var _js_min_name = "app.js";//压缩后的js名称

/* css */
var _css_dir = [
	"src/css/*.css"
];//css文件

var _less_dir = ["src/less/*.less"]; //less文件路径

var _css_dist_dir = "dist/css/";//css导出目录
var _css_min_name = "app.min.css";//压缩后的css名称

/* html */
var _html_dir = [
	"src/*.html"
];//html文件

var _html_dist_dir = "dist/";//html导出目录

//web 服务器
gulp.task("web",function(){
	console.log("开始搭建服务器")
	connect.server({
		port: 4300,
		root:"dist",
		livereload: true
	});
});

//刷新任务
gulp.task("reload",function(){
	console.log("开始刷新")
	gulp.src([
		"src/*.html"//需要的页面
	]).pipe(connect.reload());
});

//文件监听任务
gulp.task("watch",function(){
	console.log("文件变化,浏览器刷新")
	gulp.watch([
		"src/*.html",
		"src/js/*.js",
		"data.js",
		"src/less/*.less"
	],["less","cssTask","jsTask","htmlTask","reload"]);
});

//编译less为css
gulp.task("less",function () {
	console.log("开始编译less")
	gulp.src(_less_dir)
	.pipe(less())
	.pipe(gulp.dest('src/css'))
})

//css压缩任务
gulp.task("cssTask",function(){
	console.log("开始执行css压缩任务");
	gulp.src(_css_dir)
	.pipe(concat(_css_min_name))//合并css
	.pipe(cssnano())//压缩css
	.pipe(gulp.dest(_css_dist_dir));//处理得到的css文件发布到对应目录
});

//js压缩任务
gulp.task("jsTask",function(){
	console.log("开始执行js压缩混淆任务",_js_dist_dir);

	gulp.src(_js_dir)
	.pipe(concat(_js_min_name))//合并js
	.pipe(uglify())//压缩混淆
	.on("error",function(error){
		console.log("压缩js报错:",error);
	})//报错忽略
	.pipe(gulp.dest(_js_dist_dir));//处理得到的js文件发布到对应目录
});

//html转移任务
gulp.task("htmlTask",function(){
	console.log("开始执行html和静态文件转移任务");
	//html
	gulp.src(_html_dir)
	.pipe(gulp.dest(_html_dist_dir));//处理得到的html文件发布到对应目录
});

gulp.task('default',["less","cssTask","jsTask","htmlTask","web","watch"]);//默认任务
gulp.task('build',["less","cssTask","jsTask","htmlTask"]);//发布任务,进行less编译css压缩,js压缩
