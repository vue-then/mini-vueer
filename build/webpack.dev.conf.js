'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap,
			usePostCSS: true
		})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,

	// these devServer options should be customized in /config/index.js
	devServer: {
		clientLogLevel: "warning",
		historyApiFallback: true,
		hot: true,
		compress: true,
		host: process.env.HOST || config.dev.host,
		port: process.env.PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay
			? {
					warnings: false,
					errors: true
			  }
			: false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll
		},
		proxy: {
			"/app/api/v2": {
				target: "https://zzya.aabb.com",
				// pathRewrite: { "^/app": "" },
				ws: false,
				changeOrigin: true, //是否跨域
                secure: false // true设置支持https协议的代理 false设置证书免校验
			}
		},
		disableHostCheck: true,
		/**
		 * axios
		 */
		before(app) {
			// app.post("/app/api/v2", function(req,res) {
			//     var url = "https://zzya.pkbeta.com";
			//     axios.post(url, {
			//         headers: {
			//             referer: 'https://c.y.qq.com/',
			//             host: 'c.y.qq.com'
			//         },
			//         params: req.query
			//     }).then((response) => {
			//         res.json(response.data)
			//     }).catch((e) => {
			//         console.log(e)
			//     })
			// });
			// 获取推荐页面列表
			app.get("/api/getDiscList", function(req, res) {
				var url =
					"https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
				axios
					.get(url, {
						headers: {
							referer: "https://c.y.qq.com/",
							host: "c.y.qq.com"
						},
						params: req.query
					})
					.then(response => {
						res.json(response.data);
					})
					.catch(e => {
						console.log(e);
					});
			});
			// 获取歌词
			app.get("/api/lyric", function(req, res) {
				var url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
				axios
					.get(url, {
						headers: {
							referer: "https://c.y.qq.com/",
							host: "c.y.qq.com"
						},
						params: req.query
					})
					.then(response => {
						var ret = response.data;
						// 字符串转换成json对象
						if (typeof ret === "string") {
							var reg = /^\w+\(({[^()]+})\)$/;
							var matches = ret.match(reg);
							if (matches) {
								ret = JSON.parse(matches[1]);
							}
						}
						res.json(ret);
					})
					.catch(e => {
						console.log(e);
					});
			});
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": require("../config/dev.env")
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: true
		})
	]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
