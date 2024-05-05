import { useState, useEffect } from 'react';
import axios from 'axios'

import Aktivnost from '../components/aktivnosti/aktivnost'
import ListaAktivnosti from '../components/aktivnosti/listaAktivnosti';
import Button from 'react-bootstrap/Button'
import Kontekst from '../Kontekst'



export default function Aktivnosti(){
    const [novaAktivnost,postaviNovuAktivnost] = useState(false);
    const [listaAktivnosti, postaviListuAktivnosti] = useState([]);

    useEffect(() =>{
        axios
        .get("http://localhost:3001/aktivnost/")
        .then(res => postaviListuAktivnosti(res.data))
    },[]);

    return(
        <div>
            <Kontekst.Provider value={[postaviListuAktivnosti]}>
            <h1>Aktivnosti</h1>
            <div>
            <Button variant="primary" onClick={() => postaviNovuAktivnost(true)}>
                Nova Aktivnost
            </Button>
            <Aktivnost show={novaAktivnost} onHide = {() => postaviNovuAktivnost(false)}/>
            </div>
            <div>
                <ListaAktivnosti naslov="Aktivnosti" aktivnosti={listaAktivnosti} />
            </div>
            </Kontekst.Provider>
        </div>
    );
}