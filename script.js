const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const grantAccessContainer = document.querySelector('.grant-location-container');
const userInfoContainer = document.querySelector(".user-info-container");

const API_KEY = "71d984d31ee2d76763e45832e74bf98c";

const oldTab = userTab;
oldTab.classList.add('current-tab');
getfromSessionStorage();

function switchTab(newTab){
    if(newTab != oldTab){
        oldTab.classList.remove('current-tab');
        searchTab.classList.add('current-tab');
        userInfoContainer.classList.remove('active');
        grantAccessContainer.classList.remove('active');
        searchForm.classList.add('active');
    }

    else{
        searchTab.classList.remove('current-tab');
        oldTab.classList.add('current-tab');
        grantAccessContainer.classList.remove('active');
        searchForm.classList.add('active');        
        userInfoContainer.classList.add('active');

        // Ab weather tab mei aa gya hoo toh weather bhi display karna padega so let's check local storage
        // for coordinates, if we have saved them there.
    }
}

userTab.addEventListener('click', ()=>{
    switchTab(userTab);
});


searchTab.addEventListener('click', ()=>{
    switchTab(searchTab);
})

// Check if the coordinates are already present in session storage 
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem('user-coordinates');
    if(!localCoordinates){
        // agar local nahi mile toh
        grantAccessContainer.classList.add('active');
    }

    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert('You have not geolocation support');
    }
}

const grantAccessButton = document.querySelector('[data-grantAccess]');

grantAccessButton.addEventListener('click',getLocation)

