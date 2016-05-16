const express = require("express");
const app = express();
var path = require("path");
const moment = require("moment");


app.get(/.*/, function(req, res){
  if(req.originalUrl !== "/") {
    var url = isDate(req.originalUrl);
    res.send(url)
  } else {
    res.sendFile(path.join(__dirname+ "/home.html"));
  }
});

function isDate(url){
  url = url.substring(1, url.length);
  if(moment(new Date(url)).format("LL") !== "Invalid date"){
    return objectify(moment(new Date(url)).format("LL"));
  }
  else if(moment(new Date(url * 1)).format("LL") !== "Invalid date"){
    return objectify(moment(new Date(url * 1)).format("LL"));
  } else {return objectify(null)}
}

function objectify(date){
  var response = {};
  if(date){
    response.unix = new Date(date).getTime();
    response.natural = date;
    return response;
  } else {
    return {unix: null, natural: null}
  }
}

app.listen(process.env.PORT || 8080);
