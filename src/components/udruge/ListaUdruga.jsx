import UdrugaRedak from "./UdrugaRedak";

export default function ListaUdruga(props){


    return(    
        <div>
            <h1>{props.naslov}</h1>    
            <table>
                
                <thead>
                    <tr>
                        <th className="cell" onClick={props.sort}>Naziv</th>
                        <th className="cell" onClick={props.sort}>Adresa</th>
                        <th className="cell" onClick={props.sort}>Grad</th>               
                    </tr>
                </thead>
                <tbody>
                    {props.udruge.map(u => (
                        <UdrugaRedak key={u.id} udruga={u} />   
                    ))}
                </tbody>
            </table>
        </div>
    );
};