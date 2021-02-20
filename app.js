
const App = () => {

    const [sessionLength, setSessionLength] = React.useState(1)  
    const [breakLength, setbreakLength] = React.useState(2) 

    const [timeName, setTimeName] = React.useState('Session') 
    const [running, setRunning] = React.useState(false)
    const [intervalNumb, setIntervalNumb] = React.useState()
    const [timer, setTimer] = React.useState(secondsToMmss(sessionLength*60))  
    
    const [pausedTimer, setpausedTimer] = React.useState()
    const [lastMinute, setLastMinute] = React.useState(false)

    const [zero, setZero] = React.useState(false)
    const [counter, setCounter] = React.useState(0)   


    // TURN SECONDS TO MM:SS SCHEMA //
    function secondsToMmss(totalSec) {    
        let seconds = totalSec % 60;
        let minutes = (totalSec - seconds) / 60;        
        seconds = (seconds < 10) ? `0${seconds}` : seconds;    
        return `${minutes}:${seconds}`;
    }

    // INCREASE TIMER LENGTH //
    const increment = (numb, whichOne) => {
        if (whichOne === 'break') {
            if (breakLength < 60){
                setbreakLength(numb+1)
            }
        }
        else {
            if (sessionLength < 60){
                setSessionLength(numb+1)
            }
        }   
    }

    // DECREASE TIMER LENGTH //
    const decrement = (numb, whichOne) => {
        if (whichOne === 'break') {
            if (breakLength > 1){
                setbreakLength(numb-1)
            }
        }
        else {
            if (sessionLength > 1){
                setSessionLength(numb-1)
            }
        }     
    }

    // RESET VARIABLES //
    const resetAll = () => {
        setRunning(false);
        clearInterval(intervalNumb);  
        setbreakLength(5);
        setSessionLength(25);
        setTimer(secondsToMmss(sessionLength*60));
        setLastMinute(false);
        setpausedTimer(0);
    }


    
    // TIME RUNNING FUNCTION //
    const timerRun = () => {   

        // IF TIMER NO RUNNING (first launch or paused)
        if (!running) {  
            setRunning(true);   
            let timetoDisplay = sessionLength*60;

            if (pausedTimer !== undefined) {
               timetoDisplay = pausedTimer;
            }  
            if (zero) {
                timetoDisplay = timeName === 'Session' ? sessionLength*60 : breakLength*60;
                setCounter(counter+1)
            }

            let timerRunning = setInterval( () => {
                timetoDisplay--;
                timetoDisplay <= 60 && setLastMinute(true);
                setTimer(secondsToMmss(timetoDisplay));    
                setpausedTimer(timetoDisplay);
                setIntervalNumb(timerRunning);
            },1000)     
        }    

        // IF TIMER RUNNING   
        else {
            setRunning(false);
            clearInterval(intervalNumb);   
        }             
    }


    // TIMER IS 0:00 //
    React.useEffect(()=> {

        if (timer === '0:00') {

            if (counter > 1) {
                resetAll();
            }
            else {
                setRunning(false);
                clearInterval(intervalNumb);
                setTimeout(() => {
                    setLastMinute(false); 
                    if (timeName === 'Session') {
                        setTimeName('Break');
                        setTimer(secondsToMmss(breakLength*60));
                    }
                    else {
                        setTimeName('Session'); 
                        setTimer(secondsToMmss(sessionLength*60));
                    }
                    setZero(true);                    
                }, 1000);  
            }
            
        }
        if (zero &&  counter < 2) {
            timerRun();  
            setZero(false);         
        }
    }, [timer,zero, counter])


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
            fontSize: '2rem',
            marginBottom: '0.7rem',
            color:  lastMinute ? '#8B0000': 'white'
        },
        counter: {
            fontSize: '3.5rem',
            marginBottom: '1.2rem',
            color:  lastMinute ? '#8B0000': 'white'
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
            justifyContent: 'center',
            marginTop: '1.6rem'
        }
    }

    return (
            <div style={style.container}>
                <h1 style={style.title}>POMODORO CLOCK</h1>
                <section style={style.lengthContainer}>
                    <div id="break-label" style={style.breakContainer}>
                        <p style={style.para}>Break Length</p>
                        <div style={style.timeContainer}>
                            <i className="fa fa-arrow-circle-o-up" id="break-increment" style={style.icon} onClick={()=> increment(breakLength, 'break')}></i>
                            <p id="break-length">{breakLength}</p> 
                            <i className="fa fa-arrow-circle-o-down" id="break-decrement" style={style.icon} onClick={()=> decrement(breakLength, 'break')}></i>
                        </div>
                    </div>
                    <div id="session-label" style={style.sessionContainer}>
                        <p style={style.para}>Session Length</p>                        
                        <div style={style.timeContainer}>
                            <i className="fa fa-arrow-circle-o-up" id="session-increment" style={style.icon} onClick={()=> increment(sessionLength, 'length')}></i>
                            <p id="session-length">{sessionLength}</p> 
                            <i className="fa fa-arrow-circle-o-down" id="session-decrement" style={style.icon} onClick={()=> decrement(sessionLength, 'length')}></i>
                        </div>
                    </div>
                </section>
                <section id="timer-label" style={style.timeLeft}>
                    <p style={style.sessionTitle}>{timeName}</p> 
                    <div id="time-left" style={style.counter}>{timer}</div>
                    <div style={style.counterCommand}>
                    <div id="start_stop" onClick={timerRun}>
                        <i className="fa fa-play" style={{...style.icon, ...style.playPause}}></i>
                        <i className="fa fa-pause"  style={{...style.icon, ...style.playPause}}></i>
                    </div>                    
                    <i className="fa fa-refresh" id="reset" style={{...style.icon, marginLeft: '1.2rem'}} onClick={resetAll}></i>
                    </div>
                </section>
                <p>by Filip</p>
            </div>
        )
}

ReactDOM.render(<App/>, document.getElementById('app'))