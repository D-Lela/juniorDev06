import axios from "axios";
import { useEffect, useState,useRef } from "react";

export default  function Filter(props){
  const [vrste, postaviVrste] = useState([]);
  const odabranaVrsta = useRef("");
  
  useEffect(()=>{
    axios
        .get("http://localhost:3001/vrstaAktivnosti")
        .then(rez => postaviVrste(rez.data));
  },[]);

  function promjenaOdabira(event){
    odabranaVrsta.current = event.target.value;
    props.akcija(odabranaVrsta.current);
  }
  return(
    <div>
      <label>
        Filter:
        {vrste.map(vrsta => (
          <label key={vrsta.ime}>
            <input
              type='radio'
              name='vrsta'
              value={vrsta.ime}
              checked={odabranaVrsta.current === vrsta.ime}
              onChange={promjenaOdabira}
            />
            {vrsta.ime}
          </label>
        ))}
        <label key={"bez"}>
            <input
              type='radio'
              name='vrsta'
              value={""}
              checked={odabranaVrsta.current === ""}
              onChange={promjenaOdabira}
            />
            Bez filtera
          </label>
      </label> 
    </div>
  )
}