const { sign, verify } = require("./dist/lib");
console.log(sign)
const token = sign("testing tokens", "test", { timestamp: new Date("2022") }, function(err, res) {
  console.log(err)
});
console.log(token)
console.log(sign(
  "",
  "secret",
  {
    timestamp: new Date("2022")
  }
))