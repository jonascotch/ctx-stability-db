import { useState } from "react"
// import auth from "../../firebase.js"
// import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { showAlert } from "../js/alert"
import { useAuthContext } from "../context/useAuthContext"

export default function Login() {

    const [values, setValues] = useState({email:"", password:""})

    const {loginUser, setLoading} = useAuthContext()

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setValues(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const handleSubmit = () => {

        const {email, password} = values

        // USING AUTHPROVIDER
        loginUser(email, password).then(
            () => {                
                showAlert('success', 'Login concluído com sucesso')
                navigate('/')
            }
        ).catch(
            error => {
                setLoading(false)
                showAlert('error' , error.message)
                navigate('/login')
            }

        )

        // BEFORE AUTHPROVIDER
        // signInWithEmailAndPassword(auth, email, password)
        //     .then(userCredential => {
        //         const user = userCredential.user
        //         console.log(user)
        //         navigate('/')
        //         showAlert('success', 'Feito o login com sucesso')
        //     })
        //     .catch(error => {
        //         navigate('/login')
        //         showAlert('error' , error.message)
        //     })

    }

    return (

        <div className="login-container">
            <label htmlFor="login-email">Your email</label>
            <input 
                type="email" 
                id="login-email"
                name="email"
                value={values.email}
                onChange={handleOnChange}
            ></input>
            <label htmlFor="login-password">Your password</label>
            <input 
                type="password" 
                id="login-password"
                name="password"
                value={values.password}
                onChange={handleOnChange}
            ></input>
            <button onClick={handleSubmit} className="submit-btn">Login</button>            
        </div>
    )
}