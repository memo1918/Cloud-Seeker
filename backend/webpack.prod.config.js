const { resolve } = require("path");

module.exports = {
    entry: "./src/index.ts",
    mode: "production",
    target: "node",
    experiments: {
        outputModule: true
    },
    output: {
        path: resolve(__dirname, "build", "webpack"),
        filename: "index.mjs",
        module: true,
        scriptType: "module",
        chunkFormat: "module",
        hashFunction: "xxhash64"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/, // (?<!\.test)\.m?js$ to exclude tests
                resolve: {
                    fullySpecified: false // resolves .mjs and .js files without specifying the whole path
                }
            },
            {
                test: /\.ts$/,
                use: ["ts-loader"]
            }
        ]
    },
    plugins: [],
    node: {
        global: true,
        __filename: true,
        __dirname: true
    }
};
