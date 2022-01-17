const express = require("express");
const fs=require("fs");
const mongoose = require('mongoose');
const port=80;
const app=express();

const home=fs.readFileSync("index.html","utf-8")
const contact=fs.readFileSync("contact.html","utf-8")
main().then(console.log("we are connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/SingingSchool');


}
const singSchema = new mongoose.Schema({
    name: String,
    Address:String,
    Email:String,
contact_number:String,
age:String
  });
  const Sing = mongoose.model('schoolData', singSchema);
  

app.use('/static', express.static('static'))

app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.status(200).end(home);
})
app.get("/contact.html",(req,res)=>{
    res.status(200).end(contact);
})
app.post("/contact.html",(req,res)=>{
    res.status(200).end(contact);
    
    fs.writeFileSync("form.txt",JSON.stringify(req.body));
    const singData = new Sing(req.body);
    singData.save().then(console.log("The data has been saved to the database .")).catch(err=>{
        console.log(`Sorry, data has not been saved because of the error ${err}`)
    });

})
app.listen(port,()=>{
    console.log(`The server running at http://localhost:${port} `)
})