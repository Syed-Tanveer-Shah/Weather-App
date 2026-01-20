// ===== WEATHER APP CONFIGURATION =====
const CONFIG = {
    API_KEY: '8ac5c4d57ba6a4b3dfcf622700447b1e', // OpenWeatherMap API Key
    API_BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
    UNITS: 'metric', // Use metric for Celsius, 'imperial' for Fahrenheit
    DEFAULT_CITY: 'London'
};

// ===== DOM ELEMENTS =====
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    
    // States
    initialState: document.getElementById('initialState'),
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    weatherContent: document.getElementById('weatherContent'),
    
    // Weather Data Elements
    cityName: document.getElementById('cityName'),
    dateTime: document.getElementById('dateTime'),
    weatherCondition: document.getElementById('weatherCondition'),
    weatherIcon: document.getElementById('weatherIcon'),
    temperature: document.getElementById('temperature'),
    minTemp: document.getElementById('minTemp'),
    maxTemp: document.getElementById('maxTemp'),
    feelsLike: document.getElementById('feelsLike'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    errorMessage: document.getElementById('errorMessage')
};

// ===== STATE MANAGEMENT =====
function showState(stateName) {
    // Hide all states
    elements.initialState.classList.add('hidden');
    elements.loadingState.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    elements.weatherContent.classList.add('hidden');
    
    // Show requested state
    switch(stateName) {
        case 'initial':
            elements.initialState.classList.remove('hidden');
            break;
        case 'loading':
            elements.loadingState.classList.remove('hidden');
            break;
        case 'error':
            elements.errorState.classList.remove('hidden');
            break;
        case 'weather':
            elements.weatherContent.classList.remove('hidden');
            break;
    }
}

// ===== UTILITY FUNCTIONS =====
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function formatDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('en-US', options).replace(',', ' at');
}

function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

function capitalizeWords(str) {
    return str.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

// ===== API FUNCTIONS =====
async function fetchWeatherData(city) {
    try {
        const url = `${CONFIG.API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=${CONFIG.UNITS}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 401) {
                throw new Error('Invalid API key');
            } else {
                throw new Error('Failed to fetch weather data');
            }
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        throw error;
    }
}

// ===== DISPLAY FUNCTIONS =====
function displayWeatherData(data) {
    // Location and Time
    const locationName = `${data.name}, ${data.sys.country}`;
    elements.cityName.textContent = locationName;
    elements.dateTime.textContent = formatDateTime();
    
    // Weather Condition
    const condition = capitalizeWords(data.weather[0].description);
    elements.weatherCondition.textContent = condition;
    
    // Weather Icon
    const iconCode = data.weather[0].icon;
    elements.weatherIcon.src = getWeatherIconUrl(iconCode);
    elements.weatherIcon.alt = condition;
    
    // Temperature
    const temp = Math.round(data.main.temp);
    const minTemp = Math.round(data.main.temp_min);
    const maxTemp = Math.round(data.main.temp_max);
    const feelsLike = Math.round(data.main.feels_like);
    
    elements.temperature.textContent = `${temp}°`;
    elements.minTemp.textContent = `Min ${minTemp}°`;
    elements.maxTemp.textContent = `Max ${maxTemp}°`;
    elements.feelsLike.textContent = `${feelsLike}°`;
    
    // Other Details
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${data.wind.speed} m/s`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
    
    // Show weather content
    showState('weather');
}

function displayError(message) {
    elements.errorMessage.textContent = message;
    showState('error');
}

// ===== SEARCH FUNCTIONALITY =====
async function searchWeather(city) {
    if (!city || city.trim() === '') {
        displayError('Please enter a city name');
        return;
    }
    
    // Show loading state
    showState('loading');
    
    try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
        
        // Save last searched city to localStorage
        localStorage.setItem('lastSearchedCity', city);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        
        if (error.message === 'City not found') {
            displayError('City not found');
        } else if (error.message === 'Invalid API key') {
            displayError('API configuration error');
        } else {
            displayError('Unable to fetch weather data');
        }
    }
}

// ===== EVENT LISTENERS =====
elements.searchBtn.addEventListener('click', () => {
    const city = elements.cityInput.value.trim();
    searchWeather(city);
});

elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = elements.cityInput.value.trim();
        searchWeather(city);
    }
});

// Focus input on load
elements.cityInput.addEventListener('focus', () => {
    elements.cityInput.select();
});

// ===== INITIALIZATION =====
function init() {
    // Check if there's a last searched city
    const lastCity = localStorage.getItem('lastSearchedCity');
    
    if (lastCity) {
        elements.cityInput.value = lastCity;
        searchWeather(lastCity);
    } else {
        // Show initial state
        showState('initial');
    }
    
    // Focus on input
    elements.cityInput.focus();
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== ADDITIONAL FEATURES =====

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    displayError('No internet connection');
});

// Prevent form submission if wrapped in form
const form = elements.cityInput.closest('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = elements.cityInput.value.trim();
        searchWeather(city);
    });
}
