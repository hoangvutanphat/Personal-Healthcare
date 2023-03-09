import React, { useEffect } from "react";
import { Modal, Input, Form, DatePicker, Row, Col, Button } from "antd";
import Icon_infomation from "../../../assets/images/icon_infomation.svg";
import "./axitUricModal.scss";
import ToolTip from "../../globals/Tooltip";
import { dateFormat, disabledDate } from "../../../common";
import { authState } from "../../../recoil/atom/authState";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelfSpecialPhysicalExamByUserState } from "../../../recoil/atom/physicalExamState";
import { useAxitUric } from "../../../hooks/axitUric";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import physicalExamApi from "../../../api/physicalExamApi";
import NumericInput from "../../globals/NumericInput/NumericInput";
import { selfSpecialPhycalExamByUserData } from "../../../common/getAllApi";

const validateMessages = {
  required: "Trường này không được để trống!",
};

const BloodPressureModal = ({ isOpenModal, onCancel, title }) => {
  const [form] = Form.useForm();
  const { createAxitUric } = useAxitUric();
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
    const newData = { ...form.getFieldValue() };
    const { MEDICAL_FACILITY_USER_INPUT, EXAM_DATE, AXIT_URIC_RESULT } =
      newData;
    if (
      MEDICAL_FACILITY_USER_INPUT === undefined ||
      MEDICAL_FACILITY_USER_INPUT === null ||
      EXAM_DATE === undefined ||
      EXAM_DATE === null ||
      AXIT_URIC_RESULT === undefined ||
      AXIT_URIC_RESULT === null ||
      MEDICAL_FACILITY_USER_INPUT.trim() === "" ||
      AXIT_URIC_RESULT.trim() === ""
    ) {
      return;
    }

    if (SelfSpecialPhysicalExamByUser?.id) {
      if (SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id) {
        handleCreateAxitUric({
          ...newData,
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
            handleCreateAxitUric({
              ...newData,
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
            const dataPre = {
              PHYSICAL_EXAM_ID: physicalExam?.Physical?.elements?.id,
            };
            let preClinical =
              await preclinicalDetailApi.createPreclinicalDetail(dataPre);
            if (preClinical.data) {
              handleCreateAxitUric({
                ...newData,
                PRECLINICAL_DETAIL_ID: preClinical?.data?.elements?.id,
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
  const handleCreateAxitUric = async (data) => {
    await createAxitUric(data);
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
          name="axitUric"
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
            <Input placeholder="Nhập tên cơ sở khám..." />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Thời gian xét nghiệm</p>
              </div>
            }
            name="EXAM_DATE"
          >
            <DatePicker
              style={{ width: "100%" }}
              format={dateFormat}
              disabledDate={disabledDate}
              placeholder="Nhập tên thời gian xét nghiệm..."
            />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số Axit Uric</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số Axit Uric"
                  description="Acid uric là một sản phẩm của quá trình chuyển hóa tự nhiên của các base purin trong cơ thể. Khi tế bào chết đi, Acid uric nội sinh là sản phẩm chuyển hóa của chất đạm có nhân purin (adenine và guadinine của các acid nucleic). Acid uric ngoại sinh đến từ các chất đạm có nhân purin được tìm thấy nhiều trong một số loại thực phẩm và đồ uống như phủ tạng động vật, cá biển, đậu Hà Lan, bia, rượu..."
                />
              </div>
            }
            name="AXIT_URIC_RESULT"
          >
            {/* <Input placeholder="Nhập chỉ số (umol/L)..." /> */}
            <NumericInput placeholder="Nhập chỉ số (umol/L)..." />
          </Form.Item>
          <Row>
            <Col offset={9}>
              <Form.Item>
                <Button
                  form="axitUric"
                  key="axitUric"
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
export default BloodPressureModal;
