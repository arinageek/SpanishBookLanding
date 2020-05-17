require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var app = express();
const port = process.env.PORT || 3000;
const ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

app.get("/", (req,res)=>{
	res.render("index");
});

app.get("/warning", (req,res)=>{
	res.render("warning");
});

app.get("/thanks", (req,res)=>{
	res.render("thanks");
});

app.post("/success", async (req,res) =>{
	console.log(req);
	try{
		function sendEmail(){
		
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user:'studiariweb@gmail.com',
				pass: process.env.PASSWORD
			}
		});

		let mailOptions = {
			from: 'studiariweb@gmail.com',
			to: req.body.email,
			subject: 'Книги и словарик от StudiAri',
			text: 'Спасибо за покупку!',
			attachments: [
				{filename:'book.pdf', path:'./book.pdf'},
				{filename:'book2.pdf', path:'./book2.pdf'},
				{filename:'slovar.docx', path:'./slovar.docx'}
			]
		}

		transporter.sendMail(mailOptions, function(err,data){
			if(err){
				console.log("Error: ", err);
			}else{
				console.log("Email sent");
			}
		});
			return 0;
			
		}
		var response = await sendEmail();
		
		res.status(200).send();
	} catch(e){
		console.log(e);
	}
	
});

app.listen(port, function(){
	console.log("Server started");
});