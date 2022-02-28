import React from "react";

const Cart = props => {
  const style = !props.product.isInCart
    ? { color: "white", cursor: "pointer" }
    : { cursor: "pointer" };
  return (
      <button
        style={style}
        onClick={() => props.onClick(props.product)}
        className="btn btn-primary buton cart"
     > Add To Cart </button>
  );
};

export default Cart;
