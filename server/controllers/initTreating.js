const { mysql } = require('../qcloud')

  // `tid` INT NOT NULL
  // `init_uid` VARCHAR(100) NULL
  // `attendee_number` INT NULL
  // `attendee_Info` VARCHAR(2048) NULL
  // `status` INT NULL
  // `method_id` INT NULL

module.exports = async ctx => {
    if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        // ctx.state.data = ctx.state.$wxInfo.userinfo

        var treating = {
            init_uid: ctx.state.$wxInfo.userinfo.openId,
            attendee_number: ctx.request.body.attendee,
            status: 1
        }

        await mysql('treating').insert(treating).returning('*').then(res => {
            console.log(res)
            if(res.length > 0) {
                ctx.state.data = {msg: 'OK'}
                ctx.state.code = 200
            } else {
                ctx.state.data = {msg: 'insert failed'}
                ctx.state.code = 500
            }
        })
    } else {
        ctx.state.code = -1
    }
}
