import { Outlet, NavLink, Link } from "react-router-dom"

export default function LayoutHeader() {

    const selected = {
        color:'#222222',
        backgroundColor: '#658e9c'
    }

    return (
        <>
            <div className="header-container">
                <Link to='/' className="header-title">
                    Características de Citotóxicos
                </Link>
                <nav className="header-link-container">
                    <NavLink to='medicines' className="header-link" style={ ({isActive}) => isActive ? selected : null }>
                        Lista
                    </NavLink>
                    <NavLink to='form' className="header-link" style={ ({isActive}) => isActive ? selected : null }>
                        Form
                    </NavLink>

                </nav>
            </div>
            <div className="outlet-container">
                <Outlet />
            </div>
        </>
    )

}