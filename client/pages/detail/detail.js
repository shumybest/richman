//index.js
var qcloud = require('../../vendor/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var apis = require('../../apis/apis.js')

Page({
    data: {
        tid: 0,
        logged: false,
        userInfo: {},
        detail: {},
    },

    onLoad: function (options) {
        apis.login(this)

        this.setData({
            tid: options.tid
        })

        apis.querySingleTreating(this, options.tid, (result) => {
            result.data.data[0].attendee_Info =
                JSON.parse(result.data.data[0].attendee_Info)

            this.setData({
                detail: result.data.data[0]
            })
        })
    },

    attend: function() {
        apis.attendTreating(this, {
            tid: this.data.tid,
            userInfo: this.data.userInfo
        })
    },

    onShareAppMessage: function(res) {
        return {
            title: '转发的人都长的帅',
            path: '/pages/detail/detail?tid=' + this.data.tid,
            success: function(res) {
                wx.showShareMenu({
                    withShareTicket: true
                })
            },
            fail: function(res) {
                // 转发失败
            }
        }
    }
})
