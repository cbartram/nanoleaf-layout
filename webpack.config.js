const path = require('path');

module.exports = {
    entry: './src/NanoleafLayout.js',
    output: {
        path: path.resolve('lib'),
        filename: 'NanoleafLayout.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
