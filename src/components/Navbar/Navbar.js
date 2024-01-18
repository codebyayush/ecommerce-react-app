import React from "react";

export const Navbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark justify-content-between mb-3">
        <a className="navbar-brand ms-3 fw-bold fs-2">Store</a>
        <button
          className="btn btn-outline-success my-3 my-sm-0 m-3"
          type="cart"
          onClick={() => {
            return props.trigger
              ? props.triggerHandler(true)
              : props.triggerHandler(false);
          }}
        >
          Cart
        </button>
      </nav>
    </>
  );
};
