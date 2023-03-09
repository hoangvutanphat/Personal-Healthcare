import { Col, Row, Space } from "antd";
import icon_list_check from "../../../assets/images/icon_check_list.svg";
import icon_click from "../../../assets/images/icon_click.svg";
import icon_search from "../../../assets/images/icon_search.svg";
import icon_mouse from "../../../assets/images/icon_mouse.svg";
import React from "react";

const SmallLabelTutorial = ({ title }) => {
  return (
    <div className="small-employee-information">
      <h1>{title}</h1>
      <Row gutter={[24, 24]}>
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
    </div>
  );
};

export default SmallLabelTutorial;
