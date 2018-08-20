window.addEventListener('load', init);
var mymap;
function init() {
    bindEvents();
    fillDefault();
    callAPI();
    mymap = L.map('mapid').setView([28.6139,77.2090], 13);
}

function bindEvents() {
    document.querySelector('#search').addEventListener('click', callAPI);
}

 function fillDefault() {
     document.querySelector('#citysearch').value = 'Delhi';

 }

function callAPI() {
    var city = document.querySelector('#citysearch').value;
     
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=bd49634fea8ac883cd694378e86c6c34";
    console.log(url);
    fetch(url).then(received => {
        console.log('recieved is ', received);
        received.json().then(data => {
            console.log('data is : ', data);
            setCity(data);
        }).catch(err => {
            console.log('error in data is ', err);
        })
    }).catch(err => {
        console.log('err in received is ', err);
    })
}


function setCity(data){

    if (data.cod != 404) {

    initMap(data.coord.lat, data.coord.lon);
    } else {
        window.alert("That's not a real city");
    }       
    

}



// function printImage(data) {
//     console.log('here');

// }

// function printWeather(data) {
//     if (data.cod != 404) {
//         document.querySelector('#minTemp').innerText = data.main.temp_min - 273.15;
//         document.querySelector('#maxTemp').innerText = data.main.temp_max - 273.15;
//         document.querySelector('#avgTemp').innerText = (parseInt(document.querySelector('#minTemp').innerText) + parseInt(document.querySelector('#maxTemp').innerText)) / 2;
//         document.querySelector('#clouds').innerText = data.clouds.all + "%";
//         document.querySelector('#humidity').innerText = data.main.humidity + "%";
//         document.querySelector('#weather').innerText = data.weather[0].main;
//         document.querySelector('#windSpeed').innerText = data.wind.speed + " m/s";
//         // document.querySelector('#gustSpeed').innerText = data.wind.gust + " m/s";
//         var dirDegree = data.wind.deg / 22.5;
//         var direction;
//         console.log(dirDegree);
//         if (dirDegree >= 2 && dirDegree < 4) {
//             direction = "North-East";
//         } else if (dirDegree >= 4 && dirDegree < 6) {
//             direction = "East";
//         } else if (dirDegree >= 6 && dirDegree < 8) {
//             direction = "South-East";
//         } else if (dirDegree >= 8 && dirDegree < 10) {
//             direction = "South";
//         } else if (dirDegree >= 10 && dirDegree < 12) {
//             direction = "South-West";
//         } else if (dirDegree >= 12 && dirDegree < 14) {
//             direction = "West";
//         } else if (dirDegree >= 4 && dirDegree < 6) {
//             direction = "North-West";
//         } else if (dirDegree >= 17 || dirDegree < 2) {
//             direction = "North";
//         }
//         document.querySelector('#direction').innerText = direction
//         initMap(data.coord.lat, data.coord.lon);
//     } else {
//         window.alert("That's not a real city");
//     }




// }

// function initMap(lat, lon) {

//     var map = new MapmyIndia.Map("map", {
//         center: [lat, lon],
//         zoomControl: true,
//         hybrid: true,
//         search: true,
//         location: true
//       });

//      var marker = L.marker([lat,lon]).addTo(map);
//     // console.log(map);

//     document.querySelector('#map');
//     // marker.bindPopup("<b>Hey There!</b><br>This is the place u searched for.").openPopup();
// }

function initMap(lat, lon) {
    mymap.setView([lat,lon],13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap)


    L.marker([lat,lon]).addTo(mymap)
        .bindPopup("Hello world. <br> I am " + document.querySelector("#citysearch").value).openPopup();

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
}