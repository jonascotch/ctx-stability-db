import React from "react"
import { useNavigate } from "react-router-dom"

export default function LetterCard(props) {

    const letter:string = props.letter
    const navigate = useNavigate()

    function handleClick(e) {  
        console.log(e.target.key)

        return navigate(`${letter}`)
    }


    return(
        <div key={letter} className="letter-card" onClick={handleClick}>
            {letter}
        </div>
    )
}

