var qcloud = require('../../vendor/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var apis = require('../../apis/apis.js')

Page({
    data: {
        attendee: 0,
        userInfo: {},
        logged: false,
        treating: {}
    }, 
    
    onLoad: function () {
        apis.login(this)
    },

    onShow: function() {
        apis.queryTreating(this, {status: 1}, (data) => {
            this.setData({
                treating: data
            })
        })
    },

    attendeeChange: function(e) {
        this.setData({
            attendee: e.detail.value
        })
    },

    initialTreating: function() {
        if (this.data.attendee < 0 || this.data.attendee > 29) {
            util.showModel('请输入合理数字', '亲，你真的有这么多朋友吗？');
            return
        }

        apis.createTreating(
            this,
            {'attendee': parseInt(this.data.attendee)}
        )
    }
})