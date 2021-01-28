
const App = () => {

    const style= {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }
    }

    return (
            <div style={style.container}>
            <h1>25 + 5 CLOCK</h1>
            </div>
        )
}

ReactDOM.render(<App/>, document.getElementById('app'))