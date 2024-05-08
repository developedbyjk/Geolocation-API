
let mydata = document.getElementById('data');

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
}



function showPosition(position){

    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;

    // data.innerHTML = `Latitude: ${latitude} <br> Longitude: ${longitude}`

    var api_url = "https://nominatim.openstreetmap.org/reverse?lat=" + latitude + "&lon=" + longitude + "&format=json";

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const {country_code,town,country,county,state,state_district,postcode} = data.address;
     
            mydata.innerHTML = `
            
            <ul>
            <br>
                <li><span>🌍 Country:</span> ${country}</li>
                <li><span>🗺️ Country Code:</span> ${country_code}</li>
                <li><span>🏡 County:</span> ${county}</li>
                <li><span>📮 Postcode:</span> ${postcode}</li>
                <li><span>🌏 State:</span> ${state}</li>
                <li><span>🏞️ State District:</span> ${state_district}</li>
                <li><span>🏘️ Town:</span> ${town}</li>
            </ul>
            
            `
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            data.textContent = "Error fetching location.";
        });

}

function showError(e){
    if(e.PERMISSION_DENIED){
        data.innerHTML = 'User denied the request for Geolocation.'
    }
}