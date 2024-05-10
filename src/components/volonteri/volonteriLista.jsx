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
    const [admin,filtrirani,postaviFiltrirane] = useContext(Kontekst)

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

    return (
    <Row xs={1} md={3} className="g-4">
      {props.volonteri.map(v => (
        <Col key={v.id}>
          <Card key={v.id} >
            <Detalji key={v.id} objekt={v} show={show} onHide={() => setShow(false)}/>
            <Card.Img variant="top" src={v.slika} onClick={()=>setShow(!show)}/>
            <Card.Body >
              <Card.Title onClick={()=>setShow(!show)}>{v.ime}</Card.Title>
              <Card.Text onClick={()=>setShow(!show)}>       
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>             
                {admin=="1" && <div>
                        <Button variant='danger' value={v} onClick={() => obrisi(v)}>Briši</Button>
                        <Button variant='warning' value={v} onClick={()=>updateV(v)}>Uredi</Button>                   
                </div>}
            </Card.Body>       
          </Card>
        </Col>
      ))}
      
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
