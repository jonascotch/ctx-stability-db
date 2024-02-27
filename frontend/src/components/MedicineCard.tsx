import React from "react"
import { useNavigate } from "react-router-dom"

export default function MedicineCard(props) {

    const name:string = props.name
    const id:string = props.id
    const navigate = useNavigate()

    function handleClick(e) {  

        return navigate(`/medicines/details/${e.target.id}`, {state: {id: e.target.id}})
    }


    return(
        <div id={id} className="medicine-card" onClick={handleClick}>
            {name}
        </div>
    )
}