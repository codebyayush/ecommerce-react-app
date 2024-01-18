import React from 'react'
import ReactDOM  from 'react-dom'
import './Popup.css'

export const Popup = (props) => {
  return (props.popTrigger) ? 
        ReactDOM.createPortal(
                <div className="popup">
                    <div className="card">
                        <div className="card-body">
                                {props.children}
                                <button className='btn btn-outline-warning btn-block' onClick={() => props.setTrigger(true)}>Okay</button>          
                        </div>
                    </div>
            </div>
        , document.getElementById('popup-portal')) : ""
}