const {
  mysql
} = require('../qcloud')
const questionsId = require('../utils/questionsId.js')

async function zhengzhi(ctx, next) {
  var ids = questionsId()
  var res = await mysql("zhengzhi").select('*').whereIn('id', ids)
  ctx.state.data = res
}

async function hongguan(ctx, next) {
  var ids = questionsId()
  var res = await mysql("hongguan").select('*').whereIn('id', ids)
  ctx.state.data = res
}

async function weiguan(ctx, next) {
  var ids = questionsId()
  var res = await mysql("weiguan").select('*').whereIn('id', ids)
  ctx.state.data = res
}

async function question_detail(ctx, next) {
  var subject = ctx.query.subject
  var id = parseInt(ctx.query.id)
  if (subject == "hongguan") {
    var res = await mysql('hongguan').where({
      id: id
    }).select('*')
  } else if (subject == "weiguan") {
    var res = await mysql('weiguan').where({
      id: id
    }).select('*')
  } else if (subject == "zhengzhi") {
    var res = await mysql('zhengzhi').where({
      id: id
    }).select('*')
  }

  ctx.state.data = {
    subject: subject,
    id: id,
    data: res
  }
}

module.exports = {
  zhengzhi,
  hongguan,
  weiguan,
  question_detail
}