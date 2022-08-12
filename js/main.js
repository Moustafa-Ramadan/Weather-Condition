let weatherContainer = [];
let weatherToday = document.getElementById("weatherToday");
let weatherTomorrow = document.getElementById("weatherTomorrow");
let SearchInput = document.getElementById("SearchInput");
let map = document.getElementById("map");
async function weather(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`
  );
  let finalResponse = await response.json();
  weatherContainer = finalResponse;
  console.log(weatherContainer);

  displayWeather(weatherContainer);
}
weather("cairo");

function searchCountry(searchTerm) {
  if (searchTerm == " " || SearchInput.value == "") {
    weather("cairo");
  } else {
    weather(searchTerm);
  }
}
SearchInput.addEventListener("input", function () {
  searchCountry(`${this.value}`);
});

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August ",
  "Septemper",
  "October",
  "November",
  "December",
];
let d = new Date();
let dayName = days[d.getDay()];
let dayIndex = days.indexOf(dayName);
console.log(dayIndex)
let tomorrowName ;
let afterTomoName;
if (dayIndex == 6) {
   tomorrowName = days[0];
   afterTomoName = days[1];
}else
{
 tomorrowName = days[d.getDay() + 1];
 afterTomoName = days[d.getDay() + 2];
}
let monthName = months[d.getMonth()];
let date = d.getDate();

function displayWeather(term) {
  let weather = ` <div class="col-md-4 mb-3" >
         <div class="forecast-today">
        <div class="forecast-header  d-flex justify-content-between p-3">
           <div class="day">${dayName}</div>
           <div class=" date">${date + monthName}</div>
        </div>
        <div class="forecast-content ">
            <div class="location">${term.location.name}</div>
            <div class="degree d-flex justify-content-between p-3">
                <div class="num">${
                  term.forecast.forecastday[0].day.maxtemp_c
                }<sup>o</sup>C</div>
                <div class="forecast-icon">
                    <img src="https:${
                      term.forecast.forecastday[0].day.condition.icon
                    }" alt="" width="90">
                </div>
            </div> 
            <div class="custom">${
              term.forecast.forecastday[0].day.condition.text
            }</div>
            <span><img src="images/icon-umberella.png" alt="" > ${term.current.humidity}%</span>
            <span><img src="images/icon-wind.png" alt=""  >  ${
              term.current.wind_kph
            } Km/h</span>
            <span><img src="images/icon-compass.png" alt="" > ${term.current.wind_dir}</span>
        </div>
    </div> 
    </div> 
    <div class="col-md-4 mb-3">
    <div class="forecast">
   <div class="forecast-header  text-center p-3">
      <div class="day">${tomorrowName}</div>
     
   </div>
   <div class="forecast-tomorrow text-center">
       <div class="forecast-icon">
           <img src="https:${
             term.forecast.forecastday[1].day.condition.icon
           }" alt="" width="48">
       </div>
       <div class="degree ">
           <div class="num">${
             term.forecast.forecastday[1].day.maxtemp_c
           }<sup>o</sup>C</div>
          <small>${
            term.forecast.forecastday[1].day.mintemp_c
          } <sup>o</sup></small>
       </div>
       <div class="custom">${
         term.forecast.forecastday[1].day.condition.text
       }</div>
     </div>
</div>  
</div> 
<div class="col-md-4">
<div class="forecast-after-tomorrow ">
    <div class="forecast-header  text-center p-3">
       <div class="day">${afterTomoName}</div>
      
    </div>
    <div class="forecast-a-tomorrow text-center">
        <div class="forecast-icon">
            <img src="https:${
              term.forecast.forecastday[2].day.condition.icon
            }" alt="" width="48">
        </div>
        <div class="degree ">
            <div class="num">${
              term.forecast.forecastday[2].day.maxtemp_c
            }<sup>o</sup>C</div>
           <small>${
             term.forecast.forecastday[2].day.mintemp_c
           } <sup>o</sup></small>
        </div>
        <div class="custom">${
          term.forecast.forecastday[2].day.condition.text
        }</div>
      </div>
</div>
</div>`;

  weatherToday.innerHTML = weather;
}




function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.03696882181797, lng: -118.32119393150238 },
    zoom: 12,
  });
}

window.initMap = initMap;

