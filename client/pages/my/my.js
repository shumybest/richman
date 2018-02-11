//home.js
var qcloud = require('../../vendor/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var apis = require('../../apis/apis.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        treating: []
    },

    onLoad: function() {
        apis.login(this)
    },

    onShow: function() {
        apis.queryTreating(this, (res) => {
            this.setData({
                treating: res.data.data
            })
        })
    },

    login: function() {
        apis.login(this)
    }
})
