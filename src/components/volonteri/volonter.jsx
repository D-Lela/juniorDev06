import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Unos from "../unos"
import { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Kontekst from '../../Kontekst';


export default function Volonter(props) {
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        kontakt: "",
        grad: "",
        spol: "",
        aktivnosti: [""],
        slika: "",
        komentari: [],
        ocjena: ""
    });
    const aktTemp = useRef([]);
    const pfpBroj = useRef(0);
    const update = useRef(false);
    const [admin,filtrirani,postaviFiltrirane] = useContext(Kontekst)

    useEffect(()=>{    
        if(props.vol!=null){
        postaviPodatke(props.vol),
         aktTemp.current = formaPodaci.aktivnosti
         update.current = true;
        }},[props.vol])

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

    const randomBroj = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };


    const saljiPodatke = event => {
        event.preventDefault();
        aktTemp.current = [];
        if(update.current){
            axios.put(`http://localhost:3001/volonter/${props.vol.id}`,formaPodaci)
            .then(res => axios
                .get("http://localhost:3001/volonter/")
                .then(res => {postaviFiltrirane(res.data)})
            )
            .then(postaviPodatke({
                ime: "",
                kontakt: "",
                grad: "",
                aktivnosti: [],
                slika: ""
            }))
            .then(toast.success("Volonterovi podaci promijenjeni."))
            .then(props.onHide)
        }
        else{
            axios.post("http://localhost:3001/volonter",formaPodaci)
            .then(postaviPodatke({
                ime: "",
                kontakt: "",
                grad: "",
                aktivnosti: [],
                slika: ""
            }))
            .then(toast.success("Volonter dodan."))
            .then(props.onHide)
        }
    };



    const spremiSliku = () =>{
        pfpBroj.current = randomBroj(0,79);
        postaviPodatke({...formaPodaci, slika:`https://xsgames.co/randomusers/assets/avatars/${formaPodaci.spol}/${pfpBroj.current}.jpg`})
    }

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
                <Unos promjena={promjenaUlaza} naziv = "ime" unos={formaPodaci.ime}/>
                <Unos promjena={promjenaUlaza} naziv = "kontakt" unos={formaPodaci.kontakt}/>
                <label>Grad:</label>
                <select name="grad" onChange={promjenaUlaza}>
                    {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
                <br/>
                <label htmlFor='aktivnosti'>Aktivnosti</label>
                <br/>
                <div id="aktivnosti">
                    {options2.map(o => <label key={o.value}><input type="checkbox" name="o.label" checked={formaPodaci.aktivnosti.includes(o.value)} value={o.value} onChange={odabirAktivnosti}/>{o.label}</label> )}
                </div>
                <div id="spol">
                    <label>
                    <input type="radio" name="spol" value="male" checked={formaPodaci.spol === "male"} onChange={() =>postaviPodatke({...formaPodaci, spol: "male",slika:"https://xsgames.co/randomusers/assets/avatars/male/0.jpg"})}/>
                        Muško
                    </label>
                    <label>
                        <input type="radio" name="spol" value="female" checked={formaPodaci.spol === "female"} onChange={() =>postaviPodatke({...formaPodaci, spol: "female",slika:"https://xsgames.co/randomusers/assets/avatars/female/0.jpg"})}/>
                        Žensko
                    </label>
                </div>
                {formaPodaci.spol != "" && <div>
                    <h3>Odaberi profilnu sliku</h3>
                    <img src={formaPodaci.slika}/>
                    <Button onClick={spremiSliku}>Promijeni</Button>            
                    </div>}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={saljiPodatke}>Spremi</Button>
            </Modal.Footer>
        </Modal>
    );
}