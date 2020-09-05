var express = require("express");
var app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`The YelpCamp Server is running on port ${PORT}`);
});
