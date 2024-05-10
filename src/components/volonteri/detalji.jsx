import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function Detalji(props){
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
                    <label>{props.objekt.ime}</label>
                    <label>{props.objekt.kontakt}</label>
                    <label>{props.objekt.grad}</label>
                    <label>{props.objekt.spol}</label>
                    {props.objekt.aktivnosti.map(x => <label key={x}>{x}</label>)}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.onHide}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}