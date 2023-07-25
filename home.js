const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const grantAccessContainer = document.querySelector('.grant-location-container');
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector('[data-grantAccess]');
const cityName = document.querySelector('[data-cityName]');

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
//  grantAccessContainer userInfoContainer searchForm loadingScreen

const oldTab = userTab;
oldTab.classList.add('current-tab');
// grantAccessContainer.classList.add('active');
getfromSessionStorage();
// userInfoContainer.classList.add('active');


function switchTab(newTab){
    if(oldTab != newTab){
        oldTab.classList.remove('current-tab');
        searchTab.classList.add('current-tab');
        userInfoContainer.classList.remove('active');
        searchForm.classList.add('active');
    }

    else{
        searchTab.classList.remove('current-tab');
        userTab.classList.add('current-tab');
        searchForm.classList.remove('active');
        userInfoContainer.classList.add('active');
        getfromSessionStorage();
    }
}

userTab.addEventListener('click',()=>{switchTab(userTab)});
searchTab.addEventListener('click',()=>{ switchTab(searchTab)});

 function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }

    else{
        alert('No Geolocation Support');
    }
}

 function showPosition(position){

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    
   sessionStorage.setItem('user-coordinates', JSON.stringify(userCoordinates));
    
    console.log(position + 'position are saved');
    getfromSessionStorage();
}

// Check if coordinates are already present

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem('user-coordinates');
    if(!localCoordinates){
        // Agar coordinates nhi hai toh 
        console.log('coordinates not saved');
        grantAccessContainer.classList.add('active');
        userInfoContainer.classList.remove('active');
    }

    else{
       const coordinates = JSON.parse(localCoordinates);
       console.log(coordinates);
       fetchUserWeatherInfo(coordinates);
    }
}

function renderWeatherInfo(weatherInfo) {
    // Firstly we have to fetch the elements

    const countryIcon = document.querySelector('[data-countryIcon]');
    const desc = document.querySelector('[data-weatherDesc]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windspeed = document.querySelector('[data-windspeed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloudiness = document.querySelector('[data-cloudiness]');


    // Fetch the value from weatherInfo and put it on UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    // desc.innerText =    

}

function showError(error){
    switch (error.code){
        case error.PERMISSION_DENIED:
            console.log('User denied the request for geolocation');
        break;
        case error.POSITION_UNAVAILABLE:
            console.log('Location information is not available');
        break;

        case error.TIMEOUT:
            console.log('The request to get user location is timeout');
        break;

        case error.UNKNOWN_ERROR:
            console.log('Unknown error occured');
        break;
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;

    console.log('location saved');

    grantAccessContainer.classList.remove('active');

    console.log('conatainer removed');

    userInfoContainer.classList.remove('active');
    
    console.log('userInfo removed');
    
    loadingScreen.classList.add('active');
    
    console.log('loadingScreen added');


    // API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }


    catch(err){
        loadingScreen.classList.remove('active');
        console.log('Error occured in API Call');
    }
}

function renderWeatherInfo(weatherInfo) {
    // Firstly we have to fetch the elements

    // const cityName = document.querySelector('[data-cityName]');
    const countryIcon = document.querySelector('[data-countryIcon]');
    const desc = document.querySelector('[data-weatherDesc]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windspeed = document.querySelector('[data-windspeed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloudiness = document.querySelector('[data-cloudiness]');

    console.log(weatherInfo);
    // Fetch the value from weatherInfo and put it on UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText =    weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp}  °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed}  m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

}

grantAccessButton.addEventListener('click',getLocation);


const searchInput = document.querySelector("[data-searchInput]");


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ''){
        // return;
        console.log('hello error');
    }   
    else 
        fetchSearchWeatherInfo(cityName);
})


async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )

        const data = await response.json();
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
        // errorHandling();
    }
    catch(e){
        console.log('Caught error in city API');
    }
}

// errorHandling();

const errorImg = document.querySelector('[data-errorImg]');

// function errorHandling(){
//     console.log('function started')
//     if(!cityName === undefined ){
//     //   errorImg.src = `assets/not-found.png`;
//     //   errorImg.classList.add('active');
//     console.log('undefined caught ')
//     }
// }