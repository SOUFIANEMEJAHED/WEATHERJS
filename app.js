window.addEventListener('load',()=>{

    let logn;
    let lat; 
    let temperatureDescrpition=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span ');


if(navigator.geolocation){

         navigator.geolocation.getCurrentPosition(position  => {

        long = position.coords.longitude;
         lat  = position.coords.latitude; 


    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

fetch(api)

            .then(Response =>{

                return Response.json();
            })
            .then(data =>{

                console.log(data);
                 
                const {temperature,summary,icon}=  data.currently;
                 
                //set DOM Elements from The API 
            
                temperatureDegree.textContent =Math.floor(temperature);


                temperatureDescrpition.textContent= summary;
                locationTimezone.textContent=data.timezone; 

                //set Icon 

                setIcons(icon,document.querySelector('.icon'));

                //Formulaire pour Celsius 

                let celsius = (temperature - 33) * (5 / 9); 

                // change temperature To Celsius/Fre,heit 

                temperatureSection.addEventListener("click",() => {


                        if (temperatureSpan.textContent==="F"){

                            temperatureDegree.textContent =Math.floor(celsius);
                            temperatureSpan.textContent="C";
                        }else{

                            temperatureDegree.textContent =Math.floor(temperature);

                            temperatureSpan.textContent="F";

                        }






                })


            })


});
}

function setIcons(icon,iconID) {

    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();

    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
}

      
});