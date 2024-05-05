export default function UdrugaRedak (props){
    return (
        <tr>
            <td className="cell">{props.udruga.naziv}</td>
            <td className="cell">{props.udruga.adresa}</td>
            <td className="cell">{props.udruga.grad}</td>
        </tr>
        );    
}