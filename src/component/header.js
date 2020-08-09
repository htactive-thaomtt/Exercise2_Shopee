import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Col, Input, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchProduct } from "../redux/Actions/action";

const Header = () => {
  const numberCart = useSelector((state) => state.cards.numberCart);
  const { Search } = Input;
  const dispatch = useDispatch();
  const searchItem = (value) => {
    const action = searchProduct(value);
    dispatch(action);
  };
  return (
    <Row
      style={{
        padding: "30px",
        background: "#ff471a",
        justifyContent: "flex-end",
        paddingRight: "120px",
        alignItems: "center",
      }}
    >
      <Col span={12} style={{ marginRight: "20%" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "5px" }}>
          <Search onSearch={searchItem} enterButton />
        </div>
      </Col>
      <Link to={`/cart`}>
        <Badge
          count={numberCart}
          showZero
          style={{
            backgroundColor: "#ffffff",
            color: "#ff471a",
          }}
        >
          <ShoppingCartOutlined
            style={{ color: "#ffffff", fontWeight: "bold", fontSize: "34px" }}
          />
        </Badge>
      </Link>
    </Row>
  );
};
export default Header;
