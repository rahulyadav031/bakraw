import React from 'react'

function Chip({ info }) {
    return (
        <div className="bg-green-500 text-white md:text-black md:p-0 md:bg-transparent px-[4px] py-[2px] rounded-md">
            {info}
        </div>
    )
}

export default Chip