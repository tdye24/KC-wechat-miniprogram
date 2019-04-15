const {
  mysql
} = require('../qcloud')

async function note(ctx, next) {
  let open_id = ctx.request.query.open_id
  var res = (await mysql('note').where({
    'open_id': open_id
  }).select('*'))
  ctx.state.data = res
}

async function rank(ctx, next) {
  var res = await mysql('cSessionInfo').select('*').orderBy('score', 'desc')
  ctx.state.data = res
}


module.exports = {
  note,
  rank
}