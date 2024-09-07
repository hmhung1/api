exports.name = '/sim/ask';
const { join } = require("path")
const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
exports.index = async (req, res, next) => {
  var ask = req.query.ask;
  const pathData = join(__dirname, "data.json");
  var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var filter = dataJson.filter(item => item.ask == ask)
  if(filter == "") res.json({ ans: "Tớ không hiểu gì cả"})
  return res.json(filter[Math.floor(Math.random() * filter.length)])
}