import React from "react";

function Cart(props) {
  return (
    <>
      <div className='card mx-auto w-50 m-3'>
        <ul className='li-group m-3'>
            <li className="list-group-item d-flex justify-content-between align-items-center">
            <li>
                <h5>{props.itemName}</h5>
                <h6 style={{color: 'maroon'}}>Rs. {props.itemPrice}</h6>
            </li>
            <div className="d-grid gap-4 d-md-block" >
                <button className="btn btn-outline-danger m-1" onClick={() => props.deleteHandler(props.id)}>Delete Item</button>
            </div>   
            </li>
        </ul>
    </div>
    </>
  );
}

export default Cart;