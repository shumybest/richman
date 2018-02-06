var qcloud = require('../../vendor/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        attendee: 0,
        userInfo: {},
        logged: false
    },

    onReady: function() {
        var appInstance = getApp()

        if (!appInstance.logged) {

            util.showBusy('正在登录')
            var that = this

            // 调用登录接口
            qcloud.login({
                success(result) {
                    if (result) {
                        util.showSuccess('登录成功')
                        appInstance.logged = true
                        appInstance.userInfo = result
                        that.setData({
                            userInfo: appInstance.userInfo,
                            logged: true
                        })
                    } else {
                        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                        qcloud.request({
                            url: config.service.requestUrl,
                            login: true,
                            success(result) {
                                util.showSuccess('登录成功')
                                appInstance.logged = true
                                appInstance.userInfo = result.data.data
                                that.setData({
                                    userInfo: appInstance.userInfo,
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
        }
    },
    attendeeChange: function(e) {
        this.setData({
            attendee: e.detail.value
        })
    },

    initialTreating: function() {
        console.log(this.data)

        if (this.data.attendee < 0 || this.data.attendee > 999) {
            util.showModel('请输入合理数字', '亲，你真的有这么多朋友吗？');
            return
        }

        util.showBusy('请求中...')
        var that = this
        qcloud.request({
            url: `${config.service.host}/weapp/initTreating`,
            login: true,
            method: 'POST',
            data: {'attendee': that.data.attendee},
            success (result) {
                util.showSuccess('请求成功完成')
                console.log(JSON.stringify(result.data))
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    }
})