/* eslint-disable jsx-a11y/alt-text */
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addProduct } from "../redux/Actions/action";

const ListItem = () => {
  const list = useSelector((state) => state.cards.list);
  // const cart = useSelector((state) => state.cards.cart);

  const id = useParams();
  const [item, setItem] = useState({});
  const [number, setnumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    list.map((child) => {
      if (child.id === id.id) {
        setItem(child);
      }
      return list;
    });
  });
  const onChangeNumber = (value) => {
    setnumber(value);
  };
  const handleAddProduct = () => {
    const action = addProduct({
      productId: item.id,
      numberBuy: number,
      active: true,
    });
    dispatch(action);
  };

  const handleShoppingCart = () => {
    const action = addProduct({
      productId: item.id,
      numberBuy: number,
      active: true,
    });
    dispatch(action);
  };
  return (
    <Row>
      <Col span={12} style={{ margin: "20px" }}>
        <img src={item.url} style={{ width: "90%", height: "100%" }} />
      </Col>
      <Col span={6} style={{ marginTop: "10%" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>Tên sản phẩm: </Col>
          <Col span={12}>{item.name}</Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>Giá tiền:</Col>
          <Col span={12}>{item.cost}</Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>Nơi bán:</Col>
          <Col span={12}>{item.city}</Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Rate allowHalf defaultValue={item.rate} />
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>Số lượng:</Col>
          <Col span={12}>
            <InputNumber
              min={1}
              max={10}
              step={1}
              defaultValue={1}
              onChange={onChangeNumber}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Button
            style={{
              border: "1px solid #ff471a",
              color: "#ff471a",
              marginRight: "20px",
            }}
            onClick={handleAddProduct}
          >
            <ShoppingCartOutlined style={{ color: "#ff471a" }} />
            Thêm vào giỏ hàng
          </Button>
          <Link to={`/cart`} onClick={handleShoppingCart}>
            <Button style={{ backgroundColor: "#ff471a", color: "#ffffff" }}>
              Mua ngay
            </Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};
export default ListItem;
