import Detalji from "./detalji";
import Button from 'react-bootstrap/Button';
import { useCallback, useContext, useState } from "react";
import Kontekst from "../../Kontekst";
import axios from 'axios'

export default function AktivnostRedak (props){
    const [modalShow, setModalShow] = useState(false);
    const [postaviListuAktivnosti] = useContext(Kontekst);

    function obrisi(){
        let potvrdi = window.confirm("Sigurno želite izbrisati ovaj odjevni predmet?")
        if(potvrdi){
            axios.delete(`http://localhost:3001/aktivnost/${props.aktivnost.id}`)
                .then(rez => {
                    axios.get("http://localhost:3001/aktivnost")
                    .then(rez => postaviListuAktivnosti(rez.data))});
        }
    }
    return (
        <tr>
            <td className="cell">{props.aktivnost.naziv}</td>
            <td className="cell">{props.aktivnost.lokacija}</td>
            <td className="cell">{props.aktivnost.datum}</td>
            <td className="cell">
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Detalji          
            </Button>
            <Detalji objekt={props.aktivnost} show={modalShow} onHide={() => setModalShow(false)}/>
            <Button variant="danger" onClick={obrisi}>
                Obrisi          
            </Button>
            </td>     
        </tr>
        );    
}