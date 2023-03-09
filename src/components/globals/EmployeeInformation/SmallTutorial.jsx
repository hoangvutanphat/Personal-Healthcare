import { Col, Divider, Row, Space } from "antd";
import React from "react";
import icon_list_check from "../../../assets/images/icon_check_list.svg";
import icon_click from "../../../assets/images/icon_click.svg";
import icon_search from "../../../assets/images/icon_search.svg";
import icon_mouse from "../../../assets/images/icon_mouse.svg";

const SmallTutorial = ({ title }) => {
  return (
    <>
      <h2 style={{ marginBottom: 20 }}>{title}</h2>
      <Row justify="center" gutter={[24, 24]} className="top-content-box">
        <Col span={24}>
          <Space size={30} direction="vertical" style={{ width: "100%" }}>
            <Space size={24}>
              <img src={icon_click} alt="" />
              <p>
                Bước 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_search} alt="" />
              <p>
                Bước 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_list_check} alt="" />
              <p>
                Bước 3: Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_mouse} alt="" />
              <p>
                Bước 4: Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua
              </p>
            </Space>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default SmallTutorial;
