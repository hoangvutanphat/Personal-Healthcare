import { Button, Form, Modal, Rate, Row, Typography } from "antd";
import React from "react";
import { useMedicalFacilityRating } from "../../../hooks/medicalFacilityRating";

const ModalRate = ({ isOpen, handleCancel, title, type, id }) => {
  const { createMedicalFacilityRating, getAllMedicalFacilitieRatings } =
    useMedicalFacilityRating();
  const [form] = Form.useForm();

  const handleOK = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const result = {
      ...newData,
      TYPE: type,
      MEDICAL_FACILITY_ID: id,
      NOTE: "rating",
    };
    handleCreate(result);
    getAllMedicalFacilitieRatings();
    handleCancel();
  };
  const handleCreate = async (value) => {
    await createMedicalFacilityRating(value);
  };
  return (
    <Modal visible={isOpen} open={false} footer={false} onCancel={handleCancel}>
      <Form form={form} name="rate">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Title level={5}>{title}</Typography.Title>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item name="RATING">
            <Rate />
          </Form.Item>
        </Row>

        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" onClick={handleCancel}>
            Quay lại
          </Button>
          <Button type="primary" onClick={handleOK}>
            Đánh giá
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalRate;
