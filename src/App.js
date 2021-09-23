import { useEffect, useState } from "react";
import Length from './component/Lenght'
import audio from './breakTime.mp3'

function App() {

  const [tiempo, setTiempo] = useState(5)
  const [breakTiempo, setbreakTiempo] = useState(3)
  const [sesionTiempo, setsesionTiempo] = useState(5)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)

  let sonido = new Audio(audio)

  useEffect(() => {
    if (tiempo <= 0) {
      setOnBreak(true);
    } else if (!timerOn && tiempo === breakTiempo) {
      setOnBreak(false);
    }
  }, [tiempo, onBreak, timerOn, breakTiempo, sesionTiempo]);

  const reproducirSonido = () => {
    sonido.currentTime = 0;
    const playPromise = sonido.play();

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          console.log("audio reproduciendose");
        })
        .catch(error => {
          console.log("error");
        });
    }
  }


  const formatTiempo = (time) => {
    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    return (
      (minutos < 10 ?
        "0" + minutos
        : minutos)
      + ":" +
      (segundos < 10 ?
        "0" + segundos
        : segundos)
    )
  }

  const cambioTiempo = (amount, tipo) => {
    if (tipo === 'break') {
      if (breakTiempo <= 60 && amount < 0) {
        return;
      }
      setbreakTiempo(prev => prev + amount)
    } else {
      if (sesionTiempo <= 60 && amount < 0) {
        return;
      }
      setsesionTiempo(prev => prev + amount)
      if (!timerOn) {
        setTiempo(sesionTiempo + amount)
      }
    }
  }

  const controlTiempo = () => {

    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setTiempo(prev => {

            if (prev <= 0 && !onBreakVariable) {
              reproducirSonido();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTiempo;
            } else if (prev <= 0 && onBreakVariable) {
              reproducirSonido();
              onBreakVariable = false;
              setOnBreak(false);
              return sesionTiempo;
            }

            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"))
    }
    setTimerOn(!timerOn)
  }

  const resetTiempo = () => {
    setTiempo(25 * 60)
    setbreakTiempo(5 * 60)
    setsesionTiempo(25 * 60)
  }



  return (
    <div className="center-align">
      <h1>Reloj Pomodoro</h1>
      <div className="dual-container">
        <Length
          titulo={"break Length"}
          cambioTiempo={cambioTiempo}
          tipo={"break"}
          tiempo={null}
          formatTime={formatTiempo(breakTiempo)}
        />

        <Length
          titulo={"sesion Length"}
          cambioTiempo={cambioTiempo}
          tipo={"sesion"}
          tiempo={null}
          formatTime={formatTiempo(sesionTiempo)}
        />
      </div>

      <h3>{onBreak ? "Break" : "sesion"}</h3>

      <h2>{formatTiempo(tiempo)}</h2>

      <button
        className="btn-large deep-purple lighten-2"
        onClick={controlTiempo}
      >
        {timerOn ?
          <i className="material-icons">pause_circle_filled</i>
          :
          <i className="material-icons">play_circle_filled</i>
        }
      </button>

      <button
        className="btn-large deep-purple lighten-2"
        onClick={resetTiempo}
      >
        <i className="material-icons">autorenew</i>
      </button>

    </div>
  );
}

export default App;
