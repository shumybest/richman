var util = require('../utils/util.js')
var qcloud = require('../vendor/index')
var config = require('../config')

function mapTreatingData(data) {
    data.forEach(e => {
        let tmp = new Date(e.create_time)
        e.create_time = util.formatTime(tmp)
        e.attendee_Info = JSON.parse(e.attendee_Info)

        switch (e.status) {
            case "1":
                e.status = '进行中'
                break
            case "2":
                e.status = '已结束'
                break
        }
    })

    return data
}

var queryTreating = function (obj, data, success, fail) {
    util.showBusy('请求中...')
    var options = {
        url: config.service.treatingUrl,
        login: true,
        data: data,
        success(result) {
            wx.hideToast()
            console.log('queryTreating success',
                mapTreatingData(result.data.data))
            if (success) success(result.data.data)
        },
        fail(error) {
            util.showModel('请求失败', error);
            console.log('queryTreating fail', error);
            if(fail) fail(error)
        }
    }
    qcloud.request(options)
}

var login = function(obj, success, fail) {
    var appInstance = getApp()
    if (appInstance.logged) {
        obj.setData({
            logged: appInstance.logged,
            userInfo: appInstance.userInfo
        })
        return
    }

    util.showBusy('正在登录')
    // 调用登录接口
    qcloud.login({
        success(result) {
            if (result) {
                util.showSuccess('登录成功')
                obj.setData({
                    userInfo: result,
                    logged: true
                })
                appInstance.userInfo = result.data.data
                appInstance.logged = true
                success(result.data.data)
            } else {
                // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                qcloud.request({
                    url: config.service.requestUrl,
                    login: true,
                    success(result) {
                        util.showSuccess('登录成功')
                        var appInstance = getApp()
                        appInstance.userInfo = result.data.data
                        appInstance.logged = true
                        obj.setData({
                            userInfo: result.data.data,
                            logged: true
                        })
                        if (success) success(result.data.data)
                    },

                    fail(error) {
                        util.showModel('请求失败', error)
                        console.log('login fail', error)
                        if(fail) fail(error)
                    }
                })
            }
        },

        fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
            if(fail) fail(error)
        }
    })
}

var createTreating = function(obj, data) {
    util.showBusy('请求中...')
    qcloud.request({
        url: config.service.treatingUrl,
        login: true,
        method: 'POST',
        data: data,
        success(result) {
            wx.hideToast()
            console.log('createTreating success', JSON.stringify(result.data))
        },
        fail(error) {
            util.showModel('请求失败', error);
            console.log('createTreating fail', error);
        }
    })
}

var querySingleTreating = function(obj, data, success, fail) {
    util.showBusy('请求中...')
    var options = {
        url: config.service.treatingUrl + '/detail/' + data,
        login: true,
        success(result) {
            wx.hideToast()
            console.log('querySingleTreating success', result.data.data)
            if (success) success(result.data.data)
        },
        fail(error) {
            util.showModel('请求失败', error);
            console.log('querySingleTreating fail', error);
            if(fail) fail(error)
        }
    }
    qcloud.request(options)
}

var attendTreating = function(obj, data, success, fail) {
    util.showBusy('请求中...')
    var options = {
        url: config.service.treatingUrl + '/attend/' + data.tid,
        method: 'POST',
        login: true,
        data: data.userInfo,
        success(result) {
            wx.hideToast()
            console.log('attendTreating success', result.data.data)
            if (success) success(result.data.data)
        },
        fail(error) {
            util.showModel('请求失败', error);
            console.log('attendTreating fail', error);
            if (fail) fail(error)
        }
    }
    qcloud.request(options)
}

module.exports = {
    login,
    createTreating,
    queryTreating,
    querySingleTreating,
    attendTreating
}