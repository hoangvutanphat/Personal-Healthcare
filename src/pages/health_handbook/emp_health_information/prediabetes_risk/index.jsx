import React, { useState } from "react";
import { Input, Form, Button, Select } from "antd";
import ToolTip from "../../../../components/globals/Tooltip";
import Icon_infomation from "../../../../assets/images/icon_infomation.svg";
import { Col, Row } from "antd/lib";
import icon_arrow_down from "../../../../assets/images/icon_arrow_down_white.svg";
const dataOption1 = [
  {
    value: "1",
    label: "Chưa",
  },
  {
    value: "2",
    label: "Rồi",
  },
];
const dataOption2 = [
  {
    value: "1",
    label: "Không",
  },
  {
    value: "2",
    label: "Có",
  },
];
const PrediabetesRisk = ({ onShowRecomment }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    handleShowComnent(newData);
  };

  const handleShowComnent = (data) => {
    onShowRecomment();
    form.resetFields();
  };

  return (
    <>
      <Col span={24}>
        <h4 className="form-title">Vui lòng trả lời câu hỏi dưới đây</h4>
        <div className="question-wrapper" style={{ marginTop: 20 }}>
          <Form
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            form={form}
            id="myForm"
          >
            <Form.Item
              label={
                <div className="form-label">
                  <p>1. Bạn bao nhiêu tuổi?</p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Ngày sinh của bạn?"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="AGE"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <div className="form-label">
                  <p>2. Giới tính</p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Giới tính"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="GENDER"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={[
                  {
                    value: "1",
                    label: "Nam",
                  },
                  {
                    value: "2",
                    label: "Nữ",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="form-label">
                  <p>
                    3. Bạn đã bao giờ bị chẩn đoán đái tháo đường thai kỳ chưa?
                  </p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Đái tháo đường"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="GESTATIONAL_DIABETES"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={dataOption1}
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="form-label">
                  <p>
                    4. Bạn có cha mẹ, anh, chị, em ruột, con đẻ bị đái tháo
                    đường chưa?
                  </p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Đái tháo đường"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="DIABETES"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={dataOption1}
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="form-label">
                  <p>5. Bạn đã bao giờ được chẩn đoán tăng huyết áp chưa?</p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Tăng huyết áp"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="HYPERTENSION"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={dataOption1}
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="form-label">
                  <p>6. Bạn có phải là người thường xuyên vận động không?</p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Đái tháo đường"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="MOTIVE"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={dataOption2}
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="form-label">
                  <p>7. Bạn có thừa cân béo phì không?</p>
                  <ToolTip
                    Icon_infomation={Icon_infomation}
                    indexConten="Đái tháo đường"
                    description="Thông tin chi tiết"
                  />
                </div>
              }
              name="FAT"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={dataOption2}
              />
            </Form.Item>
          </Form>
        </div>
        <Row>
          <Col span={6} offset={10}>
            <Button className="btn-update-index" onClick={handleOk}>
              Xem kết quả
              <img src={icon_arrow_down} alt="" style={{ marginLeft: 20 }} />
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PrediabetesRisk;
