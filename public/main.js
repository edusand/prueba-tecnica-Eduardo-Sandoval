// TODO: agregar banderas y fotografias del pais/ciudad y un mapa para seleccionar
// aqui va tu llave llave
const API_KEY = ""; // https://www.weatherapi.com/my/

// elementos del DOM
const search_btn = document.querySelector(".search-btn");
const city_input = document.querySelector(".city-input");
const curr_location_btn = document.querySelector(".location-btn");

const city_val_element = document.querySelector(".city-val");

const tmp_val_element = document.querySelector(".tmp-val");
const wind_val_element = document.querySelector(".wind-val");
const humidity_val_element = document.querySelector(".humidity-val");

const weather_icon_element = document.querySelector(".weather-icon");
const weather_txt_val_element = document.querySelector(".weather-txt-val");

const weather_cards_div = document.querySelector(".weather-cards");

// para solicitudes al api
const tepic_lat = 21.50951;
const tepic_long = -104.89569;

let lat;
let long;

// para respuestas del api
let location_name;
let location_region;
let location_country;
let location_localtime;

let current_is_day;
let current_temp_c;
let current_wind_kph;
let current_humidity;

let current_condition_text;
let current_condition_icon;


/* refresca vista aqui porque los datos regresan async */
async function get_set_update_weather_view_for(lat, long, city, first_time) {
	let API_URL;

	if (first_time) API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${tepic_lat},${tepic_long}`;
	else if (city) API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
	else API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}`;

	await fetch (API_URL).then(res => res.json()).then((weather_data) => {
		set(weather_data); // cadenita
		// TODO: el forecast API me regresa el dia actual tambien; usarlo para hacer solo un fetch
		get_set_update_forecast(6, weather_data.location.name);
	}).catch ((err) => {
		alert("Ocurrio un error al obtener las coordenadas!");
		console.log(err);
	});
}

function set(weather_data) {
	location_name = weather_data.location.name;
	location_region = weather_data.location.region;
	location_country = weather_data.location.country;
	location_localtime = weather_data.location.localtime;

	current_is_day = weather_data.current.is_day;
	current_temp_c = weather_data.current.temp_c;
	current_wind_kph = weather_data.current.wind_kph;
	current_humidity = weather_data.current.humidity;

	current_condition_text = weather_data.current.condition.text;
	current_condition_icon = `https:${weather_data.current.condition.icon}`;

	update_view(); // cadenita
}

function update_view() {
	city_val_element.innerHTML = `${location_name}, ${location_region}, ${location_country} (${location_localtime})`;

	tmp_val_element.innerHTML = `Temperatura: ${current_temp_c}℃`;
	wind_val_element.innerHTML = `Viento: ${current_wind_kph}k/h`;
	humidity_val_element.innerHTML = `Humedad: ${current_humidity}%`;

	weather_icon_element.innerHTML = current_condition_icon;
	weather_txt_val_element.innerHTML = current_condition_text;

	// cambiar tema dia/noche de acuerdo al lugar consultado
	if (current_is_day == 1) document.body.setAttribute("data-theme", "light-theme");
	else document.body.setAttribute("data-theme", "dark-theme");
}

async function get_set_update_forecast(days, city) {
	let API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;

	await fetch (API_URL).then(res => res.json()).then((forecast_data) => {
		const five_next_days_forecast = [];

		// quitar hoy del pronostico
		for (let i = 1; i < forecast_data.forecast.forecastday.length; i++) {
			five_next_days_forecast.push(forecast_data.forecast.forecastday[i]);
		}
		
		// borrar valores antiguos
		city_input.value = "";
		weather_cards_div.innerHTML = "";

		five_next_days_forecast.forEach(weather_item => {
			// aqui creamos los weather cards
			weather_cards_div.insertAdjacentHTML("beforeend", create_weather_card(weather_item));
		});
	}).catch ((err) => {
		alert("Ocurrio un error al obtener las coordenadas!");
		console.log(err);
	});
}

function create_weather_card(weather_item) {
	return `<li class="card">
				<h2>(${weather_item.date})</h2>
				<img src="https://${weather_item.day.condition.icon}" alt="weather-icon">
				<h4>${weather_item.day.condition.text}</h4>
				<h4>Temp: ${weather_item.day.avgtemp_c}℃</h4>
				<h4">Viento:  ${weather_item.day.maxwind_kph}K/H</h4>
				<h4>Humedad: ${weather_item.day.avghumidity}%</h4>
			</li>`;
}


// eventos
search_btn.addEventListener("click", () => {
	let city = city_input.value.trim()
	if (!city) return;

	/* Esto hace demasiado jaja
	 * Quedo como cadenita para asegurar no referenciar valores indefinidos pues el fetch es async.
	 *
	 * TODO: Lo quise hacer como: `get_weather_for(null, null, city_name).then(set(weather_data)).then(update_view)` 
	 * pero seteaba los campos antes de recibir los valores del servidor (quedaban `undefined`)
	 */
	get_set_update_weather_view_for(null, null, city);
});

curr_location_btn.addEventListener("click", () => {
	/* Esto solo funciona con https sobre la red (en localhost no importa) */
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude.toString();
			long = position.coords.longitude.toString();

			get_set_update_weather_view_for(lat, long);
		});
	} else div.innerHTML = "Geolocacion no existe para este navegador.";
});

get_set_update_weather_view_for(null, null, null, "first-time"); // primera vez