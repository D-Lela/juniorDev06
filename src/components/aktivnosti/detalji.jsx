import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Unos from '../unos';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'

export default function Detalji(props){
    const [volonter, postaviVolontera] = useState({
        ime: "",
        prezime: ""
    });

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviVolontera({ ...volonter, [name]: value });
        console.log(volonter)
    }

    const signUp = event => {
        event.preventDefault();
        axios.patch(`http://localhost:3001/aktivnost/${props.objekt.id}`,{
            sudionici : [...props.objekt.sudionici, volonter]
        })
        .then(toast.success("Prijavljen na ",props.objekt.naziv,"!"))
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
                         {props.objekt.sudionici.map(x => <li key={x.ime}>{x.ime + " " + x.prezime}</li>)}
                    </ul>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.onHide}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}