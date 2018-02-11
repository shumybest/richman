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

    onReady: function() {
        apis.login(this)

        apis.queryTreating(this, (res) => {
            this.setData({
                treating: res.data.data
            })
        })
    },

    attendeeChange: function(e) {
        this.setData({
            attendee: e.detail.value
        })
    },

    initialTreating: function() {
        apis.createTreating(
            this,
            {'attendee': this.data.attendee}
        )
    }
})