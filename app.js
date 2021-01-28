
const App = () => {

    const style= {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        },
        lengthContainer: {
            display: 'flex',
            border: '1px solid grey'
        },
        breakContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid grey'
        },
        sessionContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid grey'
        },
        timeContainer: {
            display: 'flex',
        },
        timeLeft: {
            border: '1px solid grey'
        }
    }

    return (
            <div style={style.container}>
                <h1>25 + 5 CLOCK</h1>
                <section style={style.lengthContainer}>
                    <div id="break-label" style={style.breakContainer}>
                        <p>Break Container</p>
                        <div style={style.timeContainer}>
                            <i className="fa fa-arrow-circle-o-up" id="break-increment"></i>
                            <p id="break-length">5</p> 
                            <i className="fa fa-arrow-circle-o-down" id="break-decrement"></i>
                        </div>
                    </div>
                    <div id="session-label" style={style.sessionContainer}>
                        <p>Session Length</p>                        
                        <div style={style.timeContainer}>
                            <i className="fa fa-arrow-circle-o-up" id="session-increment"></i>
                            <p id="session-length">25</p> 
                            <i className="fa fa-arrow-circle-o-down" id="session-decrement"></i>
                        </div>
                    </div>
                </section>
                <section id="timer-label" style={style.timeLeft}>
                    <p>Session</p> 
                    <div id="time-left">25:00</div>
                    <i className="fa fa-pause" id="start_stop"></i>
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                </section>
            </div>
        )
}

ReactDOM.render(<App/>, document.getElementById('app'))