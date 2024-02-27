import React from "react"
import { useParams } from "react-router-dom"
import { showAlert } from "../js/alert"
import MedicineCard from "./MedicineCard"

export default function ListByLetter() {

    const [medicines, setMedicines] = React.useState([])

    const params = useParams()

    React.useEffect(() => {

        async function getMedicines() {

            try {
                const response = await fetch(`${import.meta.env.VITE_REMOTE_URL}/api/v1/medicines/${params.letter}`)
    
                const data = await response.json()

                if (data) {
                    const sorted = data.data.sort((a, b) => (a.brandName < b.brandName) ? 1 : (a.brandName > b.brandName) ? -1 : 0 )
                    setMedicines(sorted)
                } else {
                    showAlert('error', data.data)
                }

            } catch (e) {
                throw new Error ('something went very wrong!')
            }
        }

        getMedicines()

    }, [params.letter])

    return (
        <div className="medicine-card-container">
            {
                medicines.map(medicine => {
                    const nameString = `${medicine.dci} ${ medicine.pharmForm } ${medicine.dose} ${medicine.units} - ${medicine.brandName}`

                    return (
                        
                        <MedicineCard name={nameString} id={medicine.id} key={medicine.id}/>

                    )


                })
            }
        </div>
    )
}