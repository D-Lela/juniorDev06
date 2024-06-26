import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Unos from '../unos';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'
import Kontekst from '../../Kontekst';

export default function Detalji(props){
    const [volonter, postaviVolontera] = useState({
        ime: "",
        prezime: ""
    });
    const [admin,postaviListuAktivnosti] = useContext(Kontekst)

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviVolontera({ ...volonter, [name]: value });
    }

    const signUp = event => {
        event.preventDefault();
        axios.patch(`http://localhost:3001/aktivnost/${props.objekt.id}`,{
            sudionici : [...props.objekt.sudionici, volonter]
        })
        .then(res => 
            axios.get("http://localhost:3001/aktivnost")
            .then(res => postaviListuAktivnosti(res.data))
        )
        .then(toast.success("Prijavljen na "+ props.objekt.naziv +"!"))
        .then(props.onHide)
    };

    const obrisi = event =>{
        event.preventDefault();
         axios.patch(`http://localhost:3001/aktivnost/${props.objekt.id}`,{
             sudionici : props.objekt.sudionici.filter(x => x.ime + " " +  x.prezime != event.target.value
            )
         })
         .then(res => 
             axios.get("http://localhost:3001/aktivnost")
             .then(res => postaviListuAktivnosti(res.data))
         )
         .then(toast.success("Korisnik " +event.target.value +" uspješno odjavljen!"))
         .then(props.onHide)
    };

    return (
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.objekt.naziv}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label>{props.objekt.naziv}</label>
                    <label>{props.objekt.datum}</label>
                    <label>{props.objekt.lokacija}</label>
                    <label>{props.objekt.grupa}</label>
                    <label>{props.objekt.opis}</label>
                    <hr />
                    <Unos promjena={promjenaUlaza} naziv = "ime" />
                    <Unos promjena={promjenaUlaza} naziv = "prezime" />
                     <Button onClick={signUp}>Prijava</Button>
                    <hr/>
                    <ul>
                         {props.objekt.sudionici.map(x => <li key={x.ime}>{x.ime + " " + x.prezime}
                         {admin =="1" && <Button onClick={obrisi} value={x.ime + " " + x.prezime}>Obrisi</Button>}</li>)}
                    </ul>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.onHide}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}