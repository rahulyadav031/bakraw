import React from 'react'

function Button({ delivered }) {
    return (
        <div className={`px-3 py-2 ${(delivered === "Order is being prepared...") ? 'bg-yellow-300' : (delivered === "Delivered") ? 'bg-green-300' : 'bg-red-300'}`}>
            <span>{delivered}</span>
        </div>
    )
}

export default Button
