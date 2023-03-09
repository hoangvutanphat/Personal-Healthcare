import React, { useEffect } from "react";
import { Modal, Input, Form, Button, DatePicker, Row, Col } from "antd";
import Icon_infomation from "../../../assets/images/icon_infomation.svg";
import "./bloodPressureModal.scss";
import ToolTip from "../../globals/Tooltip";
import { useLiverEnzyme } from "../../../hooks/liverEnzyme";
import { authState } from "../../../recoil/atom/authState";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelfSpecialPhysicalExamByUserState } from "../../../recoil/atom/physicalExamState";
import physicalExamApi from "../../../api/physicalExamApi";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import { dateFormat, disabledDate } from "../../../common";
import { selfSpecialPhycalExamByUserData } from "../../../common/getAllApi";

const validateMessages = {
  required: "Trường này không được để trống!",
};

const LiverEnzymeModal = ({ isOpenModal, onCancel, onOk, title }) => {
  const [form] = Form.useForm();
  const { createLiverEnzyme } = useLiverEnzyme();
  const { profile } = useRecoilValue(authState);

  const [SelfSpecialPhysicalExamByUser, setSelfSpecialPhysicalExamByUser] =
    useRecoilState(SelfSpecialPhysicalExamByUserState);

  useEffect(() => {
    selfSpecialPhycalExamByUserData(
      SelfSpecialPhysicalExamByUser,
      setSelfSpecialPhysicalExamByUser
    );
  }, []);

  const onFinish = async () => {
    const newValue = { ...form.getFieldValue() };
    const {
      EXAM_DATE,
      MEDICAL_FACILITY_USER_INPUT,
      SGPT_ALT_RESULT,
      SGOT_AST_RESULT,
    } = newValue;
    if (
      EXAM_DATE === undefined ||
      EXAM_DATE === null ||
      MEDICAL_FACILITY_USER_INPUT === undefined ||
      MEDICAL_FACILITY_USER_INPUT === null ||
      SGPT_ALT_RESULT === undefined ||
      SGPT_ALT_RESULT === null ||
      SGOT_AST_RESULT === undefined ||
      SGOT_AST_RESULT === null ||
      MEDICAL_FACILITY_USER_INPUT.trim() === "" ||
      SGPT_ALT_RESULT.trim() === "" ||
      SGOT_AST_RESULT.trim() === ""
    ) {
      return;
    }

    if (SelfSpecialPhysicalExamByUser?.id) {
      if (SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id) {
        handleCreateLiverEnzyme({
          ...newValue,
          PRECLINICAL_DETAIL_ID:
            SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id,
        });
      } else {
        const data = {
          PHYSICAL_EXAM_ID: SelfSpecialPhysicalExamByUser?.id,
        };
        try {
          let res = await preclinicalDetailApi.createPreclinicalDetail(data);
          if (res.data) {
            handleCreateLiverEnzyme({
              ...newValue,
              PRECLINICAL_DETAIL_ID: res?.data?.elements?.id,
            });
          }
        } catch (error) {
          console.log("error");
        }
      }
    } else {
      try {
        const data = {
          USER_ID: profile?.id,
          TYPE: 8,
          INPUT_STATUS: 1,
        };
        let physicalExam = await physicalExamApi.createPhysicalExam(data);
        if (physicalExam.data) {
          try {
            const preData = {
              PHYSICAL_EXAM_ID: physicalExam?.data?.elements?.id,
            };
            let preclinical =
              await preclinicalDetailApi.createPreclinicalDetail(preData);
            if (preclinical.data) {
              handleCreateLiverEnzyme({
                ...newValue,
                PRECLINICAL_DETAIL_ID: preclinical?.data?.elements?.id,
              });
            }
          } catch (error) {
            console.log("error");
          }
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  const handleCreateLiverEnzyme = async (data) => {
    await createLiverEnzyme(data);
    handleCancel();
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={false}
        className='modal-container'
      >
        <Form
          name="liverEnzyme"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            label={
              <div className="form-label">
                <p>Cơ sở khám</p>
              </div>
            }
            name="MEDICAL_FACILITY_USER_INPUT"
          >
            <Input placeholder="Nhập tên cơ sở khám ..." />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Thời gian đo</p>
              </div>
            }
            name="EXAM_DATE"
          >
            <DatePicker
              style={{ width: "100%" }}
              format={dateFormat}
              disabledDate={disabledDate}
              placeholder="Nhập thời gian xét nghiệm ..."
            />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>SGPT/ALT</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="SGPT/ALT"
                  description="ALT (SGPT) hay Alanine aminotransferase được biết đến là 1 loại enzyme đặc trưng được tìm thấy đa số trong các tế bào gan, một số lượng ít tại thận, tim, cơ xương."
                />
              </div>
            }
            name="SGPT_ALT_RESULT"
          >
            <Input placeholder="Nhập chỉ số SGPT ..." />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>SGOT/AST</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="SGOT/AST"
                  description="AST là loại enzyme được tìm thấy chủ yếu ở các tế bào của gan và thận, một lượng nhỏ hơn của nó cũng được tìm thấy trong cơ tim và cơ xương. Chỉ số AST cao có thể báo hiệu tổn thương tế bào gan, cũng có thể là dấu hiệu tổn thương các cơ quan khác như tim hay thận. "
                />
              </div>
            }
            name="SGOT_AST_RESULT"
          >
            <Input placeholder="Nhập chỉ số SGOT ..." />
          </Form.Item>
          <Row>
            <Col offset={9}>
              <Form.Item>
                <Button
                  form="liverEnzyme"
                  key="liverEnzyme"
                  htmlType="submit"
                  className="btn-update-index"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default LiverEnzymeModal;
