import React from 'react'

const style = {
    
}

function DisplayError(props) {

    const { error } = props

    return (
        <div style={{color: "red"}}>
            { error }
        </div>
    )
}

export default DisplayError
