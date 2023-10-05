
import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import './App.css'



function App() {

const [cityName, setCityName] = useState('Taganrog') //начальный город который будет всегда показываться
const [inputText, setInputText] = useState("")// слдеит за стоянием строкой
const [data, setData] = useState({}) //то что придет с сервера(наш ответ)
const [error, setError] = useState(false) //чтобы обробатывать ошибки
const [loading, setLoading] = useState(true) //загрузка успешная или не усешная

useEffect(() => { // нужен для запроса к апи, 
  fetch ( //запрос на сервер
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=be4ccd12e1c82639c7bd3b54e4a02c70&units=metric`
)

.then((res) => { //начало обработки промиса(обещание вернуть данные )
  if (res.status === 200) { 
    error && setError(false) 
    return res.json();
  } else {
    throw new Error('Something went wrong')
  }
})
.then((data) => { // это те данные которые пришли с  сервера обработаную
  setData(data) // это то уже с чем мы будем рабоать
})
.catch(() => setError(true)) // переводм ошиьку в состояние тру
.finally (() => setLoading(false)); // функция которая выполнится в любом случае есть ли или нет ошибки

}, [cityName, error]) // зависимость 

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCityName(e.target.value);
      setInputText("") // очистися строка
   }
  }

  return (
    <div className="bg_img">
      {! loading ? (
        <>
          <TextField // это наше поле ввода которое взяли из библиотеки
          variant="filled" //это значит что он заполнен текстом
          label="Search location" // это означает что написано в поле
          className="input"
          error='{error}'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // когда в импуте что то поменяется, и запустися функция он чанч, переменная импут текст меняется то что ммы написали в импут
          onKeyDown={handleSearch} //это событие типо нажатия кнопки
          /> 
          <h1 className="city">{data.name}</h1>
          <div className="weather_img">
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather" />
            <h1>{data.weather[0].main}</h1>
           </div>
           
           <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

           <Slide in={!loading}>
            <div className="container">
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()} %</h1>
              </div>
              <div className="box">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>
              <div className="box">
                <p>Feels like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
           </Slide>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
