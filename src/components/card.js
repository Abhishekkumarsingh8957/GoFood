import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";
function Card(props) {
  let foodItem=props.foodItem;
  let option=props.options;
  let priceOptions=Object.keys(option);
  let dispatch=useDispatchCart();
  const priceRef=useRef();
  let data=useCart();
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  const handleAddToCart= async()=>{
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img})
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size , img: foodItem.img})

  }
  let finalPrice=qty*parseInt(option[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div className="card mt-3 w-auto" style={{  maxHeight: "360px" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{height:"180px",objectFit:"fill"}}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {priceOptions.map((data)=>{
              return <option key={data} value={data}>{data} </option>   
            })}
          </select>
          <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
          <hr/>
          <button className="btn btn-success justify-content-center ms2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
export default Card;








