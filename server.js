var express=require("express");
var app=express();
var request=require('request');
var bodyparser=require('body-parser');
var url1='https://api.openweathermap.org/data/2.5/weather?q=';
var url2='&units=metric&appid=d127eb224f7f20039800b144bd19f244';
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

var city='chennai';
var url='https://api.openweathermap.org/data/2.5/weather?q=chennai,IN&units=metric&appid=d127eb224f7f20039800b144bd19f244';
app.get('/',function(req,res){
	request(url,function(error,response,body){
		weather_json= JSON.parse(body);
		console.log(weather_json);

		var weatherdata={
			city: city,
			temperature:Math.round(weather_json.main.temp),
			description:weather_json.weather[0].description,
			icon:weather_json.weather[0].icon		
		};
		var weather_json={weather:weatherdata};
		res.render('weather',weather_json);
	});

});
app.post('/search',function(req,res){
	var city1=req.body.city_name;
	var requrl=url1+city1+url2;
	request(requrl,function(error,response,body){
		weather_json= JSON.parse(body);
		console.log(weather_json);

		var weatherdata={
			city: city1,
			temperature:Math.round(weather_json.main.temp),
			description:weather_json.weather[0].description,
			icon:weather_json.weather[0].icon		
		};
		var weather_json={weather:weatherdata};
		res.render('weather',weather_json);

});
});
app.listen(8000);
