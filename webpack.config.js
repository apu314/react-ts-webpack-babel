const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { getEntries, outputPath } = require('./webpackConfig/fileSystem');
const { templateContent } = require('./webpackConfig/dev');
const MyPlugin = require('./webpackConfig/plugins/MyPlugin');


const isProd = process.env.NODE_ENV === 'production';



let config = {
    mode: isProd ? 'production' : 'development',
    entry: getEntries('./src/**/*'),
    output: {
        path: outputPath('dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                /* use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['']
                    }
                } */
            }
        ]
    },
    plugins: [
        new MyPlugin({options: ''})
    ],
    optimization: {
        concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                commons: {
                    name: 'common',
                    filename: 'common.js',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true,
                    reuseExistingChunk: true,
                    priority: -10
                }
            }
        }
    }

}

if (isProd) { // Production
    config = {
        ...config,
        plugins: [
            ...config.plugins,
            new HtmlWebpackPlugin({
                title: 'React Typescript Webpack Babel',
                filename: 'index.html',
                // template: './src/index.html',
                templateContent: templateContent,
                inject: 'body',
                minify: true
            })
        ],
        // watch: true; // Not for production
        optimization: {
            ...config.optimization,
            // concatenateModules: true,
            minimize: true,
            minimizer: [ new TerserPlugin({
                terserOptions: {
                  format: {
                    comments: false,
                  },
                },
                extractComments: false,
              })
            ]
        }
    }
} else { // Development
    config = {
        ...config,
        plugins: [
            ...config.plugins,
            new HtmlWebpackPlugin({
                title: 'React Typescript Webpack Babel',
                filename: 'index.html',
                // template: './src/index.html',
                templateContent: templateContent,
                inject: 'body',
                minify: false
            })
        ],
        // watch: true; // Not for production
        devServer: {
            port: 9000,
            open: true,
            hot: true,
            // compress: true,
            // stats: 'errors-only',
            client: {
                logging: 'log',
                progress: true,
                overlay: {
                    errors: true,
                    warnings: false,
                    // reconnect: true,
                }
            },
            watchFiles: ['src/**/*'],
        } 
    }

    // The following commented out code works.
    // config.plugins.push(
    //     new HtmlWebpackPlugin({
    //         title: 'React Typescript Webpack Babel',
    //         filename: 'index.html',
    //         // template: './src/index.html',
    //         templateContent: templateContent
    //     })
    // )
    // config.devServer = {
    //     port: 9000,
    //     open: true,
    //     hot: true,
    //     // compress: true,
    //     // stats: 'errors-only',
    //     client: {
    //         logging: 'info',
    //         progress: true,
    //         overlay: {
    //             errors: true,
    //             warnings: false,
    //             // reconnect: true,
    //         }
    //     },
    //     watchFiles: ['src/**/*'],
    // }
}

console.log("[ Webpack config ] ...  ", config);

module.exports = config;
