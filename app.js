var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
const ip = process.env.IP || "127.0.0.1";


app.get("/", (req,res)=>{
	res.send("The website is currently unavailable");
});

app.listen(port, function(){
	console.log("Server started");
});