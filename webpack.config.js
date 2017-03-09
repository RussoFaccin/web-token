module.exports = {
    entry: './src/scripts/main.js',
    output: {
        path: '/dist/js',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
}
