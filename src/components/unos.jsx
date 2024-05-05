function unos(props){

    return( 
        <div>          
            <label htmlFor={props.naziv}>{(props.naziv).charAt(0).toUpperCase() + (props.naziv).slice(1)}:</label>
            <input 
                type="text" 
                id={props.naziv} 
                name={props.naziv}             
                value={props.unos}
                onChange={(e) => {props.promjena(e)}}/>
        </div>       
    )
}
export default unos;