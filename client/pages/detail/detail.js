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
        attendeeArray: []
    },

    onLoad: function (options) {
        apis.login(this)

        this.setData({
            tid: options.tid
        })

        apis.querySingleTreating(this, options.tid, (data) => {
            data.attendee_Info = JSON.parse(data.attendee_Info)

            for (let i = 0; i < data.attendee_number - data.attended; i++)
                data.attendee_Info.push({})

            this.setData({
                detail: data,
                attendeeArray: data.attendee_Info
            })
        })
    },

    attend: function() {
        apis.attendTreating(this, {
            tid: this.data.tid,
            userInfo: this.data.userInfo
        }, (data) => {
            data.attendee_Info = JSON.parse(data.attendee_Info)
            
            for (let i = 0; i < data.attendee_number - data.attended; i++)
                data.attendee_Info.push({})

            this.setData({
                detail: data,
                attendeeArray: data.attendee_Info
            })
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
