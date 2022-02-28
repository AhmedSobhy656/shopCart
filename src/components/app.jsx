import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import NavBar from "./navbar";
import ShoppingCart from "./shoppingCart";
import Home from "./home";
import ProductDetails from "./productDetails";
import Menu from "./menu";
import NotFound from "./notFound";

import './App.css';

class App extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    //Call Backend
    let { data } = await axios.get(
       //Use Json Server as port 3000 run it first : npx json-server --watch db.json 
      "http://localhost:3000/products/"
    );

    //Set State
    this.setState({ products: data });
  }

  handleDelete = async (product) => {
    const oldProducts = [...this.state.products];

    //State
    //Clone
    //Edit
    const products = this.state.products.filter((p) => p.id !== product.id);
    //Set state
    this.setState({ products });

    try {
      //Call B
      await axios.delete(
        "http://localhost:3000/products/"
        + product.id
      );
    } catch (ex) {
      toast("Cant Delete");
      this.setState({ products: oldProducts });
    }
  };

  handleEdit = () => {
    console.log("edit");
  };

  handleReset = () => {
    //Clone
    let products = [...this.state.products];
    //Edit
    products = products.map((p) => {
      p.count = 0;
      return p;
    });
    //Set state
    this.setState({ products });
  };

  IncrementHandler = (product) => {
    //Clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //Edit
    products[index].count++;
    //Set State
    this.setState({ products });
  };

  handleInCartChange = (product) => {
    //Clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //Edit
    products[index].isInCart = !products[index].isInCart;
    //Set State
    this.setState({ products });
  };

  render() {
    console.log(this.state.products);
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
          productsCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <main className="container">
          <Switch>
            <Route
              path="/products/:id/:name?"
              render={(props) => (
                <ProductDetails products={this.state.products} {...props} />
              )}
            />
            <Route
              path="/cart"
              render={(props) => (
                <ShoppingCart
                  products={this.state.products.filter((p) => p.isInCart)}
                  onIncrement={this.IncrementHandler}
                  onDelete={this.handleInCartChange}
                  onReset={this.handleReset}
                  {...props}
                />
              )}
            />
            <Route path="/notfound" component={NotFound} />
            {/* //2. Add Route */}
            <Route
              path="/menu"
              render={(props) => (
                <Menu
                  {...props}
                  products={this.state.products}
                  onClick={this.handleInCartChange}
                />
              )}
            />
            <Route path="/home" exact component={Home} />
            <Redirect from="/" to="/home" />
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
