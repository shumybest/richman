//home.js
var qcloud = require('../../vendor/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        ongoingTreating: []
    },

    onShow: function() {
        var appInstance = getApp()
        this.setData({
            logged: appInstance.logged,
            userInfo: appInstance.userInfo
        })

        this.queryTreating()
    },

    login: function() {
        if (this.data.logged) return

        util.showBusy('正在登录')
        var that = this

        // TODO extract common function
        // 调用登录接口
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    that.setData({
                        userInfo: result,
                        logged: true
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            that.setData({
                                userInfo: result.data.data,
                                logged: true
                            })
                        },

                        fail(error) {
                            util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },

    mapTreatingData: function(data) {
        data.forEach(e => {
            let tmp = new Date(e.create_time)
            e.create_time = util.formatTime(tmp)
            e.attended = JSON.parse(e.attendee_Info).length

            switch(e.status) {
                case 1:
                    e.status = '进行中'
                    break
                case 2:
                    e.status = '已结束'
                    break
            }            
        })

        return data
    },

    queryTreating: function () {
        util.showBusy('请求中...')
        var that = this
        var options = {
            url: config.service.treatingUrl,
            login: true,
            success (result) {
                util.showSuccess('请求成功完成')
                console.log('request success',
                    that.mapTreatingData(result.data.data))

                that.setData({
                    ongoingTreating: result.data.data
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        }
        qcloud.request(options)
    },

    detail: function (tid) {
        console.log(tid)
    }
})
