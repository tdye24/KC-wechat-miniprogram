const {
  mysql
} = require('../qcloud')


async function score(ctx, next) {
  let {open_id, added_score, subject, noteIds} = ctx.request.body
  added_score = parseInt(added_score)
  var old_score = (await mysql('cSessionInfo').where({
    'open_id': open_id}).select('score'))[0].score
  console.log(old_score)
  let new_score = old_score + added_score
  var update_res = await mysql("cSessionInfo").where({
    open_id: open_id
  }).update({
    score: new_score
  })
  var insert_list = []
  for(var j=0; j<noteIds.length; j++) {
    insert_list.push({
      subject: subject, 
      id: noteIds[j].id,
      question: noteIds[j].question,
      open_id: open_id,
      num: 1
    }) 
  }
  var insert_res = await mysql("note").insert(insert_list)
  ctx.state.data = {
    old_score: old_score,
    added_score: added_score,
    new_score: new_score,
    open_id: open_id,
    subject: subject,
    noteIds: noteIds,
    update_res: update_res,
    insert_res: insert_res,
    insert_list: insert_list
  }
}

module.exports = {
  score
}