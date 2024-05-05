import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';

import Udruga from "../components/udruge/udruga";
import ListaUdruga from "../components/udruge/ListaUdruga"
import Kontekst from "../Kontekst";




export default function Udruge(){
    const [udruge, postaviUdruge] = useState([]);
    const [aktivneUdruge, postaviAktivneUdruge] = useState([]);
    const [neAktivneUdruge, postaviNeAktivneUdruge] = useState([]);
    const [novaUdruga,postaviNovuUdrugu] = useState(false);


    const sortirajAktivne = (a) => {
        postaviAktivneUdruge(x => [...x].sort((s,t) =>s[a.target.innerHTML.toLowerCase()].localeCompare(t[a.target.innerHTML.toLowerCase()])));
    };

    const sortirajNeAktivne = (a) => {
        postaviNeAktivneUdruge(x => [...x].sort((s,t) =>s[a.target.innerHTML.toLowerCase()].localeCompare(t[a.target.innerHTML.toLowerCase()])));
    };
    

    useEffect(() =>{
        axios
        .get("http://localhost:3001/udruga/")
        .then(res => {
            postaviUdruge(res.data);
            let aktivne = res.data.filter(x => x.status == "1");
            postaviAktivneUdruge(aktivne);
            let neAktivne = res.data.filter(x => x.status != "1");
            postaviNeAktivneUdruge(neAktivne);
        })
    },[novaUdruga]);

    return(
        <div>
            <div>
            <Button variant="primary" onClick={() => postaviNovuUdrugu(true)}>
                Nova udruga
            </Button>
            <Udruga show={novaUdruga} onHide = {() => postaviNovuUdrugu(false)}/>
            </div>
            <Kontekst.Provider value={[postaviUdruge]}>
            <div>         
                <ListaUdruga naslov="Aktivne udruge" udruge={aktivneUdruge} sort={sortirajAktivne} />
            </div>
            <div>  
                <ListaUdruga naslov="Neaktivne udruge" udruge={neAktivneUdruge} sort={sortirajNeAktivne} />
            </div>
            </Kontekst.Provider>
        </div>
    );
}