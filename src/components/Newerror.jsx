import React from 'react'
import '../styles/newerror.css'
import { Link } from 'react-router-dom'

const Newerror = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h3 className='text-white'>Oops!</h3>
                    <h1>
                        <span>#</span>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </h1>
                </div>
                <h2 className='text-white'>Sorry, the page you requested was not found</h2>
            
                <div className='d-flex justify-content-evenly my-4'>
                        <Link exact to="/" className="button mx-0 ui bg-gate mouse600 text-amigos">
                            Go Back
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default Newerror