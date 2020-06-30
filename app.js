// packges required
const express=require("express");
const app=express();
const https=require("https");
const body=require("body-parser");

// packages
app.set("view engine","ejs");
app.use(body.urlencoded({extended:true}));
app.use(express.json({limit:"1mb"}));
app.use(express.static('public'));

//main get page 
app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");
});

// location post
app.post("/",function(req,res){
    const lat=req.body.lat;
    const lon=req.body.lon;
        const url="x";
        https.get(url,function(respond){
            respond.on("data",function(d){
                const data=JSON.parse(d);
                const temp=data.main.temp;
                const cit=data.name;
                const feel=data.main.feels_like;
                const i=data.weather[0].icon;
                const icon=i;
                const desc=data.weather[0].description;
                console.log(temp,cit);
                console.log(icon,feel,desc);
                res.json({
                    status:"success",
                    temperature:temp,
                    city:cit,
                    feel:feel,
                    icon:icon,
                    desc:desc
                });
            });
        });
});
 
// location search post         
app.post("/api",function(req,res){
        const c=req.body.city;
        const city=c.toUpperCase();
        const url="x" ;
    
        https.get(url,function(respond){
           if(respond.statusCode===200){
                respond.on("data",function(d){
                    const data=JSON.parse(d);
                    const temp=data.main.temp;
                    const feel=data.main.feels_like;
                    const i=data.weather[0].icon;
                    const icon=i;
                    const desc=data.weather[0].description;
                    console.log(temp);
                    console.log(icon);
                    console.log(feel);
                    console.log(desc);
                    res.render("index",{city:city,temp:temp,icon:icon,feel:feel,desc:desc});
                });
            }else{
                res.sendFile(__dirname+"/index.html");
            }
        
        });
    });



// port management
app.listen(process.env.PORT ||8000, function(){
    console.log("server running");
});
