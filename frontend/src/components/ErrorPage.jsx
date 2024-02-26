import { useRouteError } from "react-router-dom"
import { CgDanger } from "react-icons/cg"

export default function ErrorPage() {

    let error = useRouteError()

    return (
        <>
            <CgDanger style={{fontSize:'250px'}}/>
            <h1 style={{margin: '10px 0'}}>Something went wrong!</h1>
            <h2 style={{margin: '10px 0'}}>The error message is</h2>
            <h3 style={{background:'red', width:'max-content', margin:'10px auto'}}><i>&quot;{error.message}&quot;</i></h3>
        </>
    )

}