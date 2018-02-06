//app.js
var qcloud = require('./vendor/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    userInfo: {},
    logged: false
})