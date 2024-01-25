import React from "react";

export default function Form() {

    const [res, setRes] = React.useState('')

    React.useEffect(() => 
        
        fetch('http://localhost:5000')
        .then(res => res.json())
        .then(data => setRes(data))
    )


}
