import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Layout, Pagination, Rate, Row, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import { isAfter } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { loadCard } from "../redux/Actions/action";
const { Content } = Layout;
const { Option } = Select;
const ListCard = () => {
  const [publicProduct, setPublicProduct] = useState("");
  const [newProduct, setnewProduct] = useState("");
  const [bestSeller, setbestSeller] = useState("");

  const dispatch = useDispatch();
  const list = useSelector((state) => state.cards.list);
  const min = useSelector((state) => state.cards.min);

  const [currentPage, setCurrentPage] = useState(1);

  const cost = [
    { value: 100000, label: "100000" },
    { value: 1000000, label: "1000000" },
    { value: 2000000, label: 2000000 },
  ];

  const itemPerPage = 6;
  const totalPage = Math.ceil(list.length / itemPerPage);

  const handlePublicProduct = () => {
    setPublicProduct("danger");
    setnewProduct("");
    setbestSeller("");
    list.sort((a, b) => {
      if (a.rate > b.rate) return -1;
      if (a.rate < b.rate) return 1;
      return 0;
    });
    setCurrentPage(1);
    const action = loadCard(0);
    dispatch(action);
  };
  const handleNewProduct = () => {
    setPublicProduct("");
    setnewProduct("danger");
    setbestSeller("");
    list.sort(function (a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      if (isAfter(dateA, dateB)) return -1;
      if (isAfter(dateB, dateA)) return 1;
      return 0;
    });
    setCurrentPage(1);
    const action = loadCard(0);
    dispatch(action);
  };
  const handleBestSeller = () => {
    setPublicProduct("");
    setnewProduct("");
    setbestSeller("danger");
    list.sort((a, b) => {
      if (a.numberSold > b.numberSold) return -1;
      if (a.numberSold < b.numberSold) return 1;
      return 0;
    });
    setCurrentPage(1);
    const action = loadCard(0);
    dispatch(action);
  };

  const onChange = (page) => {
    setCurrentPage(page);
    const action = loadCard((page - 1) * itemPerPage);
    dispatch(action);
  };
  let match = useRouteMatch();
  return (
    <Content>
      <Row style={{ margin: "40px", justifyContent: "flex-start" }}>
        <Col>Sắp xếp theo</Col>
        <Button
          type={publicProduct}
          style={{ marginLeft: "20px" }}
          onClick={handlePublicProduct}
        >
          {" "}
          Phổ biến{" "}
        </Button>
        <Button
          type={newProduct}
          style={{ marginLeft: "20px" }}
          onClick={handleNewProduct}
        >
          {" "}
          Mới nhất
        </Button>
        <Button
          type={bestSeller}
          style={{ marginLeft: "20px" }}
          onClick={handleBestSeller}
        >
          {" "}
          Bán chạy nhất{" "}
        </Button>

        <Select
          // defaultValue="lucy"
          placeholder="Giá"
          style={{ width: 180, marginLeft: "20px" }}
          // onChange={handleChange}
        >
          {cost.map((item, key) => (
            <Option key={key} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Pagination
          current={currentPage}
          onChange={onChange}
          total={totalPage * 10}
        />
      </Row>
      <Row style={{ margin: "20px" }}>
        {list.slice(min, min + itemPerPage).map((item, key) => (
          <Col key={item.id} span={5}>
            <Link to={`${match.url}/${item.id}`}>
              <Card
                style={{ margin: "10px" }}
                cover={<img alt="example" src={item.url} />}
              >
                <Meta
                  title={item.name}
                  description={
                    <>
                      <Row style={{ justifyContent: "space-between" }}>
                        <HeartOutlined style={{ fontSize: "12px" }} />
                        <Rate
                          style={{ fontSize: "10px" }}
                          allowHalf
                          defaultValue={item.rate}
                        />
                        <Col>Đã bán: {item.numberSold}</Col>
                      </Row>
                      <Row style={{ justifyContent: "flex-end" }}>
                        <Col>{item.city}</Col>
                      </Row>
                    </>
                  }
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Content>
  );
};
export default ListCard;
