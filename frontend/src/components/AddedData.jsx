
import { useLocation } from "react-router-dom";
import { FaSquareXMark } from "react-icons/fa6"
 
export default function AddedData() {

    const { state } = useLocation()    

    return (
        <>
            <table style={{width:"60%", textAlign:"center", margin:"0 auto"}}>

                <tr>
                    <th colSpan={2}>Designação</th>
                </tr>

                <tr>
                    <td>DCI</td>
                    <td>{state.dci}</td>
                </tr>
                <tr>
                    <td>Forma Farmacêutica</td>
                    <td>{state.pharmForm}</td>
                </tr>
                <tr>
                    <td>Dose / Unidades</td>
                    <td>{state.dose} / {state.units}</td>
                </tr>
                <tr>
                    <th colSpan={2}>Reconstituição</th>
                </tr>
                <tr>
                    <td >Solvente</td>
                    <td>{state.reconstitutionSolvent}</td>
                </tr>
                <tr>
                    <td>Volume</td>
                    <td>{state.reconstitutionVolume}</td>
                </tr>
                <tr>
                    <td>Concentração final</td>
                    <td>{state.reconstitutionFinalConcentration} {state.units}/mL</td>
                </tr>
                <tr>
                    <th colSpan={2}>Compatibilidade</th>
                </tr>
                <tr>
                    <td>Soro Fisiológigo</td>
                    <td>{state.saline === "on" ? '✅': <FaSquareXMark /> }</td>
                </tr>
                <tr>
                    <td>Soro Glucosado</td>
                    <td>{state.saline === "on" ? '✅': <FaSquareXMark />}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>
                <tr>
                    <td>Nome Comercial</td>
                    <td>{state.brandName}</td>
                </tr>

            </table>
        </>
    )


}