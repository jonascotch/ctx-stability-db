import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../js/alert";
import { useAuthContext } from "../context/useAuthContext"

export default function Form() {

    const [formData, setFormData] = useState({
            brandName:'',
            dci:'',
            maker:'',
            pharmForm:'',
            dose: '',
            units: '',
            reconstitutionSolvent: '',
            reconstitutionVolume: '',
            reconstitutionFinalConcentration: '',
            saline: false,
            glucose: false,
            filter: false,
            lightprotection: false,
            minSalineDilution: '',
            maxSalineDilution: '',
            minGlucoseDilution: '',
            maxGlucoseDilution: '',
            stabilityDilutedSolvent: 'default',
            stabilityDilutedVolume: '',
            stabilityDilutedCondition: 'default',
            stabilityDilutedTime: '',
            stabilityUndilutedCondition: 'default', 
            stabilityUndilutedTime: '',
            notes:''
    })

    const { user, idToken } = useAuthContext()

    const units = formData.units ? `${formData.units} / mL` : null

    const form = document.getElementById('form')
    const submitter = document.getElementById('submit-btn')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataToSubmit = new FormData(form, submitter)
        
        try {
            const response = await fetch("http://localhost:5000/api/v1/medicines/", {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Authorization': `Bearer ${idToken}`
                 },
                 body: dataToSubmit
            })
            const data = await response.json()
            if (response.ok) {
                navigate('/confirmAdd', {state: data.data})
                showAlert('success', 'Dados inseridos com sucesso')
            } else {
                showAlert('error', data.data)

            }

        } catch(e) {
            console.log(e.message)
        }
        
    }

    const handleChange = (e) => {
        const {value, name} = e.target
        setFormData((prev) => ({ ...prev, [name]: value}))
    }

    if (!user) {
        throw new Error('You cannot access this page. Please login.')
    }

    return (

        <form id="form" onSubmit={handleSubmit} method='POST' encType='multipart/form-data'>
            
            <fieldset>
                <legend>Designação</legend>

                <label htmlFor="brandName">Nome Comercial</label>
                <input
                    className="form-input" 
                    type="text"
                    id="brandName" 
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    required
                />                  

                <label htmlFor="dci">DCI</label>
                <input
                    className="form-input" 
                    type="text"
                    id="dci" 
                    name="dci" 
                    value={formData.dci}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="maker">Titular de AIM</label>
                <input
                    className="form-input" 
                    type="text"
                    id="maker" 
                    name="maker" 
                    value={formData.maker}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="pharmForm">Forma Farmacêutica</label>
                <input
                    className="form-input" 
                    type="text"
                    id="pharmForm" 
                    name="pharmForm" 
                    value={formData.pharmForm}
                    onChange={handleChange}
                    required
                    />

                <label htmlFor="dose">Dose</label>
                <input
                    className="form-input" 
                    type="number"
                    id="dose" 
                    name="dose" 
                    value={formData.dose}
                    onChange={handleChange}
                    required
                />

                <div>
                    <h4>Unidades</h4>
                    <label htmlFor="mg-radio">mg
                    <input 
                        id="mg-radio" 
                        type="radio" 
                        name="units" 
                        value="mg"
                        checked={formData.units === "mg"}
                        onChange={handleChange}
                    />
                    </label>

                    <label htmlFor="U-radio">UI
                    <input 
                        id="U-radio" 
                        type="radio" 
                        name="units" 
                        value="UI"
                        checked={formData.units === "UI"}
                        onChange={handleChange}                     
                    />
                    </label>                        
                </div>

            </fieldset>

            <fieldset>
                <legend>Reconstituição</legend>
                <label htmlFor="reconstitutionSolvent">Solvente</label>
                <input
                    className="form-input" 
                    type="text"
                    id="reconstitutionSolvent" 
                    name="reconstitutionSolvent" 
                    value={formData.reconstitutionSolvent}
                    onChange={handleChange}
                />

                <label htmlFor="reconstitutionVolume">Volume ( mL )</label>
                <input
                    className="form-input" 
                    type="number"
                    id="reconstitutionVolume" 
                    name="reconstitutionVolume" 
                    value={formData.reconstitutionVolume}
                    onChange={handleChange}
                />

                <label htmlFor="reconstitutionFinalConcentration">Concentração {units ? units : null}</label>
                <input
                    className="form-input" 
                    type="number"
                    id="reconstitutionFinalConcentration" 
                    name="reconstitutionFinalConcentration" 
                    value={formData.reconstitutionFinalConcentration}
                    onChange={handleChange}
                    required
                    />

            </fieldset>

            <fieldset>
                <legend>Compatibilidade</legend>
                <div className="compatibility-container">
                    <label htmlFor="saline">Cloreto de Sódio 0,9%
                    <input 
                        type="checkbox"
                        id="saline"
                        name="saline"
                        checked={formData.saline}
                        value= {true}
                        onChange={(e) => setFormData((prev) => ({...prev, saline: e.target.checked}))}
                        />
                    </label>

                    <label htmlFor="glucose">Glucose 5%
                    <input 
                        type="checkbox"
                        id="glucose"
                        name="glucose"
                        value= {true}
                        checked={formData.glucose}
                        onChange={(e) => setFormData((prev) => ({...prev, glucose: e.target.checked}))}
                        />
                    </label>
                </div>

            </fieldset>

            <fieldset id="fieldset-dilution">
                <legend>Diluição</legend>
                <div className="solvents-div">
                { 
                    formData.saline || formData.glucose
                    ? 
                        <>
                            <div 
                            className="saline-dilution dilution-div"
                            style={{display: formData.saline ? "" :"none"}}
                            >
                                <h4>Diluição em Cloreto de Sódio 0,9%</h4>
                                <label htmlFor="min-saline-dilution">Minímo {units ? `(${units})`: ""}</label>
                                <input
                                    className="form-input" 
                                    type="number"
                                    id="minSalineDilution" 
                                    name="minSalineDilution" 
                                    value={formData.minSalineDilution}
                                    onChange={handleChange}
                                    />

                                <label htmlFor="max-saline-dilution">Maxímo {units ? `(${units})`: ""}</label>
                                <input
                                    className="form-input" 
                                    type="number"
                                    id="maxSalineDilution" 
                                    name="maxSalineDilution" 
                                    value={formData.maxSalineDilution}
                                    onChange={handleChange}
                                    />

                            </div>

                            <div 
                            className="glucose-dilution dilution-div"
                            style={{display: formData.glucose ? "" :"none"}}
                            >
                                <h4>Diluição em Glucose 5%</h4>
                                <label htmlFor="min-glucose-dilution">Minímo {units ? `(${units})`: ""}</label>
                                <input
                                    className="form-input" 
                                    type="number"
                                    id="minGlucoseDilution" 
                                    name="minGlucoseDilution" 
                                    value={formData.minGlucoseDilution}
                                    onChange={handleChange}
                                    // style={{display: formData.glucose ? "block": "none"}}
                                    />

                                <label htmlFor="max-glucose-dilution">Maxímo {units ? `(${units})`: ""}</label>
                                <input
                                    className="form-input" 
                                    type="number"
                                    id="maxGlucoseDilution" 
                                    name="maxGlucoseDilution" 
                                    value={formData.maxGlucoseDilution}
                                    onChange={handleChange}
                                    // style={{display: formData.glucose ? "block": "none"}}
                                    />

                            </div>
                        </>
                    : <h4 style={{textAlign:"center"}}>Escolha os solventes compatíveis</h4>
                }
                </div>
                <div className="filter-light-div">
                    <label htmlFor="filter">Filtro 0,2 micra
                        <input 
                            type="checkbox"
                            id="filter"
                            name="filter"
                            checked={formData.filter}
                            value= {true}
                            onChange={(e) => setFormData((prev) => ({...prev, filter: e.target.checked}))}
                            />
                        </label>

                        <label htmlFor="filter">Proteção da luz
                        <input 
                            type="checkbox"
                            id="lightprotection"
                            name="lightprotection"
                            checked={formData.lightprotection}
                            value= {true}
                            onChange={(e) => setFormData((prev) => ({...prev, lightprotection: e.target.checked}))}
                            />
                        </label>
                </div>

            </fieldset>

            <fieldset id="fieldset-stability">
                <legend>Estabilidade</legend>
                    <div className="solvents-div">

                        {
                        formData.saline || formData.glucose 
                        ? 
                        <>
                            <div className="stability-div">
                                <h4>Diluido</h4>

                                <label 
                                    htmlFor="stabilityDilutedSolvent"
                                    >
                                    Solvente
                                </label>
                                <select
                                    id="stabilityDilutedSolvent"
                                    name="stabilityDilutedSolvent"
                                    value={formData.stabilityDilutedSolvent}
                                    onChange={handleChange}
                                >
                                    <option
                                        disabled
                                        value='default'
                                    >Escolha
                                    </option>
                                    <option 
                                        disabled={!formData.saline}
                                        value="saline"
                                    >Cloreto de Sódio 0,9%
                                    </option>
                                    <option
                                        disabled={!formData.glucose}
                                        value="glucose"
                                    >Glucose 5%
                                    </option>
                                </select>

                                <label 
                                    htmlFor="stabilityDilutedVolume"
                                    >
                                    Volume (mL)
                                </label>
                                <input
                                    className="form-input" 
                                    type="number"
                                    id="stabilityDilutedVolume" 
                                    name="stabilityDilutedVolume" 
                                    value={formData.stabilityDilutedVolume}
                                    onChange={handleChange}
                                    />

                                <label 
                                    htmlFor="stabilityDilutedCondition"
                                    >
                                    Condições
                                </label>
                                <select
                                    id="stabilityDilutedCondition"
                                    name="stabilityDilutedCondition"
                                    value={formData.stabilityDilutedCondition}
                                    onChange={handleChange}
                                >
                                    <option
                                        disabled
                                        value='default'
                                    >Escolha
                                    </option>
                                    <option 
                                        value="cold"
                                    >2 - 8º C
                                    </option>
                                    <option
                                        value="hot"
                                    >Temperatura ambiente
                                    </option>
                                </select>

                                <label htmlFor="stabilityDilutedTime">Tempo</label>
                                <input
                                    className="form-input" 
                                    type="text"
                                    id="stabilityDilutedTime" 
                                    name="stabilityDilutedTime" 
                                    value={formData.stabilityDilutedTime}
                                    onChange={handleChange}
                                    />

                            </div>                        
                        </>
                        
                        : null
                        }
                        
                        <div className="stability-div">

                            <h4>Não diluido</h4>
                            <label 
                                htmlFor="stabilityUndilutedCondition"
                                >
                                Condições
                            </label>
                            <select
                                id="stabilityUndilutedCondition"
                                name="stabilityUndilutedCondition"
                                value={formData.stabilityUndilutedCondition}
                                onChange={handleChange}
                            >
                                <option
                                    disabled
                                    value='default'
                                >Escolha
                                </option>
                                
                                <option 
                                    value='cold'
                                >2 - 8º C
                                </option>
                                <option
                                    value='hot'
                                >Temperatura ambiente
                                </option>
                            </select>
                            
                            <label 
                                htmlFor="stabilityUndilutedTime"
                                >
                                Tempo
                            </label>
                            <input
                                className="form-input" 
                                type="text"
                                id="stabilityUndilutedTime" 
                                name="stabilityUndilutedTime" 
                                value={formData.stabilityUndilutedTime}
                                onChange={handleChange}
                                />
                        </div>
                    </div>

            </fieldset>

            <fieldset>
                <legend>Outras informações</legend>
                <textarea 
                    className="form-input"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                ></textarea>
            </fieldset>

            <fieldset>
                <legend>Imagens</legend>

                <label htmlFor="file">Foto do frasco</label>
                <input 
                    type="file" 
                    name="file"
                    id="file"
                    accept="image/*"
                    />
            </fieldset>
            <button id='submit-btn' className="submit-btn" type="submit">Submit</button>
        </form>
    )
   
}

