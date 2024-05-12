import { Link, Outlet } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState, useRef } from 'react';
import Kontekst from '../Kontekst';
import Switch from '../components/switch'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

export default function HomePage(){
    const[admin, setAdmin] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    return(
        <Container fluid> 
            <Toaster richColors/>
            <Nav fill variant="tabs" defaultActiveKey="/about">
                <Nav.Item>
                        <Link to={"/about"} onClick={() => setSelectedPage(0)}>
                            <Button variant={selectedPage === 0 ? 'success' : 'outline-success'}>Pocetna</Button>
                        </Link>
                </Nav.Item>
                
                <Nav.Item>
                        <Link to={"/aktivnosti"} onClick={() => setSelectedPage(1)}>
                            <Button variant={selectedPage === 1 ? 'success' : 'outline-success'}>Aktivnosti</Button>
                        </Link>  
                </Nav.Item>

                <Nav.Item>
                        <Link to={"/volonteri"} onClick={() => setSelectedPage(2)}>
                            <Button variant={selectedPage === 2 ? 'success' : 'outline-success' }>Volonteri</Button>
                        </Link>  
                </Nav.Item>

                <Nav.Item>
                    <Link to={"/udruge"} onClick={() => setSelectedPage(3)}>
                        <Button variant={selectedPage === 3 ? 'success' : 'outline-success'}>Udruge</Button>
                    </Link>  
                </Nav.Item>
                <Switch admin={admin} akcija={()=>setAdmin(!admin)}/>
            </Nav>
            <Kontekst.Provider value={[admin]}>     
                    <Outlet/>    
            </Kontekst.Provider>
        </Container>
    );
}