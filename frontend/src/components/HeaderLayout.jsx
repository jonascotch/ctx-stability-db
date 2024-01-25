import { Outlet, NavLink, Link } from "react-router-dom"

export default function LayoutHeader() {

    const selected = {
        color:'#222222',
        backgroundColor: '#f4f4f9'
    }

    return (
        <>
            <div className="header-container">
                <Link to='/' className="header-link">
                    Características de Citotóxicos
                </Link>
                <nav className="header-link-container">
                    <NavLink to='drugs' className="header-link" style={ ({isActive}) => isActive ? selected : null }>
                        Lista
                    </NavLink>
                    <NavLink to='form' className="header-link" style={ ({isActive}) => isActive ? selected : null }>
                        Form
                    </NavLink>

                </nav>
            </div>
            <Outlet />
        </>
    )

}