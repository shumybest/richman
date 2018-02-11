//app.js
var qcloud = require('./vendor/index')
var config = require('./config')

App({
    onLaunch: function (options) {
        qcloud.setLoginUrl(config.service.loginUrl)
        if (options.scene == 1044) {
            console.log(options.shareTicket)
        }
    },
    userInfo: {},
    logged: false
})