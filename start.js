
// programming button
document.getElementById('proButton').addEventListener('click', function() {
    fetch('https://v2.jokeapi.dev/joke/programming')
        .then(response => response.json())
        .then(data => {
            let joke = '';
            if (data.type === 'single') {
                joke = data.joke;
            } else {
                joke = `${data.setup} ${data.delivery}`;
            }
            document.getElementById('jokeText').innerText = joke;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeText').innerText = 'Error fetching joke. Please try again later.';
        });
});

// dark button
document.getElementById('darkButton').addEventListener('click', function() {
    fetch('https://v2.jokeapi.dev/joke/dark')
        .then(response => response.json())
        .then(data => {
            let joke = '';
            if (data.type === 'single') {
                joke = data.joke;
            } else {
                joke = `${data.setup} ${data.delivery}`;
            }
            document.getElementById('jokeText').innerText = joke;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeText').innerText = 'Error fetching joke. Please try again later.';
        });
});
// pun button
document.getElementById('punButton').addEventListener('click', function() {
    fetch('https://v2.jokeapi.dev/joke/pun')
        .then(response => response.json())
        .then(data => {
            let joke = '';
            if (data.type === 'single') {
                joke = data.joke;
            } else {
                joke = `${data.setup} ${data.delivery}`;
            }
            document.getElementById('jokeText').innerText = joke;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeText').innerText = 'Error fetching joke. Please try again later.';
        });
});

// geolocation stuff
let max_temp = 0;
let max_precip = 0;
document.getElementById('searchButton').addEventListener('click', async function() {
    const apiKey = "f2edd5d40bf24f0c828fd019be86604a";
    const city = document.getElementById('cityInput').value;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${city}&lang=en&limit=10&type=city&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const lon = data.features[0].properties.lon;
        const lat = data.features[0].properties.lat;

        const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,rain&forecast_days=1`;
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        console.log(data2)

        max_temp = Math.max(...data2.hourly.temperature_2m);
        max_temp = ((max_temp * (9/5)) + 32).toFixed(2)
        max_precip = Math.max(...data2.hourly.precipitation_probability);


        document.getElementById('results').innerText = `High temp for today: ${max_temp}°F, Chance of rain today: ${max_precip}%`;
        if(max_temp >70){
            document.getElementById('tips1').innerText += `\n Wear a short sleeve shirt 😎`
        }
        else{
            document.getElementById('tips1').innerText += `\n Wear a jacket! brr🥶`
        }
        if(max_precip > 50){
            document.getElementById('tips2').innerText += `\n Bring an umbrella!☂️`
        }
        else{
            document.getElementById('tips2').innerText += `\n No need for an umbrella!😊`
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerText = 'Error fetching data. Please try again later.';
    }
});