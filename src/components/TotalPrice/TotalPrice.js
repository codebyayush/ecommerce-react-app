import React, { useEffect, useState } from "react";

const TotalPrice = (props) => {
  const [items, setItems] = useState(props.itemList);

  useEffect(() => {
    setItems(props.itemList);
  }, [props.itemList]);

  const totalSum = items.reduce((acc, curr) => {
    acc += Number(curr.itemPrice);
    return acc;
  }, 0);

  return (
    <div className="card mx-auto w-50">
      <h4 className="m-3">Total Price: {totalSum}</h4>
    </div>
  );
};
 
export default TotalPrice;
