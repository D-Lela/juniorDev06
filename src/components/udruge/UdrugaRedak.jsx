import axios from 'axios'
import Kontekst from "../../Kontekst";
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

export default function UdrugaRedak (props){
    const [postaviUdruge] = useContext(Kontekst);
    function obrisi(){
        let potvrdi = window.confirm("Sigurno želite izbrisati ovu udrugu?")
        if(potvrdi){
            axios.delete(`http://localhost:3001/udruga/${props.udruga.id}`)
                .then(rez => {
                    axios.get("http://localhost:3001/udruga")
                    .then(rez => postaviUdruge(rez.data))});
        }
    }
    return (
        <tr>
            <td className="cell">{props.udruga.naziv}</td>
            <td className="cell">{props.udruga.adresa}</td>
            <td className="cell">{props.udruga.grad}</td>
            <td className="cell">
            <Button variant="danger" onClick={obrisi}>
                Obrisi          
            </Button>
            </td>
        </tr>
        );    
}