import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';



export default function Detalji(props){
    const [show, setShow] = useState(false)
    return (
        <div>
            <p onClick={()=>setShow(!show)}>{props.objekt.ime}</p>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.objekt.ime}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label>{props.objekt.ime}</label>
                    <label>{props.objekt.kontakt}</label>
                    <label>{props.objekt.grad}</label>
                    <label>{props.objekt.spol}</label>
                    {props.objekt.aktivnosti.map(x => <label key={x}>{x}</label>)}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=>setShow(!show)}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}