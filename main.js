let loc = document.getElementById('location');
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");

let iconfile;

// search input

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


// Code for particular location ----------->

// After button submit then browser refresh and again pop up will display . so that to prevent while search.
searchButton.addEventListener('click',(e)=>{
e.preventDefault();

// getWeather.

getWeather(searchInput.value);
searchInput.value='';

});

const getWeather=async(city)=>{
    try{
        const respone=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=770cc7313b30c481be2c79f12dc647c9`);
        const weatherData= await respone.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];


        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if(id<300 && id>200){
            tempicon.src="storm.png";
        }
        else if(id<400 && id>300){
            tempicon.src="cloudy.png";
        }
        else if(id<600 && id>=500){
            tempicon.src="rain.png";
        }

        else if(id<700 && id>600){
            tempicon.src="snow.png";
        }
        else if(id<800 && id>700){
            tempicon.src="weather.png";
        }
        else if(id==800){
            tempicon.src="weather.png";
        }

    }
    catch(error){
        alert('city not found');
    }

}










// Fetching the weather for current location


//Pop message display to allow current location or not
window.addEventListener("load", () => {

    let long;
    let lat;

    if (navigator.geolocation) {  // if user allow
        navigator.geolocation.getCurrentPosition((position) => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            // fetch data from api key

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=770cc7313b30c481be2c79f12dc647c9
            `;

            // this api data fetch in json format 
            fetch(api).then((response) => {

                return response.json();
            })
                .then(data => { // convert json data into normal
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);

                    if(id<300 && id>200){
                        tempicon.src="storm.png";
                    }
                    else if(id<400 && id>300){
                        tempicon.src="cloudy.png";
                    }
                    else if(id<600 && id>500){
                        tempicon.src="rain.png";
                    }

                    else if(id<700 && id>600){
                        tempicon.src="snow.png";
                    }
                    else if(id>700&& id<800) {
                        tempicon.src="weather.png";

                    }
                    else if(id>800){
                        tempicon.src="https://cdn-icons-png.flaticon.com/512/4064/4064269.png";
                    }
                    else if(id==800){
                        tempicon.src="weather.png";
                    }

                    console.log(data);

                })
        }


        )

    }

})