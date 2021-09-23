function Length(props) {

    return (<>
        <h3>{props.titulo}</h3>
        <div className="time-sets">
            <button 
            className="btn-small deep-purple lighten-2"
            onClick={()=>props.cambioTiempo(-60, props.tipo)}
            >
                <i className="material-icons">arrow_downward</i>
            </button>
            <h3>{props.formatTime}</h3>
            <button 
            className="btn-small deep-purple lighten-2"
            onClick={()=>props.cambioTiempo(60, props.tipo)}
            >
                <i className="material-icons">arrow_upward</i>
            </button>
        </div>

    </>)
}

export default Length
