const express=require("express");
const hbs=require("hbs");
const path=require("path");

const app=express();
const weatherData=require("./utils/weatherdata.js")

const publicPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get("/",(req,res)=>{
    try{
    res.render("index")
    }catch(error){
        res.send(error);
    }
});

app.get("/weather",(req,res)=>{
    try{
    if(!req.query.address){
       return res.send("address is requires");
    }
   weatherData(req.query.address, (error, result) => {
    if (error) {
        return res.send(error);
      }
  
      res.send(result);
   })
}catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
}
});

app.get("*",(req,res)=>{
    res.render("404");
});

app.listen("8080",()=>{
    console.log("running on port 8080")
})