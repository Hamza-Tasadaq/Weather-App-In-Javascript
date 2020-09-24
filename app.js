// Getting input fields to display data#
let image=document.getElementById('img');
let locate=document.getElementById('locate');
let temperature=document.getElementById('temp');
let date=document.getElementById('date');
console.log(temperature)
// Function top get user location on window loads
const getUserLocation=()=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert('Sorry! You did not allow to access your location')
  }
}

// Function that receive location data
const showPosition=(locationData)=>{
  // console.log(locationData)
  let {longitude,latitude}= locationData.coords;
  // Calling a function to show weather data
  showWeatherData(longitude,latitude);
}
// Function that receive Error Data
const showError=(error)=>{
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Function that show weather data
const showWeatherData=async (longitude,latitude)=>{
  const api = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1b92e4c7f4c3a5fc9323bc1845b3d779&units=metric`
  );
  const json = await api.json();
  displayData(json)
}

// Function to display data on screen
const displayData=(data)=>{
  image.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temperature.innerHTML=`${data.main.temp}${String.fromCharCode(176)}C`
  locate.innerHTML=`${data.name},${data.sys.country}`;
  let currentDate=new Date();
  date.innerHTML=`${currentDate.toDateString()}`;
  console.log(currentDate.toTimeString())
}