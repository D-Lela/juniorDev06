import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Detalji from './detalji';
import { useState,useRef,useContext, useEffect } from 'react';
import Kontekst from '../../Kontekst';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import Volonter from './volonter';
import { toast } from 'sonner';
import StarRate from '../starRate';

export default function VolonteriLista(props) {
    const [show, setShow] = useState(false)
    const [update,setUpdate] = useState(false)
    const updateVolonter = useRef({
        ime: "",
        kontakt: "",
        grad: "",
        spol: "",
        aktivnosti: [""],
        slika: "",
        komentari: [],
        ocjena: ""
    });
    const [admin,filtrirani,postaviFiltrirane,render,postaviRender] = useContext(Kontekst)

    function obrisi(v){
        let potvrdi = window.confirm("Sigurno želite izbrisati ovog volontera?")
        if(potvrdi){
            axios.delete(`http://localhost:3001/volonter/${v.id}`)
                .then(rez => 
                {axios.get("http://localhost:3001/volonter")
                .then(rez =>{postaviFiltrirane(()=>rez.data),
                  toast.success("Volonter "+v.ime+" uspješno izbrisan.")})
                })
                };    
    }
    function updateV(v){
        updateVolonter.current = v;
        setUpdate(true);
    }

    function detailsV(v){
      updateVolonter.current = v;
      setShow(true);
    }

    function ocijeni(ocjena,id){
      axios.patch(`http://localhost:3001/volonter/${id}`,{
          ocjena: ocjena
      })
      .then(rez => 
        {axios.get("http://localhost:3001/volonter")
        .then(rez =>{postaviFiltrirane(()=>rez.data)
          })
        })
    }

    return (
    <Row xs={1} md={3} className="g-4">
      {props.volonteri.map(v => (
        <Col key={v.id}>
          <Card key={v.id} bg={"success"} >
            <Card.Body>
            <Card.Img variant="top" src={v.slika} onClick={() => detailsV(v)}/>
              <Card.Title onClick={() => detailsV(v)}>{v.ime}</Card.Title>
              <Card.Text>       
                Ovo je {v.ime}. Izuzetno voli {v.aktivnosti[0].slice(0,-1) + "u"}.
                
              </Card.Text> 
              <hr />
                <StarRate ocijeni={ocijeni} ocjena = {v.ocjena} id={v.id}/>        
                {admin=="1" && <div>
                        <Button variant='danger' value={v} onClick={() => obrisi(v)}>Briši</Button>
                        <Button variant='warning' value={v} onClick={()=>updateV(v)}>Uredi</Button>                   
                </div>}
            </Card.Body>       
          </Card>
        </Col>
      ))}
      <Detalji objekt={updateVolonter.current} show={show} onHide={() => setShow(false)}/>        
      <Volonter show={update} onHide = {() => {setUpdate(false),
      updateVolonter.current = {
        ime: "",
        kontakt: "",
        grad: "",
        spol: "",
        aktivnosti: [""],
        slika: "",
        komentari: [],
        ocjena: ""
      }}}
       vol={updateVolonter.current}/>
    </Row>
  );
}
