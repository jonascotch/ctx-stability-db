import { Outlet, NavLink, Link } from "react-router-dom"
import logo from '../assets/images/logo.jpg'
import { useAuthContext } from "../context/useAuthContext"
import { showAlert } from '../js/alert'
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
// import auth from "../../firebase"
// import { signOut } from "firebase/auth"


export default function LayoutHeader() {

    const selected = {
        color:'#222222',
        backgroundColor: '#658e9c'
    }

    const {user, logOut} = useAuthContext()

    const navigate = useNavigate()

    function makeLogOut () { 
    
        // USING AUTHPROVIDER
        logOut()
            .then(() => {
                showAlert('success', 'Logout com sucesso')
                navigate('/')
            })
            .catch(error => {
                showAlert('error', error.message)
            })
    
        //USING FIREBASE AUTH
        // signOut(auth)
        //     .then(() => {
        //         navigate('/')
        //         showAlert('success', 'Logout com sucesso')
        //         console.log(user)
        //     })
        //     .catch(error => {
        //         showAlert('error', error.message)
        //     })
    
    }
    
    
    return (         
        <>
        
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="logo" style={{width:'50px', borderRadius:'50%'}}/>
                    <Link to='/' className="header-title">
                        Características de Citotóxicos
                    </Link>                
                </div>
                <nav className="header-link-container">
                    <NavLink to='medicines/list' className="header-link" style={ ({isActive}) => isActive ? selected : null }>
                        Lista
                    </NavLink>
                    { 
                    user ?
                    <>
                        <NavLink to='form' className="header-link" style={ ({isActive}) => isActive ? selected : null }>
                            Form
                        </NavLink>
                        <a onClick={makeLogOut} className="header-link" >
                            Log Out
                        </a>
                    </> :
                    <>

                    </>
                    }
                </nav>
            </div>
            <div className="outlet-container">
                <Outlet />
            </div>
                <Footer />
        </>
)
}