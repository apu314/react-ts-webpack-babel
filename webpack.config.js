const fs = require('fs');
const path = require('path');
const { resolve, relative } = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const outputPath = (myPath) => {
    console.log('path ---> ', myPath)
    console.log('exists ---> ', fs.existsSync(myPath))
    console.log('resolve ---> ', resolve(__dirname, myPath))
    console.log('----------')


    if (!fs.existsSync(myPath)) {
        fs.mkdirSync(myPath, err => {
            if (err) throw new Error(err);
        })
        console.log(`Created directory: ${myPath}`);
    }

    return resolve(__dirname, myPath);
}

const getEntries = (pattern) => {
    const entries = {};

    console.log('pattern ---> ', glob.sync(pattern))

    glob.sync(pattern).forEach((file) => {
        console.log('file ---> ', file)
        if (file.match(/\.(ts|js)x?$/)) {
            const outputFileKey = file.replace("src/", "");
            const outputFileName = outputFileKey.replace(/\.[^/.]+$/, ''); // Remove file extension
            entries[outputFileName] = path.join(__dirname, file);
    
            console.log('outputFileKey ---> ', outputFileKey)
            console.log('path.join(__dirname, file) -->', path.join(__dirname, file))
        }
    });
    console.log('entries', {entries})

    return entries;
}

const config = {
    mode: isProd ? 'production' : 'development',
    entry: getEntries('./src/**/*'),
    output: {
        path: outputPath('dist'),
        // filename: '[name].js'
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
    }
}

if (isProd) {
    config.watch = true;
    config.optimization = {
        // concatenateModules: true,
        minimize: false,
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
} else {
    config.devServer = {
        port: 9000,
        open: true,
        hot: true,
        // compress: true,
        // stats: 'errors-only',
        client: {
            logging: 'info',
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

console.log("[ Webpack config ] ...  ", config);

module.exports = config;

/**
 * 💡 Por qué no??? 
 * Hacer que Webpack genere un HTML o un TWIG por cada 
 * archivo procesado, con el contenido que queramos.
 */