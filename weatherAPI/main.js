
let city = "chandigarh"
let key = "a988d9c58c10f388a7b4afc4ff3c563c"
let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

let lat;
let lon;
axios.get(url)
.then((data)=>{
    console.log(data);
    return{
        'lat' : data.data[0].lat,
        'lon' : data.data[0].lon
    }
})
.then((data)=>{
    let newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${key}`
    return axios.get(newUrl)
})
.then((data)=>{
    console.log(data.data);
})

.catch((error)=>{
    console.log(error);
})
