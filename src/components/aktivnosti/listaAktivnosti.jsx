import AktivnostRedak from "./aktivnostRedak";

export default function ListaAktivnosti(props){
    return(    
        <div>
            <h1>{props.naslov}</h1>    
            <table className="table">
                <thead>
                    <tr>
                        <th className="cell" onClick={props.sort}>Naziv</th>
                        <th className="cell" onClick={props.sort}>Lokacija</th>
                        <th className="cell" onClick={props.sort}>Datum</th>
                        <th className="cell">Detalji</th>               
                    </tr>
                </thead>
                <tbody>
                    {props.aktivnosti.map(a => (
                        <AktivnostRedak key={a.id} aktivnost={a}/> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};