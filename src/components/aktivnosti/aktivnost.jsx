import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Unos from "../unos"
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';


export default function Aktivnost(props) {
    const [formaPodaci, postaviPodatke] = useState({
        naziv: "",
        datum: "",
        lokacija: "",
        udruga: "NE",
        opis: "",
        sudionici: []
    });
    const [udruge, postaviUdruge] = useState([]);

    useEffect (() => {
        axios
        .get("http://localhost:3001/udruga/")
        .then(res => {
            postaviUdruge(res.data); 
        })
    },[]);


    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
       }
    


    const saljiPodatke = event => {
        event.preventDefault();
        axios.post("http://localhost:3001/aktivnost",formaPodaci)
        .then(toast.success("Aktivnost dodana."))
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
                    Nova aktivnost
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Nova</h4>
                <Unos promjena={promjenaUlaza} naziv = "naziv" />
                <Unos promjena={promjenaUlaza} naziv = "datum" />
                <Unos promjena={promjenaUlaza} naziv = "lokacija" />
                <br/>
                <div id="udruga">
                    <label>
                    <input type="radio" name="udruga" value="DA" checked={formaPodaci.udruga != "NE"} onChange={() => postaviPodatke({...formaPodaci, udruga: "DA"}) }/>
                        DA
                    </label>
                    <label>
                        <input type="radio" name="udruga" value="NE" checked={formaPodaci.udruga === "NE"} onChange={() => postaviPodatke({...formaPodaci, udruga: "NE"}) }/>
                        NE
                    </label>
                </div>
                <br/>
                {formaPodaci.udruga !="NE" && <select 
                    name='udruga'
                    value={formaPodaci.udruga}
                    onChange={promjenaUlaza}
                    required
                    >
                    <option value="">Udruga</option>
                        {udruge.map(u => (
                        <option key={u.id} value={u.naziv}>
                            {u.naziv}
                    </option>
                    ))}
                </select>
                }
                <label htmlFor='opis'>Opis</label>
                <br/>
                <textarea id="opis" name="opis" onChange={(e) => { promjenaUlaza(e)}} />       
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={saljiPodatke}>Dodaj</Button>
            </Modal.Footer>
        </Modal>
    );
}