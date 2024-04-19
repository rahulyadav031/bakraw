import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


function Loader(props) {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <ClipLoader
                color={props.color}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
                loading={props.loading}
            />
        </div>
    )
}

export default Loader