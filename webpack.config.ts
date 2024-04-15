import * as path from "path";
import * as webpack from "webpack"

const config : webpack.Configuration ={
    entry: {
        tagesSorter: path.resolve(__dirname, 'src', 'app.ts')
    },
    output: {
        filename: '[name].bundle.js',
        path : path.resolve(__dirname, 'build'),
        clean: true
    },
    mode : 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}

export default config;