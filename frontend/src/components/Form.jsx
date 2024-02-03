import React from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {

    const [formData, setFormData] = React.useState({
            brandName:'',
            dci:'',
            pharmForm:'',
            dose: '',
            units: '',
            reconstitutionSolvent: '',
            reconstitutionVolume: '',
            reconstitutionFinalConcentration: '',
            saline: false,
            glucose: false,
            minSalineDilution: '',
            maxSalineDilution: '',
            minGlucoseDilution: '',
            maxGlucoseDilution: '',
            stabilityDilutedSolvent: 'default',
            stabilityDilutedVolume: '',
            stabilityDilutedCondition: 'default',
            stabilityDilutedTime: '',
            stabilityUndilutedCondition: 'default', 
            stabilityUndilutedTime: ''

    })

    const units = formData.units ? `${formData.units} / mL` : null

    const form = document.getElementById('form')
    const submitter = document.getElementById('submit-btn')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataToSubmit = new FormData(form, submitter)
        console.log(dataToSubmit)       
        
        fetch("http://localhost:5000/api/v1/medicines/", {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
             },
             body: dataToSubmit
        }).then((response) =>  {
           (response.json())
           .then(data => navigate('/confirmAdd', {state: data.data}))
        })
        .catch(error => console.log(error.message))
    }

    const handleChange = (e) => {
        const {value, name} = e.target
        setFormData((prev) => ({ ...prev, [name]: value}))
    }


    return (
        <>
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
                            checked={formData.glucose}
                            onChange={(e) => setFormData((prev) => ({...prev, glucose: e.target.checked}))}
                            />
                        </label>
                    </div>

                </fieldset>

                <fieldset id="fieldset-dilution">
                    <legend>Diluição</legend>

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
                </fieldset>

                <fieldset id="fieldset-stability">
                    <legend>Estabilidade</legend>

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
                        
                        : null}

                    
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
                <button id='submit-btn' type="submit">Submit</button>
            </form>
        </>
    )
}

