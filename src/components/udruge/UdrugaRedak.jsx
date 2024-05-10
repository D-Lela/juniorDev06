import axios from 'axios'
import Kontekst from "../../Kontekst";
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'sonner'

export default function UdrugaRedak (props){
    const [admin,udruge,postaviUdruge] = useContext(Kontekst);
    function obrisi(){
        let potvrdi = window.confirm("Sigurno želite izbrisati ovu udrugu?")
        if(potvrdi){
            axios.delete(`http://localhost:3001/udruga/${props.udruga.id}`)
                .then(rez => {
                    axios.get("http://localhost:3001/udruga")
                    .then(rez => ()=>postaviUdruge(rez.data))});
        }
    }
    function odobri(){
        axios.patch(`http://localhost:3001/udruga/${props.udruga.id}`,{status: "1"})
            .then(rez => {
                axios.get("http://localhost:3001/udruga")
                .then(rez => {()=>postaviUdruge(rez.data), toast.success("Udruga odobrena!")})
            });
        
    }
    return (
        <tr>
            <td className="cell">{props.udruga.naziv}</td>
            <td className="cell">{props.udruga.adresa}</td>
            <td className="cell">{props.udruga.grad}</td>
            {admin && <td className="cell">
            <Button variant="danger" onClick={obrisi}>
                Obrisi          
            </Button>
            {props.udruga.status!="1" && <Button variant="success" onClick={odobri}>
                Odobri          
            </Button>}
            </td>}
        </tr>
        );    
}