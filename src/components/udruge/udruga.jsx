import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Unos from "../unos"
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';


export default function Udruga(props) {
    const [formaPodaci, postaviPodatke] = useState({
        naziv: "",
        adresa: "",
        grad: "",
        svrha: "",
        status: "0"
    });
    const [naziv, postaviNaziv] = useState("");
    const [adresa, postaviAdresu] = useState("");
    const [grad, postaviGrad] = useState("");
    const [svrha, postaviSvrhu] = useState("");

    const options = [
        { value: 'Split', label: 'Split' },
        { value: 'Zagreb', label: 'Zagreb' },
        { value: 'Zadar', label: 'Zadar' }
      ]
    
    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
        console.log(formaPodaci);
       }
       

    const saljiPodatke = event => {
        event.preventDefault();
        axios.post("http://localhost:3001/udruga",formaPodaci)
        .then(postaviPodatke({
            naziv: "",
            adresa: "",
            grad: "",
            svrha: "",
            status: "0"
        }))
        .then(toast.success("Udruga dodana na listu"))
        .then(props.onHide)
    };

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nova udruga
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Nova</h4>
                <Unos promjena={promjenaUlaza} naziv = "naziv" />
                <Unos promjena={promjenaUlaza} naziv = "adresa" />
                <label>Grad:</label>
                <select name="grad" onChange={promjenaUlaza}>
                    {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
                <br/>
                <label htmlFor='svrha'>Svrha</label>
                <br/>
                <textarea id="svrha" name="svrha" onChange={(e) => {postaviSvrhu(e.target.value), promjenaUlaza(e)}} />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={saljiPodatke}>Dodaj</Button>
            </Modal.Footer>
        </Modal>
    );
}