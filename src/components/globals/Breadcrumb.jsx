import { Breadcrumb } from "antd";
import { CaretRightOutlined } from '@ant-design/icons'
import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.scss";

const BreadcrumbProvider = ({ item, address }) => {
  return (
    <nav className="page-breadcrumb">
      <Breadcrumb className="breadcrumb" separator={<CaretRightOutlined style={{ fontSize: 12 }} />}>
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        {item &&
          item.length > 0 &&
          item.map((el, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={el.link}>{el.label}</Link>
            </Breadcrumb.Item>
          ))}
        <Breadcrumb.Item>{address}</Breadcrumb.Item>
      </Breadcrumb>
    </nav>
  );
};

export default BreadcrumbProvider;
