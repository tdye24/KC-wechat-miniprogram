module.exports = function() {
  var ids = [0, 0, 0, 0]
  var id = Math.floor(Math.random() * 100 + 1)
  ids[0] = id
  for (var i = 1; i <= 4; i++) {
    var id = Math.floor(Math.random() * 100 + 1)
    while (id === ids[0] || id === ids[1] || id === ids[2] || id === ids[3]) {
      id = Math.floor(Math.random() * 100 + 1)
    }
    ids[i] = id
  }
  return ids
}