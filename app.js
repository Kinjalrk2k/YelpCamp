var express = require("express");
var app = express();

app.set("view engine", "ejs")

app.get("/", function(req, res) {
    res.render("landing")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`The YelpCamp Server is running on port ${PORT}`);
});
