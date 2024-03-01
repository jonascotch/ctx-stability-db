import React from "react"
import { useNavigate } from "react-router-dom"

export default function MedicineCard(props) {

    const name:string = props.name
    const id:string = props.id
    const navigate = useNavigate()

    function handleClick() {

        return navigate(`/medicines/details/${id}`, {state: {id: id}})
    }


    return(
        <div id={id} className="medicine-card" onClick={handleClick}>
            <h3>{name}</h3>
        </div>
    )
}