import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Unos from "../unos"
import { useState, useRef } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';


export default function Volonter(props) {
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        kontakt: "",
        grad: "",
        spol: "",
        aktivnosti: [""]
    });
    const aktTemp = useRef([]);

    const options = [
        { value: 'Split', label: 'Split' },
        { value: 'Zagreb', label: 'Zagreb' },
        { value: 'Zadar', label: 'Zadar' }
      ]

    const options2 = [
        { value: 'Ekologija', label: 'Ekologija' },
        { value: 'Edukacija', label: 'Edukacija' },
        { value: 'Prijevoz', label: 'Prijevoz' },
        { value: 'Razno', label: 'Razno' },
      ]
    
    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
       }
    
    const odabirAktivnosti = (e) => {
        if(e.target.checked){
            aktTemp.current = [...aktTemp.current,e.target.value];
            postaviPodatke({...formaPodaci, aktivnosti: aktTemp.current});
        }
        else{
            aktTemp.current.splice(aktTemp.current.indexOf(e.target.value),1);
            postaviPodatke({...formaPodaci, aktivnosti: aktTemp.current});
        }
    }


    const saljiPodatke = event => {
        event.preventDefault();
        aktTemp.current = [];
        axios.post("http://localhost:3001/volonter",formaPodaci)
        .then(postaviPodatke({
            ime: "",
            kontakt: "",
            grad: "",
            aktivnosti: []
        }))
        .then(toast.success("Volonter dodan."))
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
                    Novi volonter
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Nova</h4>
                <Unos promjena={promjenaUlaza} naziv = "ime" />
                <Unos promjena={promjenaUlaza} naziv = "kontakt" />
                <label>Grad:</label>
                <select name="grad" onChange={promjenaUlaza}>
                    {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
                <br/>
                <label htmlFor='aktivnosti'>Aktivnosti</label>
                <br/>
                <div id="aktivnosti">
                    {options2.map(o => <label key={o.value}><input type="checkbox" name="o.label" value={o.value} onChange={odabirAktivnosti}/>{o.label}</label> )}
                </div>
                <div id="spol">
                    <label>
                    <input type="radio" name="spol" value="male" checked={formaPodaci.spol === "male"} onChange={() =>postaviPodatke({...formaPodaci, spol: "male"})}/>
                        Muško
                    </label>
                    <label>
                        <input type="radio" name="spol" value="female" checked={formaPodaci.spol === "female"} onChange={() =>postaviPodatke({...formaPodaci, spol: "female"})}/>
                        Žensko
                    </label>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={saljiPodatke}>Dodaj</Button>
            </Modal.Footer>
        </Modal>
    );
}