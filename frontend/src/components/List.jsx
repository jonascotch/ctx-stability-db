import LetterCard from "./LetterCard.tsx"

// import { getMedicines } from "../../public/js/getMedicines"

import React from "react"

export default function List() {

    const [letters, setLetters] = React.useState([])

    React.useEffect(
        () => {
        // working with promises, added a setTimeout for dramatic effect :)
        //     setTimeout(() => 
        //         fetch("http://localhost:5000/api/v1/medicines", {
        //                 method: 'GET',
        //                 headers: {
        //                     'Accept': 'application/json',
        //                 },
        //             })
        //         .then(response => response.json())
        //         .then(data => setLetters(data.data))
            
        //     , 2000)

        // }

        // tried with async/await
        async function getData() {
            try {
                const response = await fetch("http://localhost:5000/api/v1/medicines", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                })
    
                const data = await response.json()

                const values = data.data
    
                if (response.ok){
                    setLetters(values)
                    
                } else {
                    throw new Error('something went wrong!')
                }
    
            } catch (e) {
                console.log(e.message)
            }

        }
        getData()

        }
        , []
    )

    const firstLetters = letters.map(letter => letter.firstLetter)
    const htmlLetters = Array.from(new Set(firstLetters)).sort()
    console.log(firstLetters, htmlLetters, Date.now())

    return (       

        <div className="lettercard-container">
            {htmlLetters.length > 0
            ? htmlLetters.map(letter => {
                return (
                    <div key={letter}>
                        <LetterCard letter={letter.toUpperCase()} />
                    </div>
                )
            })
            : <h1>Loading...</h1>
            }
        </div>
    )



    
}