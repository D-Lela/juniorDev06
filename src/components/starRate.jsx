import React, { useContext } from "react"
import { FaStar } from "react-icons/fa"
import { useState } from "react";
import '../style/starRate.css'
import Kontekst from "../Kontekst";

export default function StarRating(props){
    const [rateColor, setRateColor] = useState(null);
    const [admin,filtrirani,postaviFiltrirane,render,postaviRender] = useContext(Kontekst);
    return(
        <>
            {
                [...Array(5)].map((star, index) => {
                    const currentRate = index + 1
                    return(
                        <label key={index}>
                            <input type="radio" name="rate" style={{display :"none"}}
                            value= {currentRate}  onClick={() => {props.ocijeni(currentRate,props.id), postaviRender(()=>!render)}} />
                            <FaStar 
                            className="star"
                            size ={30}
                            color={currentRate <= (rateColor || props.ocjena) ? "yellow" : "grey"}
                            onMouseEnter={() => setRateColor(currentRate)}
                            onMouseLeave={() => setRateColor(null)}
                            />
                        </label>
                    )
                })
            }
        </>
    )
}