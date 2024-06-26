import axios from "axios"
import { useState, useEffect, useRef, useContext } from "react"
import Button from 'react-bootstrap/Button';

import Volonter from '../components/volonteri/volonter'
import Filter from '../components/filter'
import Unos from '../components/unos'
import Kontekst from "../Kontekst";
import VolonteriLista from "../components/volonteri/volonteriLista";


export default function Volonteri(){
    const [noviVolonter, dodajNovogVolontera] = useState(false);
    const [volonteri, postaviVolontere] = useState([]);
    const [filtrirani,postaviFiltrirane] = useState([]);
    const filtri = useRef(["","",""]);
    const [admin] = useContext(Kontekst);
    const [prosjek, postaviProsjek] = useState(0);
    const brojOcjena = useRef(0);
    const [render, postaviRender] = useState(false);

    useEffect(() =>{
        axios
        .get("http://localhost:3001/volonter/")
        .then(res => {
            postaviVolontere(res.data), postaviFiltrirane(res.data), filtri.current=["","",""],
            postaviProsjek((res.data.reduce((acc, obj) => {
                if(!isNaN(parseInt(obj.ocjena)))
                    {
                        brojOcjena.current++;
                        return acc + parseInt(obj.ocjena)
                    }
                else
                    return acc;
                },0)/(brojOcjena.current/2)).toFixed(2));
        })
    },[noviVolonter]);

    const odaberiVrstu = (a) =>{
        filtri.current[0] = a;
        filtriraj(filtri.current);   
    }

    function trazilica(event) {
        filtri.current[1] = event.target.value;
        filtriraj(filtri.current);
       }

    function filtriraj(filtri){
        let filterData = volonteri;
        if(filtri[0]!=""){
            filterData = filterData.filter(x => x.aktivnosti.includes(filtri[0]));
        }
        if(filtri[1]!=""){        
            filterData = filterData.filter(x => x.ime.toLowerCase().includes(filtri[1].toLowerCase()));
        }
        postaviFiltrirane(filterData);
    }
    
    return(

        <div>
            <div>
                <Unos promjena={trazilica} naziv = "tražilica" />
            </div>
            <div>
                <h1>Volonteri</h1>
                {admin == "1" && <Button variant="primary" onClick={() => {dodajNovogVolontera(true)}}>
                    Novi volonter
                </Button>}
                <Volonter show={noviVolonter} onHide = {() => dodajNovogVolontera(false)}/>
            </div>
            <div>
                <Filter akcija={odaberiVrstu} />
            </div>
            <div>
                <label>{prosjek}</label>
                <Kontekst.Provider value={[admin,filtrirani,postaviFiltrirane,render,postaviRender]}>
                <VolonteriLista volonteri={filtrirani} postavi={postaviFiltrirane}/>
                </Kontekst.Provider>
            </div>
        </div>

    );
}