import { Row } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ListCard from "./component/ListCard";
import ListItem from "./component/ListItem";
import NotFound from "./component/NotFound";
import ShoppingCart from "./component/ShoppingCart";
import Header from "./component/header";
import Buy from "./component/Buy";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect exact from="/" to="/list" />
        <Route exact path="/list" component={ListCard} />
        <Route exact path="/list/:id" component={ListItem} />
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/buy" component={Buy} />
        <Row component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
