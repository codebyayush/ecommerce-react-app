import React from "react";

export default function InputData(props) {
  const newKey = Math.random();

  const addToCartHandler = () => {
    const newObj = {
      key: newKey,
      id: newKey,
      itemName: props.itemName,
      itemPrice: props.itemPrice,
      itemCategory: props.itemCategory,
    };
    props.cartArrHandler(newObj);
  };

  return (
    <>
      <div className="mx-500 w-100 ">
        <ul className="li-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <li>
              <h5>{props.itemName}</h5>
              <h5>category: {props.itemCategory}</h5>
              <h6 style={{ color: "maroon" }}>Rs. {props.itemPrice}</h6>
            </li>
            <div className="d-grid gap-4 d-md-block">
              <button
                className="btn btn-outline-danger m-1"
                onClick={() => props.deleteHandler(props.id)}
              >
                Delete Item
              </button>
              <button
                className="btn btn-outline-success"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </li>
        </ul>
      </div>
      <hr />
    </>
  );
}
