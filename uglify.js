var UglifyJS = require("uglify-es");
var fs = require("fs");
var path = require("path");
console.dir("打包中.................");

deleteall("./dist/assets/js");
deleteFile("./dist", "app.js.map");
// 压缩
var files = fs.readdirSync(__dirname + "/dist");
// 过滤出.js文件:
var js_files = files.filter(f => {
	return f.endsWith(".js");
});
// 处理每个js文件:
for (var f of js_files) {
	if (f.indexOf("app") > -1) {
		f = f.split("/");
		f = f[f.length - 1];
		var paths = path.join(__dirname, "./dist/", f);
		fs.readFile(paths, "utf8", function(err, data) {
			if (err) return console.log(err);
			// console.log(data);
			var options = {
				toplevel: true,
				compress: {
					// global_defs: {
					//     "@console.log": "alert", //全局替换
					// },
					warnings: false,
					// drop_console: true, // 过滤 console
					drop_debugger: true, // 过滤 debugger
					passes: 1 // 运行压缩的最大次数,压缩代码次数越多时间越久,效果越好
				},
				output: {
					beautify: false,
					preamble: "/* uglified */"
				}
			};
			var result = UglifyJS.minify(data, options);
			fs.writeFile(paths, result.code, "utf8", () => {
				console.dir("压缩完成！！！！！！！！！！！！！");
			});
		});
	}
}

// 删除指定文件夹
function deleteall(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) {
				// recurse
				deleteall(curPath);
			} else {
				// delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}
// 删除某一个包下面的需要符合格式的文件。
function deleteFile(url, name) {
	var files = [];

	if (fs.existsSync(url)) {
		//判断给定的路径是否存在

		files = fs.readdirSync(url); //返回文件和子目录的数组

		files.forEach(function(file, index) {
			var curPath = path.join(url, file);

			if (fs.statSync(curPath).isDirectory()) {
				//同步读取文件夹文件，如果是文件夹，则函数回调
				deleteFile(curPath, name);
			} else {
				if (file.indexOf(name) > -1) {
					//是指定文件，则删除
					fs.unlinkSync(curPath);
					// console.log("删除文件：" + curPath);
				}
			}
		});
	} else {
		console.dir("删除文件给定的路径不存在！");
	}
}

var files2 = fs.readdirSync(__dirname + "/dist/assets/css");
// 过滤出.js文件:
var css_files2 = files2.filter(f => {
	return f.endsWith(".map");
});
for (var f of css_files2) {
	if (f.indexOf("app") > -1) {
		f = f.split("/");
		f = f[f.length - 1];
		deleteFile("./dist/assets/css", f);
	}
}
