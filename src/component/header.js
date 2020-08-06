import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Row, Input, Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const numberCart = useSelector((state) => state.cards.numberCart);
  const { Search } = Input;
  const list = useSelector((state) => state.cards.list);
  const searchProduct = (value) => {
    // list.forEach(element => {
    //   if()
    // });
  };
  return (
    <Link to={`/cart`}>
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
            <Search onSearch={searchProduct} enterButton />
          </div>
        </Col>

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
      </Row>
    </Link>
  );
};
export default Header;
