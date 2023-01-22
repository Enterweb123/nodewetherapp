const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const { response } = require('express');
const app = express();
const listenPort = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs")

app.get("/", (req,res)=>{
   res.render("weather");
   redir
});

app.post("/data", (req,res)=>{
    const countryName = req.body.cityName;
    const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=9c186bec8048800ce3241ffb0e4ea6ed`
    https.get(Apiurl,(response)=>{
        response.on("data",(data)=>{
          const convert_data_to_Json = JSON.parse(data);
          // console.log(convert_data_to_Json);
        const temp =(convert_data_to_Json.main.temp-32)*(5/9);
        var Temp = "";
        function ParseFloat(str,val) {
          str = str.toString();
          str = str.slice(0, (str.indexOf(".")) + val + 1);
          Temp = str;  
         }
      ParseFloat(temp,2)

        const Name = convert_data_to_Json.name;
        const Temp_min = convert_data_to_Json.main.temp_min;
        const Temp_max = convert_data_to_Json.main.temp_max;
        const Wind_speed = convert_data_to_Json.wind.speed;
        const Humidity = convert_data_to_Json.main.humidity;
        const weather_description = convert_data_to_Json.weather[0].description;
        const imgurl = `https://openweathermap.org/img/wn/${convert_data_to_Json.weather[0].icon}@2x.png`;

          res.render("report",{
            Name,
            Temp,
            Temp_min,
            Temp_max,
            Wind_speed,
            Humidity,
            weather_description,
            imgurl,
          })
        })
    })
});


app.listen(listenPort, ()=>{
    console.log("port is live on 4000");
})