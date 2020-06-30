// options for navigator funtion
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


//   success funtion asynchronous
   async function success(pos) {
      var crd = pos.coords;
      var lat= crd.latitude;
      var lon= crd.longitude;
      console.log('Your current position is:');
      console.log(`Latitude : ${lat}`);
      console.log(`Longitude: ${lon}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    // data send to server
      const data={lat,lon};
      const option={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      };
    //   sending and getting respornse
    const res = await fetch("/",option);
        const d =await res.json();
        console.log(d);
        document.getElementById("city").innerHTML=d.city;
        document.getElementById("temp").innerHTML=d.temperature+"°C";
        document.getElementById("feel").innerHTML="feels like it is "+d.feel+"°C";
        document.getElementById("desc").innerHTML=d.desc;
        document.getElementById("icon").setAttribute("src",d.icon);
  }
//   error function
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
// main location funtion
  navigator.geolocation.getCurrentPosition(success, error, options);
  