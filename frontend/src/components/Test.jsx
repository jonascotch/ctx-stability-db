
import { useAuthContext } from "../context/useAuthContext"
import { FaSpinner } from "react-icons/fa"


export default function Test() {
    
    const {user, idToken} = useAuthContext()


    async function handleClick() {


        const response = await fetch("http://localhost:5000/api/v1/test/", {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Authorization': `Bearer ${idToken}`
                 },
        })

        const json = await response.json()

        console.log('Response: ', json)
    }
    
    return (
        user ?
        <button onClick={handleClick}>{user.email}</button>:
        
        <FaSpinner />
    )
}

