import { Link, Outlet } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

export default function HomePage(){
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
            </div>
            <Outlet />
        </div>
    );
}