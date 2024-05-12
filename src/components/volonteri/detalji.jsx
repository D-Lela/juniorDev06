import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Kontekst from '../../Kontekst';
import { useState, useContext } from 'react';
import { toast } from 'sonner'



export default function Detalji(props){
    const [komentar, postaviKomentar] = useState("");
    const [admin,filtrirani,postaviFiltrirane] = useContext(Kontekst)
       
    const saljiPodatke = event => {
        let timeStamp = new Date().toLocaleString();
        event.preventDefault();
        axios.patch(`http://localhost:3001/volonter/${props.objekt.id}`,{
            komentari : [...props.objekt.komentari, {komentar: komentar,vrijeme:  timeStamp}]
        })
        .then(res => axios
            .get("http://localhost:3001/volonter/")
            .then(res => {postaviFiltrirane(res.data)})
        )
        .then(toast.success("Komentar objavljen."))
        .then(props.onHide)
    };

    function obrisiKomentar(v){
        let potvrdi = window.confirm("Sigurno želite izbrisati ovaj komentar?")
        if(potvrdi){
            axios.patch(`http://localhost:3001/volonter/${props.objekt.id}`,{
                komentari : props.objekt.komentari.filter(x => (x != v))
            })
                .then(rez => 
                {axios.get("http://localhost:3001/volonter")
                .then(rez =>{postaviFiltrirane(()=>rez.data),
                  toast.success("Komentar uspješno izbrisan.")})
                })
                .then(toast.success("Komentar obrisan."))
                .then(props.onHide)
            };    
    }

    return (
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.objekt.ime}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img src={props.objekt.slika}/>
                    <ul>
                        <li><label>{props.objekt.ime}</label></li>
                        <li><label>{props.objekt.kontakt}</label></li>
                        <li><label>{props.objekt.grad}</label></li>
                        <li><label>{props.objekt.spol}</label></li>
                    </ul>
                    {props.objekt.aktivnosti.map(x => <label key={x}>{x}</label>)}
                    <hr />
                    <label>Komentari</label>
                    {props.objekt.komentari.map(x=> 
                    <div key={x.vrijeme}>
                        <label>{x.vrijeme}
                        </label>
                        <p>{x.komentar}
                        </p>
                        {admin =="1" && <Button onClick={()=> obrisiKomentar(x)}>Obrisi</Button>}
                        <hr />
                    </div>)}
                    <label htmlFor='komentar'>Ostavite komentar:</label>
                    <br />
                    <textarea id="komentar" name="komentar" onChange={(e) => {postaviKomentar(e.target.value)}} />
                    <br />
                    <button onClick={saljiPodatke}>Komentiraj</button>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.onHide}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}