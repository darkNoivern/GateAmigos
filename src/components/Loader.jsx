import React from 'react'
import Hearts from '../images/hearts.svg'
import '../styles/loader.css'

const Loader = () => {
    return (
        <>
            <div className="loader-page flexy">
                <img className='loader-image' src={Hearts} width="100" alt="" />
            </div>
        </>
    )
}

export default Loader