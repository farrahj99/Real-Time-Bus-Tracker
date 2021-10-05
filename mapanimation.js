
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFycmFoajk5IiwiYSI6ImNrdWRuYnNnazFieDgyb21uZGdxanI4ZzEifQ.bnNn3QPfQrazf6M00gmu8g';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.35554],
    zoom: 12
});

var marker = new mapboxgl.Marker()
     .setLngLat([0, 0])
     .addTo(map);

function move(){
     async function run(){
     const locations = await getBusLocations();
     const latestLocation = locations[0];
     return latestLocation;
  }

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json(); //extract the data 
    return json.data; 
}

var livelocation = run();
var latitude = 0;
var longitude = 0;

livelocation.then((value) => {
    latitude = value.attributes.latitude;
    longitude = value.attributes.longitude;  
})
       
    
setTimeout(()=>{
     marker.setLngLat([longitude, latitude]);
     console.log(`[${latitude}, ${longitude}]`);
     console.log(new Date());
     move(); 
   }, 15000);
}
