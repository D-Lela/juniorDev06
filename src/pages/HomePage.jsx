import { Link, Outlet } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import Kontekst from '../Kontekst';
import Switch from '../components/switch'

export default function HomePage(){
    const[admin, setAdmin] = useState(false);
    return(
        <div>
            <Toaster richColors/>
            <div>
                <h1>HomePage</h1>
                <Link to={"/about"} >
                    Pocetna
                </Link>
                <Link to={"/aktivnosti"} >
                    Aktivnosti
                </Link>  
                <Link to={"/volonteri"} >
                    Volonteri
                </Link>  
                <Link to={"/udruge"} >
                    Udruge
                </Link>  
                <Switch admin={admin} akcija={()=>setAdmin(!admin)}/>
            </div>
            <Kontekst.Provider value={[admin]}>
                <Outlet/>
            </Kontekst.Provider>
        </div>
    );
}