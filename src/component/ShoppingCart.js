/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, InputNumber, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  editActive,
  editProductNumber,
  updateActiveAll,
} from "../redux/Actions/action";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cards.cart);
  const list = useSelector((state) => state.cards.list);
  const dispatch = useDispatch();
  const [cost, setCost] = useState(0);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  const [data, setdata] = useState([]);

  const renderData = () => {
    let newData = [];
    let newCost = 0;
    let newSelectedRowKeys = [...selectedRowKeys];
    list.forEach((item) => {
      cart.forEach((child) => {
        if (item.id === child.productId) {
          newData = [
            ...newData,
            {
              id: item.id,
              name: item.name,
              cost: item.cost,
              number: child.numberBuy,
              url: item.url,
              active: child.active,
            },
          ];
          if (child.active === true) {
            newCost += item.cost * child.numberBuy;
            newSelectedRowKeys = [...newSelectedRowKeys, item.id];
          }
        }
      });
    });
    setdata(newData);
    setCost(newCost);
    setselectedRowKeys(newSelectedRowKeys);
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
      render: (number, record) => (
        <span>
          <InputNumber
            min={1}
            max={10}
            step={1}
            defaultValue={number}
            onChange={(number) => onChangeNumber(number, record.id)}
          />
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (record) => (
        <span>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.id);
            }}
          >
            Delete
          </a>
        </span>
      ),
    },
  ];

  const onChangeNumber = (numb, id) => {
    const action = editProductNumber({ productId: id, numberBuy: numb });
    dispatch(action);
    renderData();
  };

  const handleDelete = (id) => {
    const action = deleteProduct(id);
    dispatch(action);
    renderData();
  };
  const onSelect = (record, selected) => {
    if (selected) {
      setselectedRowKeys([...selectedRowKeys, record.id]);
      setCost(cost + record.cost * record.number);
    } else {
      setselectedRowKeys(selectedRowKeys.filter((id) => id !== record.id));
      setCost(cost - record.cost * record.number);
    }
    const action = editActive({
      id: record.id,
      value: selected,
    });

    dispatch(action);
  };
  const onSelectAllData = (selected, selectedRows, changeRows) => {
    console.log("selected", selected);
    if (!selected) {
      setselectedRowKeys([]);
      setCost(0);
    } else {
      let newSelectedRowKeys = [];
      let newCost = 0;
      selectedRows.forEach((item) => {
        newSelectedRowKeys = [...newSelectedRowKeys, item.id];
        newCost += item.cost * item.number;
      });
      setselectedRowKeys(newSelectedRowKeys);
      setCost(newCost);
    }
    const action = updateActiveAll(selected);
    dispatch(action);
  };
  // console.log("cart", cart);
  const rowSelections = {
    selectedRowKeys: selectedRowKeys,
    type: "checkbox",
    onSelect: onSelect,
    onSelectAll: onSelectAllData,
  };
  return data.length > 0 ? (
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
        Giỏ hàng
      </Row>
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        columns={tableColumns}
        rowSelection={rowSelections}
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
          {/* {cost.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} */}
          {cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </span>
        <span style={{ marginRight: "30px", marginLeft: "30px" }}>
          <Button
            size="large"
            style={{
              backgroundColor: "#ff471a",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {selectedRowKeys.length > 0 ? (
              <Link to="/buy">Mua hàng</Link>
            ) : (
              <span>Mua hàng</span>
            )}
          </Button>
          {/* </Link> */}
        </span>
      </Row>
    </>
  ) : (
    <Row
      style={{
        marginTop: "50px",
        fontSize: "20px",
        fontWeight: "bolder",
        justifyContent: "center",
      }}
    >
      Giỏ hàng trống
    </Row>
  );
};
export default ShoppingCart;
