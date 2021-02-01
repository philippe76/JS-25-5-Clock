
const App = () => {

    const [breakTime, setBreakTime] = React.useState(5) 
    const [sessionLength, setSessionLength] = React.useState(25) 
    
    const [totalTimeLeft, setTotalTimeLeft] = React.useState(1500)

    const [timer, setTimer] = React.useState(secondsToMmss(totalTimeLeft)) 
    const [running, setRunning] = React.useState(false)
    const [intervalNumber, setIntervalNumber] = React.useState()
    
    
    function secondsToMmss(totalSec) {
    
        let seconds = totalSec % 60;
        let minutes = (totalSec - seconds) / 60;
        
        seconds = (seconds < 10) ? `0${seconds}` : seconds
    
        return `${minutes}:${seconds}`;
    }

    const increment = (numb) => {
        if (numb === breakTime) {
            setBreakTime(numb+1)
        }
        else {
            if(sessionLength < 60){
                setSessionLength(numb+1)
            }
        }        
    }

    const decrement = (numb) => {
        if (numb === breakTime) {
            if(breakTime > 0){
                setBreakTime(numb-1)
            }
        }
        else {
            setSessionLength(numb-1)
        }        
    }

    const timerRun = () => {          
        if (!running) {   
            setRunning(true)         
            let timetoDisplay = totalTimeLeft
            let startRunning = setInterval(() => {
                timetoDisplay--
                setTimer(secondsToMmss(timetoDisplay))    
                setTotalTimeLeft(timetoDisplay)  
                setIntervalNumber(startRunning)
            },1000)
        }      
        else {
            setRunning(false)
            clearInterval(intervalNumber)           
        }             
    }


    const style= {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#db7093',
            color: 'white',
            fontFamily: 'Yusei Magic'
        },
        title: {
            fontSize: '2.5rem',
            letterSpacing: '0.2rem'
        },
        para: {
            marginBottom: 0
        },
        lengthContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '70%',
            fontSize: '1.3rem'
        },
        breakContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        sessionContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' 
        },
        timeContainer: {
            display: 'flex',
            width: '60%',
            justifyContent: 'space-around',
            alignItems: 'baseline',
        },
        timeLeft: {
            border: '3px solid white',
            padding: '0.5rem 2rem',
            borderRadius: '8px',
            marginTop: '2rem',
            width: '30%',
            textAlign: 'center'
        },
        sessionTitle: {
            fontSize: '1.8rem',
            marginBottom: '0.7rem'
        },
        counter: {
            fontSize: '3rem',
            marginBottom: '1.2rem'
        },
        icon: {
            fontSize: '1.8rem',
            padding: '0 1rem',
            cursor: 'pointer',
            marginBottom: '1rem'
        },
        playPause: {
            padding: '0 0.2rem'
        },
        counterCommand: {
            display: 'flex',
            justifyContent: 'center'
        }
    }

    return (
            <div style={style.container}>
                <h1 style={style.title}>25 + 5 CLOCK</h1>
                <section style={style.lengthContainer}>
                    <div id="break-label" style={style.breakContainer}>
                        <p style={style.para}>Break Container</p>
                        <div style={style.timeContainer}>
                            <i className="fa fa-arrow-circle-o-up" id="break-increment" style={style.icon} onClick={()=> increment(breakTime)}></i>
                            <p id="break-length">{breakTime}</p> 
                            <i className="fa fa-arrow-circle-o-down" id="break-decrement" style={style.icon} onClick={()=> decrement(breakTime)}></i>
                        </div>
                    </div>
                    <div id="session-label" style={style.sessionContainer}>
                        <p style={style.para}>Session Length</p>                        
                        <div style={style.timeContainer}>
                            <i className="fa fa-arrow-circle-o-up" id="session-increment" style={style.icon} onClick={()=> increment(sessionLength)}></i>
                            <p id="session-length">{sessionLength}</p> 
                            <i className="fa fa-arrow-circle-o-down" id="session-decrement" style={style.icon} onClick={()=> decrement(sessionLength)}></i>
                        </div>
                    </div>
                </section>
                <section id="timer-label" style={style.timeLeft}>
                    <p style={style.sessionTitle}>Session</p> 
                    <div id="time-left" style={style.counter}>{timer}</div>
                    <div style={style.counterCommand}>
                    <div id="start_stop" onClick={timerRun}>
                        <i className="fa fa-play" style={{...style.icon, ...style.playPause}}></i>
                        <i className="fa fa-pause"  style={{...style.icon, ...style.playPause}}></i>
                    </div>                    
                    <i className="fa fa-refresh" id="reset" style={{...style.icon, marginLeft: '1.2rem'}}></i>
                    </div>
                </section>
                <p>by Filip</p>
            </div>
        )
}

ReactDOM.render(<App/>, document.getElementById('app'))