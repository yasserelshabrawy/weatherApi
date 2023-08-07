
async function search(a) {
  let api = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (api.ok && api.status  != 400 ) {
    let a = await api.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (e) => {
  search(e.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrent(a, t) {
  if (null != t) {
    var e = new Date(t.last_updated.replace(" ", "T"));
    let cartona = `<div class="today forecast col-md-4">
        <div class="forecast-header d-flex justify-content-between align-items-center px-2"  id="today">
            <div class="day p-3">${days[e.getDay()]}
      </div>
          <div class=" date">${e.getDate() + monthNames[e.getMonth()]}
    </div> 
       </div> 
          <div class="forecast-content p-3" id="current">
              <div class="location"><h4>${a.name}</h4>
    </div> 
       <div class="degree d-flex justify-content-evenly align-items-center">
               <div class="num "> <h1>${t.temp_c}<sup>o</sup>C</h1>
    
    </div>
    <div class="forecast-icon">
    <img src="https:${t.condition.icon}" alt="" width=90>
     </div>
      </div>
    <div class="custom py-2">${t.condition.text}
    </div> 
    <ul class="d-flex list-unstyled gap-3">
    <li>
    <i class="fa-solid fa-umbrella"></i> 20%
    </li>
    <li>
    <i class="fa-solid fa-wind"></i> 18km/h
    </li>
    <li>
    <i class="fa-solid fa-compass"></i> East
    </li>
    </ul>
       <span>
       
       </span>
       <span></span>
       <span></span>
           </div>
           </div>`;
    document.getElementById("forecast").innerHTML = cartona;
  }
}
function displayAnother(a) {
  let cartona = "";
  for (let i = 1; i < a.length; i++)
    cartona += `<div class="forecast text-center col-md-4">    
        <div class="forecast-header">       
          <div class="day p-3">${
            days[new Date(a[i].date.replace(" ", "T")).getDay()]
          }
          </div>
          </div>
          <div class="forecast-content d-flex flex-column gap-3  py-3"> 
          <div class="forecast-icon">
         <img src="https:${a[i].day.condition.icon}" alt="" width=48>
         </div>
         <div class="degree">${a[i].day.maxtemp_c}
         <sup>o</sup>C
         </div>
        <small>${a[i].day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${a[i].day.condition.text}
        </div>
          </div>
        </div>`;
  document.getElementById("forecast").innerHTML += cartona;
}
search("cairo");
