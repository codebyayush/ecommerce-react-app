import React, { useEffect, useState } from "react";
import "./App.css";
import { Inputproduct } from "./components/Input prod/Inputproduct";
import { Navbar } from "./components/Navbar/Navbar";
import InputData from "./components/InputData/InputData";
import Cart from "./components/Cart/Cart";
import InputCategory from "./components/InputData/InputCategory";

const App = () => {
  const [itemList, setItems] = useState([]);
  const [cartTrigger, setCartTrigger] = useState(false);
  const [cartArr, setCartArr] = useState([]);

  useEffect(() => {
    setItems(itemList)
  })
  

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

  const getItemsByCategory = (category) => {
    const storedItemList = JSON.parse(localStorage.getItem("itemList")) || [];
    return storedItemList.filter((item) => item.itemCategory === category);
  };
  

  
  return (
    <>
      {!cartTrigger ? (
        <>
          <Navbar trigger={cartTrigger} triggerHandler={cartTriggerHandler} />
          <Inputproduct newList={itemList} addItem={addNewItem} />
          <InputCategory
              itemList={getItemsByCategory("Electronics")}
              category="Electronics"
              deleteHandler={deleteItemHandler}
            />
            <InputCategory
              itemList={getItemsByCategory("Grocery")}
              category="Grocery"
              deleteHandler={deleteItemHandler}
            />
            <InputCategory
              itemList={getItemsByCategory("Food")}
              category="Food"
              deleteHandler={deleteItemHandler}
            />
          {itemList.map((values) => (
            <InputData
              id={values.id}
              itemName={values.itemName}
              itemPrice={values.itemPrice}
              itemCategory= {values.itemCategory}
              deleteHandler={deleteItemHandler}
              cartArrHandler={cartArrHandler}
            />
          ))}
        </>
      ) : (
        <>
          <Navbar trigger={cartTrigger} triggerHandler={cartTriggerHandler} />
          {cartArr.map((val) => (
              <Cart
                id={val.id}
                itemName={val.itemName}
                itemPrice={val.itemPrice}
                itemCategory= {val.itemCategory}
                deleteHandler={deleteItemFromCart}
              />
            ))}
        </>
      )}
    </>
  );
};

export default App;