import React from "react"
import { useNavigate } from "react-router-dom"

export default function LetterCard(props) {

    const letter:string = props.letter
    const navigate = useNavigate()

    function handleClickLetter(e) {  
        return navigate(`${letter}`)
    }


    return(
        <div key={letter} className="letter-card" onClick={handleClickLetter}>
            <h2>{letter}</h2>
        </div>
    )
}

