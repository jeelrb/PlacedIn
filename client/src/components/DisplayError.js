import React from 'react'

const style = {
    
}

function DisplayError(props) {

    const { error } = props

    return (
        <div style={{color: "red", "padding-left": "100px"}}>
            { error }
        </div>
    )
}

export default DisplayError
