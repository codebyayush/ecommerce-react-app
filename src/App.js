import React, { useState } from "react";
import "./App.css";
import { Inputproduct } from "./components/Input prod/Inputproduct";
import { Navbar } from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import InputCategory from "./components/InputData/InputCategory";
import TotalPrice from "./components/TotalPrice/TotalPrice";

const App = () => {
  const [itemList, setItems] = useState([]);
  const [cartTrigger, setCartTrigger] = useState(false);
  const [cartArr, setCartArr] = useState([]);

  const addNewItem = (obj) => {
    setItems((prevItem) => [...prevItem, obj]);
  };

  const cartArrHandler = (newItem) => {
    setCartArr((prevItem) => [...prevItem, newItem]);
  };

  const deleteItemHandler = (itemID) => {
    const updatedList = itemList.filter((prevItem) => {
      return prevItem.id !== itemID;
    });

    setItems(updatedList);

    //updating the local storage after deletion
    localStorage.setItem("itemList", JSON.stringify(updatedList));
  };

  const deleteItemFromCart = (itemID) => {
    const updatedCart = cartArr.filter((prevItem) => {
      return prevItem.id !== itemID;
    });
    setCartArr(updatedCart);
  };

  const cartTriggerHandler = (bool) => {
    if (bool === true) {
      setCartTrigger(false);
    } else {
      setCartTrigger(true);
    }
  };

  //filter items in the list as per the category
  const filterItems = (category) => {
    return itemList.filter((item) => {
      return item.itemCategory === category;
    });
  };

  return (
    <>
      {!cartTrigger ? (
        <>
          <Navbar trigger={cartTrigger} triggerHandler={cartTriggerHandler} />
          <Inputproduct newList={itemList} addItem={addNewItem} />
          <InputCategory
            itemList={filterItems("electronics")}
            category="Electronics"
            deleteHandler={deleteItemHandler}
            cartArrHandler={cartArrHandler}
          />
          <InputCategory
            itemList={filterItems("grocery")}
            category="Grocery"
            deleteHandler={deleteItemHandler}
            cartArrHandler={cartArrHandler}
          />
          <InputCategory
            itemList={filterItems("food")}
            category="Food"
            deleteHandler={deleteItemHandler}
            cartArrHandler={cartArrHandler}
          />
          <TotalPrice itemList={itemList}/>
        </>
      ) : (
        <>
          <Navbar trigger={cartTrigger} triggerHandler={cartTriggerHandler} />
          {cartArr.map((val) => (
            <Cart
              id={val.id}
              itemName={val.itemName}
              itemPrice={val.itemPrice}
              itemCategory={val.itemCategory}
              deleteHandler={deleteItemFromCart}
            />
          ))}
          
        </>
      )}
    </> 
  );
};

export default App;