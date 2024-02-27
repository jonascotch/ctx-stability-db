import {useState, useEffect} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { showAlert } from "../js/alert"
import { FaTimesCircle,
         FaCheckCircle,
         FaRegSnowflake,
         FaSun
        } from 'react-icons/fa'
import IconStyles from "../js/IconStyles"
import { useAuthContext } from "../context/useAuthContext"

export default function Details() {

    const data = useLocation()
    const navigate = useNavigate()

    const id = data.state.id

    const [medicineData, setMedicineData] = useState({})

    const {user} = useAuthContext()

    const handleEditClick = () => {
        navigate(`/medicines/details/${medicineData.id}/edit`)
    }

    const updatedAt = new Date(medicineData.updatedAt)

    let day = updatedAt.getDate()
    if (day < 10) {day='0' + day}
    let month = updatedAt.getMonth() + 1
    if (month < 10) {month=`0${month}`}
    const year = updatedAt.getFullYear()

    const date = `${year}/${month}/${day}`

    if (medicineData.notes) {
        document.getElementById('notes').innerHTML = medicineData.notes.replaceAll('\n', '<br/>')
    }

    useEffect(() => {

        async function getData() {
            try {

                const response = await fetch(`${import.meta.env.VITE_REMOTE_URL}/api/v1/medicines/details/${id}`, {
                    method:'GET'
                })

                const data = await response.json()

                if (response.ok) {

                    setMedicineData(data.data)

                } else {

                    showAlert('error', data.data)

                }

            } catch (e) {
                console.log(e.message)
            }
        }

        getData()

    }, [id])

    return (
        <div className='app-container' >
            <div className='img-container data-container' style={{backgroundImage: `url(${medicineData.image})`}}>
            {/* <img className='vial-image' src={medicineData.image} alt='vial image'/> */}
            </div>
            <div className='general-data-container data-container'>
                <h2 className='data-header'>Informação Geral</h2>
                <div>
                    <p className='data-title'>Nome Comercial</p>
                    <h3 className='data-text'>{medicineData.brandName}</h3>
                </div>
                <div>
                    <p className='data-title'>DCI</p>
                    <h3 className='data-text'>{`${medicineData.dci} ${medicineData.pharmForm} ${medicineData.dose} ${medicineData.units}`}</h3>
                </div>
                <div>
                    <p className='data-title'>Titular de AIM</p>
                    <h3 className='data-text'>{medicineData.maker}</h3>
                </div>
            </div>
            <div className='reconstitution-data-container data-container'>
                    <h2 className='data-header'>Reconstituição</h2>
                <div>
                    <p className='data-title'>Solvente</p>
                    <h3 className='data-text'>{medicineData.reconstitutionSolvent != 'N/A'? medicineData.reconstitutionSolvent: <FaTimesCircle style={IconStyles.red}/>}</h3>
                </div>
                <div>
                    <p className='data-title'>Volume</p>
                    <h3 className='data-text'>{medicineData.reconstitutionVolume != 'N/A'? `${medicineData.reconstitutionVolume} mL `: <FaTimesCircle style={IconStyles.red}/>}</h3>
                </div>
                <div>
                    <p className='data-title'>Concentração Final</p>
                    <h3 className='data-text'>{`${medicineData.reconstitutionFinalConcentration} ${medicineData.units}/mL `}</h3>
                </div>
            </div>
            
            <div className='dilution-data-container data-container'>
                <h2 className='data-header'>Diluição</h2> 
                {(medicineData.maxSalineDilution !='N/A' || medicineData.minSalineDilution != 'N/A') &&
                    <div>
                        <p className='data-title'>Cloreto de Sódio 0,9%</p>
                        <h3 className='data-text'>{`Min: ${medicineData.minSalineDilution === "N/A" ? medicineData.minSalineDilution : medicineData.minSalineDilution + ' ' + medicineData.units + '/mL'} / Max: ${medicineData.maxSalineDilution === "N/A" ? medicineData.maxSalineDilution : medicineData.maxSalineDilution + ' ' + medicineData.units + '/mL'}`}</h3>
                        
                    </div>}
                {(medicineData.maxGlucoseDilution != 'N/A' || medicineData.minGlucoseDilution != 'N/A') && 
                    <div>
                        <p className='data-title'>Glucose 5%</p>
                        <h3 className='data-text'>{`Min: ${medicineData.minGlucoseDilution === "N/A" ? medicineData.minGlucoseDilution : medicineData.minGlucoseDilution + ' ' + medicineData.units + '/mL'} / Max: ${medicineData.maxGlucoseDilution === "N/A" ? medicineData.maxGlucoseDilution : medicineData.maxGlucoseDilution + ' ' + medicineData.units + '/mL'}`}</h3>
                    </div>}
                <div>
                    <p className='data-title'>Filtro</p>
                    <h3 className='data-text'>{medicineData.filter ? <FaCheckCircle style={IconStyles.green}/> : <FaTimesCircle style={IconStyles.red}/> }</h3>
                </div>
                <div>
                    <p className='data-title'>Proteção da luz</p>
                    <h3 className='data-text'>{medicineData.lightprotection ? <FaCheckCircle style={IconStyles.green}/> : <FaTimesCircle style={IconStyles.red}/> }</h3>
                </div>
            </div>

            <div className='stability-data-container data-container'>
                <h2 className='data-header'>Estabilidade</h2>
                
                {(medicineData.stabilityDilutedSolvent === 'saline' || medicineData.stabilityDilutedSolvent  === 'glucose') &&
                    <div>
                        <p className='data-title'>Diluído</p>
                        <h3 className='data-text'>
                            { medicineData.stabilityDilutedSolvent  === 'glucose' ? 'Glucose 5%' : 'Cloreto de Sódio 0,9%' } - { medicineData.stabilityDilutedVolume } mL
                        </h3>
                        <div className='details-stability-div'>
                            <div>{
                                medicineData.stabilityDilutedCondition == 'cold' ?
                                <FaRegSnowflake style={IconStyles.blue}/> :
                                medicineData.stabilityDilutedCondition == 'hot' ?
                                <FaSun style={IconStyles.gold}/> :
                                <FaTimesCircle style={IconStyles.red}/>
                            }
                            </div>
                            <h3 className="data-text">
                                {medicineData.stabilityDilutedTime === 'N/A' ?
                                '': '  ' +
                                medicineData.stabilityDilutedTime}
                            </h3>
                        </div>
                        
                    </div>}
                {(medicineData.stabilityUndilutedTime != 'N/A') && 
                    <div>
                        <p className='data-title'>Não Diluído</p>
                        <div className='details-stability-div'>
                            <div>{
                                medicineData.stabilityUndilutedCondition == 'cold' ?
                                <FaRegSnowflake style={IconStyles.blue}/> :
                                medicineData.stabilityUndilutedCondition == 'hot' ?
                                <FaSun style={IconStyles.gold}/> :
                                <FaTimesCircle style={IconStyles.red}/>
                            }
                            </div>
                            <h3 className="data-text">
                                {medicineData.stabilityUndilutedTime === 'N/A' ?
                                '': '  ' +
                                medicineData.stabilityUndilutedTime}
                            </h3>
                        </div>
                    </div>}
            </div>

            <div className='compatibility-data-container data-container'>
                <h2 className='data-header'>Compatibilidade</h2>
                <div>
                    <p className='data-title'>Cloreto de sódio 0,9%</p>
                    <h3 className='data-text'>{medicineData.saline ? <FaCheckCircle style={IconStyles.green}/> : <FaTimesCircle style={IconStyles.red}/> }</h3>
                </div>
                <div>
                    <p className='data-title'>Glucose 5%</p>
                    <h3 className='data-text'>{medicineData.glucose ? <FaCheckCircle style={IconStyles.green}/> : <FaTimesCircle style={IconStyles.red}/> }</h3>

                </div>
            </div>
            <div className='notes-data-container'>
                <h2 className='data-header'>Outras informações</h2>
                <div>
                    <h3 className='data-text' id="notes"></h3>
                </div>
            </div>
            {
                user ?
                <button className="edit-btn" onClick={handleEditClick}>Edit Data</button>:
                null
            }
            <div className="updatedat-div"><p>Atualizado em {date}</p></div>
        </div>

    )
}