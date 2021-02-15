
const App = () => {

    const [timeName, setTimeName] = React.useState('Session') 
    const [running, setRunning] = React.useState(false)
    
    const [breakLength, setbreakLength] = React.useState(5) 
    const [sessionLength, setSessionLength] = React.useState(1)     
    const [timer, setTimer] = React.useState(secondsToMmss(sessionLength*10)) 
 
    const [sessionNumber, setSessionNumber] = React.useState()
    const [breakNumber, setBreakNumber] = React.useState()

    const [pausedTimer, setpausedTimer] = React.useState(0)
    const [lastMinute, setLastMinute] = React.useState(false)
    const [counter, setCounter] = React.useState(0)

    const [pause, setPause] = React.useState(false)
    
    // TURN SECONDS TO MM:SS SCHEMA
    function secondsToMmss(totalSec) {    
        let seconds = totalSec % 60;
        let minutes = (totalSec - seconds) / 60;        
        seconds = (seconds < 10) ? `0${seconds}` : seconds;    
        return `${minutes}:${seconds}`;
    }

    // INCREMENT TIMER LENGTH
    const increment = (numb, whichOne) => {
        if (whichOne === 'break') {
            setbreakLength(numb+1)
        }
        else {
            if (sessionLength < 60){
                setSessionLength(numb+1)
            }
        }   
    }

    // DECREMENT TIMER LENGTH
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

    // WHEN COUNTER REACH 0:00
    const reachZero = () => {
                            // console.log('TIMBER !!!!!');
                            setPause(true)
                            setTimeout(() => {
                                setLastMinute(false);
                                timeName === 'Session' ? setTimeName('Break') : setTimeName('Session')                      
                            }, 1000); 
                
                            if (timeName === 'Session') {
                                    let timetoDisplay = breakLength*10;   
                                    let breakRunning = setInterval(() => {
                                        timetoDisplay--;
                                        timetoDisplay <= 60 ? setLastMinute(true) : setLastMinute(false);
                                        setTimer(secondsToMmss(timetoDisplay));
                                        setpausedTimer(timetoDisplay);
                                        setBreakNumber(breakRunning);
                                        setPause(true)
                                        // console.log("break is running");
                                        // console.log("timetoDisplay ", timetoDisplay);
                                    },1000)            
                
                            }
                            else {
                                setCounter(counter+1)
                                let timetoDisplay = sessionLength*10;
                                let sessionRunning = setInterval(() => {
                                    timetoDisplay--;
                                    timetoDisplay <= 60 ? setLastMinute(true) : setLastMinute(false);
                                    setTimer(secondsToMmss(timetoDisplay));
                                    setpausedTimer(timetoDisplay);
                                    setSessionNumber(sessionRunning);
                                },1000)
                            }  
    }


    const timerRun = () => {   
        
        // IF TIMER IS NOT RUNNING 
        if (!running) {  
            setRunning(true);   
            let timetoDisplay = sessionLength*10;    
            setCounter(counter+1);
            if (pausedTimer !== 0) {
               timetoDisplay = pausedTimer 
            }  

            // MAKE SESSION TIMER RUNNING 
            if (timeName === 'Session') {
                let sessionRunning = setInterval( () => {
                    console.log('SESSION_TIME');
                    timetoDisplay--;
                    timetoDisplay <= 60 && setLastMinute(true);
                    setTimer(secondsToMmss(timetoDisplay));    
                    setpausedTimer(timetoDisplay);
                    setSessionNumber(sessionRunning);
    
                    // IF TIMER REACHES 0:00 
                    if (timetoDisplay === 0) {
                        reachZero()
                    }    
                },1000) 
            }
            // MAKE BREAK TIMER RUNNING 
            else {
                let breakRunning = setInterval(() => {
                    console.log('BREAK_TIME');
                    timetoDisplay--;
                    timetoDisplay <= 60 && setLastMinute(true);
                    setTimer(secondsToMmss(timetoDisplay));    
                    setpausedTimer(timetoDisplay);
                    setSessionNumber(breakRunning);
    
                    // IF TIMER REACHES 0:00 
                    if (timetoDisplay === 0) {
                        reachZero()
                    }
    
                },1000)
            }

        }    
        // IF TIMER ALREADY RUNNING   
        else {
            setRunning(false);
            if (timeName === 'Session') {
                console.log('HERE IN THE SESSION !!!!');
                clearInterval(sessionNumber)
            }
            else if (timeName === 'Break') {
                // console.log('HERE IN THE BREAK !!!!');
                console.log('breaknumber', breakNumber);
                clearInterval(breakNumber)
                // setPause(false)
            }    
        }             
    }

    // RESET ALL COUNTERS AND VARIABLES
    const resetAll = () => {
        setRunning(false);
        clearInterval(sessionNumber);  
        setbreakLength(5);
        setSessionLength(25);
        setTimer(secondsToMmss(1500));
        setLastMinute(false);
        setSessionNumber(undefined);
        setBreakNumber(undefined);
        setpausedTimer(0);
    }

    React.useEffect(()=> {
        if (pause) {
            timeName === 'Session' ? clearInterval(sessionNumber) : clearInterval(breakNumber)                
        }
    }, [pause])


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



// pause doesn't work on second session