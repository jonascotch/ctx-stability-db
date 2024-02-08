
import { useLocation } from "react-router-dom";
import { FaCheckCircle,  
         FaTimesCircle,
         FaRegSnowflake,
         FaSun
        } from "react-icons/fa";
import { IconStyles } from "../../public/js/IconStyles";


export default function AddedData() {

    const { state } = useLocation()

    return (
        <>
            <table style={{width:"60%", textAlign:"center", margin:"0 auto"}}>
                <tbody style={{}}>

                    <tr>
                        <th colSpan={2}>Designação</th>
                    </tr>
                    <tr>
                        <td>Nome comercial</td>
                        <td>{state.brandName}</td>
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
                        <td>{state.reconstitutionSolvent != 'N/A'? state.reconstitutionSolvent: <FaTimesCircle style={IconStyles.red}/>}</td>
                        
                    </tr>
                    <tr>
                        <td>Volume</td>
                        <td>{state.reconstitutionVolume != 'N/A'? `${state.reconstitutionVolume} mL `: <FaTimesCircle style={IconStyles.red}/>}</td>
                    </tr>
                    <tr>
                        <td>Concentração final</td>
                        <td>{state.reconstitutionFinalConcentration != 'N/A'? `${state.reconstitutionFinalConcentration} ${state.units}/mL `: <FaTimesCircle style={IconStyles.red}/>}</td>                        
                    </tr>

                    <tr>                        
                        <th colSpan={2}>Compatibilidade</th>
                    </tr>
                    <tr>
                        <td>Soro Fisiológico</td>
                        <td>{state.saline ? <FaCheckCircle style={IconStyles.green}/> : <FaTimesCircle style={IconStyles.red}/> }</td>
                    </tr>
                    <tr>
                        <td>Soro Glucosado</td>
                        <td>{state.glucose ? <FaCheckCircle style={IconStyles.green}/> : <FaTimesCircle style={IconStyles.red}/> }</td>
                    </tr>

                    <tr>
                        <th colSpan={2}>Diluição</th>
                    </tr>
                    <tr>
                        <td>Concentração máxima em SF</td>
                        <td> {state.maxSalineDilution == 'N/A'? <FaTimesCircle style={IconStyles.red}/> : `${state.maxSalineDilution} ${state.units}/mL ` }</td>
                    </tr>
                    <tr>
                        <td>Concentração mínima em SF</td>
                        <td> {state.minSalineDilution == 'N/A'? <FaTimesCircle style={IconStyles.red}/> : `${state.minSalineDilution} ${state.units}/mL ` }</td>
                    </tr>
                    <tr>
                        <td>Concentração máxima em SG5</td>
                        <td> {state.maxGlucoseDilution == 'N/A'? <FaTimesCircle style={IconStyles.red}/> : `${state.maxGlucoseDilution} ${state.units}/mL ` }</td>
                    </tr>
                    <tr>
                        <td>Concentração mínima em SG5</td>
                        <td> {state.minGlucoseDilution == 'N/A'? <FaTimesCircle style={IconStyles.red}/> : `${state.minGlucoseDilution} ${state.units}/mL ` }</td>                        
                    </tr>

                    <tr>
                        <th colSpan={2}>Estabilidade</th>
                    </tr>
                    <tr>
                        <td colSpan={2}>Diluído</td>
                    </tr>
                    <tr>
                        <td>Solvente</td>
                        <td>{state.stabilityDilutedSolvent === 'saline' ? 'Soro Fisiológico':
                            state.stabilityDilutedSolvent === 'glucose' ? 'Soro Glucosado':
                            <FaTimesCircle style={IconStyles.red}/>
                            }</td>
                    </tr>
                    <tr>
                        <td>Volume</td>
                        <td>{state.stabilityDilutedVolume != 'N/A'? state.stabilityDilutedVolume + ' mL': <FaTimesCircle style={IconStyles.red}/>}</td>
                    </tr>
                    <tr>
                        <td>Condições</td>
                        <td>{state.stabilityDilutedCondition == 'cold' ? <FaRegSnowflake style={IconStyles.blue}/>:
                            state.stabilityDilutedCondition == 'hot' ? <FaSun style={IconStyles.gold}/>:
                            <FaTimesCircle style={IconStyles.red}/>}</td>
                    </tr>
                    <tr>
                        <td>Tempo</td>
                        <td>{state.stabilityDilutedTime == 'N/A' ?  <FaTimesCircle style={IconStyles.red}/>: state.stabilityDilutedTime}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Não Diluído</td>
                    </tr>
                    <tr>
                        <td>Condições</td>
                        <td>{state.stabilityUndilutedCondition == 'cold' ? <FaRegSnowflake style={IconStyles.blue}/>:
                            state.stabilityUndilutedCondition == 'hot' ? <FaSun style={IconStyles.gold}/>:
                            <FaTimesCircle style={IconStyles.red}/>}</td>
                    </tr>
                    <tr>
                        <td>Tempo</td>
                        <td>{state.stabilityUndilutedTime == 'N/A'? <FaTimesCircle style={IconStyles.red}/> : state.stabilityUndilutedTime}</td>
                    </tr>

                    <tr>
                        <th colSpan={2}>Imagem</th>
                    </tr>
                    <tr>
                        <td colSpan={2}>{state.image != 'N/A' ? <img src={state.image} /> : 'Não foi carregada uma imagem'}</td>
                    </tr>
                    
                </tbody>

            </table>

        </>
    )


}