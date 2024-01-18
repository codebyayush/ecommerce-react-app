import React, {useState, useEffect} from "react";
import InputData from "./InputData";



const InputCategory = (props) => {
    
    const { category, itemList } = props;
    const [items, setItems] = useState(itemList);

    useEffect(() => {
      setItems(itemList);
    }, [itemList]); 

    return (
        <>
        <div className="card mx-auto w-50 m-3">
            <h2 className="mx-2 my-3">{category}</h2>
            <ul className="li-group m-3">
            {items.map((item) => (
                <InputData
                key={item.id}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                itemCategory={item.itemCategory}
                deleteHandler={props.deleteHandler}
                cartArrHandler={props.cartArrHandler}
                />
            ))}
            </ul>
        </div>
        </>
    );
};

export default InputCategory;
