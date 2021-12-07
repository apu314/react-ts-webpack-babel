// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require("html-webpack-plugin");
// If your plugin is using html-webpack-plugin as an optional dependency
// you can use https://github.com/tallesl/node-safe-require instead:
// const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class HtmlWebpackPluginMiddleware {
    apply(compiler) {
        console.log("[ compiler ] ---> ", { compiler });

        compiler.hooks.compilation.tap('HtmlWebpackPluginMiddleware', (compilation) => {
            console.log('The compiler is starting a new compilation...');

            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'HtmlWebpackPluginMiddleware', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    console.log("[ HtmlWebpackPluginMiddleware - headTags ] ---> ", data.headTags);
                    console.log("[ HtmlWebpackPluginMiddleware - bodyTags ] ---> ", data.bodyTags);

                    /* data.headTags = {
                        tagName: '',
                        voidTag: false,
                        meta: { plugin: 'HtmlWebpackPluginMiddleware' },
                        attributes: {
                            
                        }
                    } */

                    // Tell webpack to move on
                    cb(null, data);
                }
            );

            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                'HtmlWebpackPluginMiddleware', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    console.log("[ HtmlWebpackPluginMiddleware - assets.js ] ---> ", data.assets.js);

                    /* data.headTags = {
                        tagName: '',
                        voidTag: false,
                        meta: { plugin: 'HtmlWebpackPluginMiddleware' },
                        attributes: {
                            
                        }
                    } */

                    // Tell webpack to move on
                    cb(null, data);
                }
            );

            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
                'HtmlWebpackPluginMiddleware', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    console.log('[ afterTemplateExecution ]');
                    console.log("[ HtmlWebpackPluginMiddleware -  html ] ---> ", data.html);
                    console.log("[ HtmlWebpackPluginMiddleware - bodyTags ] ---> ", data.bodyTags);

                    /* data.headTags = {
                        tagName: '',
                        voidTag: false,
                        meta: { plugin: 'HtmlWebpackPluginMiddleware' },
                        attributes: {
                            
                        }
                    } */

                    // Tell webpack to move on
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = HtmlWebpackPluginMiddleware;
