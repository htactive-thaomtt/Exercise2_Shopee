import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Table, Button } from "antd";
import { addOrder } from "../redux/Actions/action";
import { v4 as uuidv4 } from "uuid";

const Buy = () => {
  const cart = useSelector((state) => state.cards.cart);
  const list = useSelector((state) => state.cards.list);
  const dispatch = useDispatch();
  const [cost, setCost] = useState(0);

  const [data, setdata] = useState([]);

  const renderData = () => {
    let newdata = [];
    let newcost = 0;
    list.forEach((item) => {
      cart.forEach((child) => {
        if (item.id === child.productId && child.active === true) {
          const newItem = {
            id: item.id,
            name: item.name,
            cost: item.cost,
            number: child.numberBuy,
            url: item.url,
          };
          newdata = [...newdata, newItem];
          if (child.active === true) {
            newcost += item.cost * child.numberBuy;
          }
        }
      });
    });
    setdata(newdata);
    setCost(newcost);
  };
  useEffect(() => {
    renderData();
  }, []);

  const tableColumns = [
    { title: "Product", dataIndex: "name", key: "name" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Total",
      render: (record) => <span>{record.cost * record.number}</span>,
    },
  ];
  const handleOrder = () => {
    let newOrder = [];
    data.forEach((item) => {
      newOrder = [
        ...newOrder,
        { idItem: item.id, number: item.number, payment: false },
      ];
    });
    const action = addOrder({ id: uuidv4(), order: newOrder });
    dispatch(action);
  };
  return (
    <>
      <Row
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#ff471a",
          justifyContent: "center",
        }}
      >
        Đơn hàng
      </Row>
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        columns={tableColumns}
        dataSource={data}
        pagination={false}
        style={{ marginLeft: "40px", marginRight: "40px" }}
      />
      <Row style={{ justifyContent: "flex-end", margin: "40px" }}>
        <span
          span={6}
          style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "30px" }}
        >
          Tổng tiền
        </span>
        <span
          span={6}
          style={{
            color: "#ff471a",
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "30px",
          }}
        >
          {cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} VND
        </span>
        <span style={{ marginRight: "30px", marginLeft: "30px" }}>
          <Button
            onClick={handleOrder}
            size="large"
            style={{
              backgroundColor: "#ff471a",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Đặt hàng
          </Button>
        </span>
      </Row>
    </>
  );
};
export default Buy;
