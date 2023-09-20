import React from 'react'
import img from "../images/sunpic.png"
import search from "../images/searchicon.png"
import { useEffect, useState } from 'react'
import Clock from 'react-live-clock'
import ReactAnimatedWeather from 'react-animated-weather';



export default function Forecast() {
 
 var [weather, setWeather] = useState({});

 var [city, setCity] = useState("")
 var [error, setError] = useState(false);

 var [weaterIcon, setWeatherIcon] = useState("CLEAR_DAY")

 const defaults = {
  icon: weaterIcon,
  color: 'white',
  size: 100,
  animate: true
};

 useEffect(()=>{
  async function getData(){

    if (city !== "" ){
      
    var response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ca8c2c7970a09dc296d9b3cfc4d06940`);
    console.log(response.status)


    if (response.status === 200){
      setError(false)
      var data = await response.json();
      console.log(data);
      if(data.weather[0].main ==="Snow" ){
        setWeatherIcon("SNOW");
      }
      else if(data.weather[0].main === "Thunderstorm"  || data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle" || data.weather[0].main === "Mist"){
        setWeatherIcon("RAIN")
      }
      else if(data.weather[0].main === "Clouds"){
        setWeatherIcon("CLOUDY");
      }
      else if(data.weather[0].main === "Smoke" || data.weather[0].main === "Fog"){
        setWeatherIcon("FOG");
      }

      
    
    

      setWeather(data);
    }
  else{
    setError(true);
  }
  

  }
  else{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
       async (pos)  => {
          console.log(pos.coords.latitude)
          console.log(pos.coords.longitude)
          var response2 = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&id=524901&appid=ca8c2c7970a09dc296d9b3cfc4d06940`)
          console.log(response2.status);
      
          if (response2.status === 200) {
            setError(false);
            var data2 = await response2.json();
            console.log(data2);
            if(data2.weather[0].main ==="Snow" ){
              setWeatherIcon("SNOW");
            }
            else if(data2.weather[0].main === "Thunderstorm"  || data2.weather[0].main === "Rain" || data2.weather[0].main === "Drizzle" || data2.weather[0].main === "Mist"){
              setWeatherIcon("RAIN")
            }
            else if(data2.weather[0].main === "Clouds"){
              setWeatherIcon("CLOUDY");
            }
            else if(data2.weather[0].main === "Smoke" || data2.weather[0].main === "Fog"){
              setWeatherIcon("FOG");
            }
      
            setWeather(data2);
          } else {
            setError(true);
          }
        },

        (e) =>{
          console.log(e);
          setError(true);
        } 
      )
    } else {
      alert("Location Service not found!");
      setError(true);
    }

   
  }
  }

  getData();
 }, [city])
 






 function searchCity() {
  var cityName = document.getElementById("search").value;
  if(cityName.trim() !== ""){
    setCity(cityName);
  }
  else{
    alert("Please enter a city name!!!");
  }

 }
 
 
 
 
 
 
 
 
 
 
 
 
  return (
    <div className='forecast-container'>
        <div className='left-forecast'>
            <div className='location-container'>
              {error === false ? <>
                <h1>{weather.name}</h1>
              <h2>{weather.sys?.country}</h2>

              </>
            : <>
              <h1>City not found!!!</h1>
            </>
            }
          
        

          </div>

          <div className='temp-container'>
            <div className='date-container'>
              <h1 className='time'>  <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /></h1>
              <h3> sept 06 2023</h3>
            </div>

              <div className='temp-box'>
               {error === false ? <>
                <h1 className='temp'> {Math.round(weather.main?.temp)}°f </h1>
               
               </>
              : null 
              }
               
               
                
              </div>
          </div>


        </div>
        
            
        <div className='right-forecast'>
          {error === false ? <>
           <br></br>
            <ReactAnimatedWeather
    icon={defaults.icon}
    color={defaults.color}
    size={defaults.size}
    animate={defaults.animate}
  />

<h1 className='day-status'>{weather.weather?.[0].main}</h1>

<div className='search-container'>
  <input type='text' placeholder='Search..' id='search'/>
  <button onClick={searchCity}>
    <img src = {search} alt = "search" width={20}/> 
  </button>

</div>

  <div className='icon-container'>
  <h3 className='weather-description'>
    {weather.weather?.[0].description}
    <img src= {`https://openweathermap.org/img/${weather.weather?.[0].icon}@2x.png`} alt='icon' width={30}/>
    </h3>
  </div>
 

  <hr/>

  <div className='weather-details'>
    <h3>Temperature</h3>
    <h3>{Math.round(weather.main?.temp)}°f</h3>
  </div>

   <hr/>

  <div className='weather-details'>
    <h3>Humidity</h3>
    <h3>{weather.main?.humidity}%</h3>
  </div>

  <hr/>

  <div className='weather-details'>
     <h3>Visibility</h3>
       <h3>{Math.round(weather.visibility * 0.00062137)}mi</h3>
  </div>

  <hr/>

<div className='weather-details'>
<h3>Wind Speed</h3>
<h3>{weather.wind?.speed} mi</h3>
</div>
          
          
          </> 
          : <div className='search-container'>
          <input type='text' placeholder='Search..' id='search'/>
          <button onClick={searchCity}>
            <img src = {search} alt = "search" width={20}/> 
          </button>
        
        </div>}
         






        </div>

    </div>
  )
}
