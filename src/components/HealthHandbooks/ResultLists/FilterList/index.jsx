import { Col, DatePicker, Form, Row, Select, Space, Button } from "antd";
import React from "react";
import "./style.scss";
import { useRecoilValue } from "recoil";
import { useMedicalFacility } from "../../../../hooks/medicalFacility";
import { medicalFacilityOptionsState } from "../../../../recoil/atom/medicalFacilityState";
import ItemList from "../ItemList";

const FilterList = (
  date,
  medicalFacility,
  background,
  isHidden,
  medicalName
) => {
  useMedicalFacility();
  const medicalFacilityOptions = useRecoilValue(medicalFacilityOptionsState);
  const [form] = Form.useForm();

  const specialDiseaseType = [
    { value: 0, label: "Bệnh Điếc nghề nghiệp do tiếng ồn" },
    { value: 1, label: "Bệnh Viêm phế quản mãn tính nghề nghiệp" },
    { value: 2, label: "Bệnh Hen phế quản nghề nghiệp" },
    { value: 3, label: "Bệnh Bụi phổi silic nghề nghiệp" },
    { value: 4, label: "Bệnh nghề nghiệp khác 1" },
    { value: 5, label: "Bệnh nghề nghiệp khác 2" },
  ];

  return (
    <Form
      form={form}
      name="hardtoxic"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
    >
      <div className="wrapper-list">
        <div className="wrapper-list-h1">
          <h1>Danh sách các kết quả khám sức khỏe</h1>
        </div>
        <div className="wrapper-list-filter">
          <Form layout="vertical" className="form">
            <Row>
              <div className="title-h6">
                <h6>Bộ lọc từ kết quả</h6>
              </div>
            </Row>
            <Row style={{ paddingTop: "16px" }} className="row2">
              <Col span={4}>
                <Form.Item
                  style={{ width: "100%" }}
                  label="Từ ngày"
                  wrapperCol={{ span: 24 }}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Đến ngày">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="SPECIAL_DISEASE_TYPE" label="Bệnh nghề nghiệp">
                  <Select options={specialDiseaseType} allowClear />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="MEDICAL_FACILITY_ID" label="Cơ sở khám">
                  <Select options={medicalFacilityOptions} allowClear />
                </Form.Item>
              </Col>
              <Col>
                <Button className="btn-filter">Lọc</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <ItemList />
        </div>
      </div>
    </Form>
  );
};

export default FilterList;
