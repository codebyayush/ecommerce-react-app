import React, { useReducer, useState } from "react";
import { Popup } from "../Popup/Popup";

const itemReducer = (state, action) => {
  if (action.type === "ITEM_INPUT") {
    return { value: action.value };
  } else {
    return { value: "" };
  }
};

const priceReducer = (state, action) => {
  if (action.type === "PRICE_INPUT") {
    return { value: action.value, isValid: action.value > 0 };
  }
  if (action.type === "PRICE_BLUR") {
    return { value: state.value, isValid: state.value > 0 };
  } else {
    return { value: "", isValid: false };
  }
};

const optionReducer = (state, action) => {
  if (action.type === "CATEGORY_INPUT") {
    return { value: action.value };
  } else {
    return { value: "" };
  }
};

export const Inputproduct = (props) => {
  const [validateForm, setFormisValid] = useState(false);
  const [popTrigger, setTrigger] = useState(false);
  const uniqueID = Math.random();

  const [itemState, dispatchItem] = useReducer(itemReducer, { value: "" });
  const [priceState, dispatchPrice] = useReducer(priceReducer, {
    value: "",
    isValid: false,
  });
  const [optionState, dispatchOption] = useReducer(optionReducer, {
    value: "",
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      itemState.value === "" ||
      priceState.value === "" ||
      optionState.value === ""
    ) {
      setTrigger(true);
    } else {
      const newItem = {
        key: uniqueID,
        id: uniqueID,
        itemName: itemState.value,
        itemPrice: priceState.value,
        itemCategory: optionState.value,
      };

      props.addItem(newItem);
      
      // updating the itemList with new item
      const updatedItemList = [...props.newList, newItem];
      // Save the updated item list to local storage
      localStorage.setItem("itemList", JSON.stringify(updatedItemList));

      // Reset form values
      dispatchItem({ type: "ITEM_INPUT", value: "" });
      dispatchPrice({ type: "PRICE_INPUT", value: "", isValid: false });
      dispatchOption({ type: "CATEGORY_INPUT", value: "" });
    }
  };

  const itemOnChange = (event) => {
    dispatchItem({ type: "ITEM_INPUT", value: event.target.value });

    setFormisValid(priceState.isValid);
  };

  const priceOnChange = (event) => {
    dispatchPrice({ type: "PRICE_INPUT", value: event.target.value });

    setFormisValid(priceState.isValid);
  };

  const categoryOnChange = (event) => {
    dispatchOption({ type: "CATEGORY_INPUT", value: event.target.value });

    setFormisValid(priceState.isValid);
  };

  const validatePrice = () => {
    dispatchPrice({ type: "PRICE_BLUR" });

    setFormisValid(priceState.isValid);
  };

  const triggerHandler = (bool) => {
    if (bool === false) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  return (
    <>
      <div className="card w-50 mx-auto">
        <form action="#" className="form" onSubmit={onSubmitHandler}>
          <div className="card-body">
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              className="form-control"
              placeholder="Enter Item"
              value={itemState.value}
              onChange={itemOnChange}
            />
          </div>
          <div className="card-body">
            <label htmlFor="itemName" className="form-label">
              Price:
            </label>
            <input
              type="number"
              id="itemName"
              className="form-control"
              placeholder="Enter Price"
              value={priceState.value}
              onChange={priceOnChange}
              onBlur={validatePrice}
              name="price"
              min="0"
              step=".01"
            />
          </div>
          <div className="card-body">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              class="form-select"
              value={optionState.value}
              onChange={categoryOnChange}
              aria-label="Default select example"
            >
              <option selected></option>
              <option value="electronics">Electronics</option>
              <option value="grocery">Grocery</option>
              <option value="food">Food</option>
            </select>
          </div>
          <button
            className="btn btn-primary m-3"
            disabled={!validateForm}
            type="submit"
          >
            Add Item
          </button>
        </form>
      </div>

      {
        <Popup popTrigger={popTrigger} setTrigger={triggerHandler}>
          <h2>Invalid Input</h2>
          <br />
          <p>fill the credentials</p>
        </Popup>
      }
    </>
  );
};
