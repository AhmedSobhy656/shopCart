import React from "react";
import Cart from "./cart";

//1. Component
const Menu = props => {
  return (
    <React.Fragment>
      <h1>Menu</h1>

      <div className="row">
          {props.products.map(product => (
          <div className="col-lg-4 col-md-4 col-sd-1 box">
            <tr key={product.id}>
            <img src= {product.image} ></img>
            <div className="box-data">
                {product.name}
                <br/>
                Price : {product.price}
                <br/>
                <br/>
                <Cart onClick={props.onClick} product={product} />
             </div>
              </tr>
            </div>
          ))}
        </div>
    </React.Fragment>
  );
};

export default Menu;
