module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: "http://520it.com:8001/",
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}