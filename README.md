# ☀️ Weather App

A beautiful, modern weather application that provides real-time weather data for any city around the world. Built with vanilla HTML, CSS, and JavaScript.

![Weather App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🌍 **Real-time Weather Data** - Get current weather information for any city worldwide
- 🎨 **Modern UI Design** - Beautiful, responsive interface with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Smart Search** - Easy-to-use search functionality with error handling
- 💾 **Local Storage** - Remembers your last searched city
- 🌡️ **Detailed Information** - Temperature, humidity, wind speed, pressure, and more
- ⚡ **Fast & Lightweight** - No frameworks, pure vanilla JavaScript

## 🚀 Demo

![Weather App Screenshot](screenshot.png)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **JavaScript (ES6+)** - Async/await, fetch API, local storage
- **OpenWeatherMap API** - Weather data provider
- **Google Fonts** - Inter font family

## 📋 Prerequisites

Before you begin, you'll need:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An API key from [OpenWeatherMap](https://openweathermap.org/api)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Weather-App.git
   cd Weather-App
   ```

2. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key

3. **Configure the API key**
   - Open `script.js`
   - Replace the API key on line 3:
   ```javascript
   API_KEY: 'YOUR_API_KEY_HERE'
   ```

4. **Run the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

5. **Start searching!**
   - Enter any city name and press Enter or click the search button

## 📁 Project Structure

```
Weather-App/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Application logic
├── README.md           # Project documentation
└── .gitignore         # Git ignore rules
```

## 🎯 How It Works

1. **User Input**: Enter a city name in the search box
2. **API Request**: App sends request to OpenWeatherMap API
3. **Data Processing**: Weather data is fetched and processed
4. **Display**: Information is displayed in a beautiful, easy-to-read format

## 🌟 Key Features Explained

### Weather Information Displayed
- Current temperature
- Minimum and maximum temperature
- "Feels like" temperature
- Weather condition (sunny, cloudy, rainy, etc.)
- Humidity percentage
- Wind speed
- Atmospheric pressure

### User Experience
- Loading state while fetching data
- Error handling for invalid cities
- Offline detection
- Smooth animations and transitions
- Responsive design for all screen sizes

## 🔒 Security Note

⚠️ **Important**: Never commit your API key to a public repository!

For production use, consider:
- Using environment variables
- Implementing a backend proxy
- Using API key restrictions in OpenWeatherMap dashboard

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from OpenWeatherMap
- Font: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

⭐ If you found this project helpful, please give it a star!
