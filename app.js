
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
        }
    }

    return (
            <div style={style.container}>
                <h1>25 + 5 CLOCK</h1>
                <section style={style.lengthContainer}>
                    <div id="break-label" style={style.breakContainer}>
                        <p>Break Container</p>
                        <div style={style.timeContainer}>
                            <i class="fa fa-arrow-circle-o-up"></i>
                            <p id="break-length">5</p> 
                            <i class="fa fa-arrow-circle-o-down"></i>
                        </div>
                    </div>
                    <div id="session-label" style={style.sessionContainer}>
                        <p>Session Length</p>                        
                        <div style={style.timeContainer}>
                            <i class="fa fa-arrow-circle-o-up"></i>
                            <p id="session-length">25</p> 
                            <i class="fa fa-arrow-circle-o-down"></i>
                        </div>
                    </div>
                </section>
            </div>
        )
}

ReactDOM.render(<App/>, document.getElementById('app'))