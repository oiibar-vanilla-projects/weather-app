const iconIdDisplay = document.getElementById('weatherIcon');
const temperatureDisplay = document.getElementById('temp');
const descriptionDisplay = document.getElementById('weather');
const locationDisplay = document.getElementById('location');
const feelsLikeDisplay = document.getElementById('feelsLike');
const humdityDisplay = document.getElementById('humidity');
const pressureDisplay = document.getElementById('pressure');
const windSpdDisplay = document.getElementById('windSpd');
const inputPart = document.querySelector(".input-part");
const inputField = inputPart.querySelector("input");
const infoTxt = inputPart.querySelector(".info-txt");
let iconId,temp,desc,namee,abbr,feelsLike,hum,pressure,windSpd;
const wrapper = document.querySelector(".wrapper");
const arrowBack = wrapper.querySelector("header i");
const apikey = '89d4cfbfc68753c0f838ed1cf1b4fbea'

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        iconId = info.weather[0].icon;
		temp = Math.round(info.main.temp);
		desc = info.weather[0].description;
		namee = info.name;
		abbr = info.sys.country;
		feelsLike = Math.round(info.main.feels_like);
		hum = info.main.humidity;
		pressure = info.main.pressure;
		windSpd = Math.round(info.wind.speed);

		iconIdDisplay.setAttribute('src', `http://openweathermap.org/img/wn/${iconId}.png`)
		temperatureDisplay.innerHTML = temp;
		descriptionDisplay.innerHTML = desc;
		locationDisplay.innerHTML = `${namee}, ${abbr}`;
		feelsLikeDisplay.innerHTML = feelsLike;
		humdityDisplay.innerHTML = hum;
		pressureDisplay.innerHTML = pressure;
		windSpdDisplay.innerHTML = windSpd;
        
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}
arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});