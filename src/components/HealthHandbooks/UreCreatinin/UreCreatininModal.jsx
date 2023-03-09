import React, { useEffect } from "react";
import { Button, Modal, Input, Form, DatePicker, Row, Col } from "antd";
import Icon_infomation from "../../../assets/images/icon_infomation.svg";
import "./style.scss";
import ToolTip from "../../globals/Tooltip";
import { dateFormat, disabledDate } from "../../../common";
import { useAuth } from "../../../hooks/auth";
import { useUreCreatine } from "../../../hooks/ureCreatine";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atom/authState";
import { SelfSpecialPhysicalExamByUserState } from "../../../recoil/atom/physicalExamState";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import physicalExamApi from "../../../api/physicalExamApi";
import { selfSpecialPhycalExamByUserData } from "../../../common/getAllApi";

const validateMessages = {
  required: "Trường này không được để trống",
};

const UreCreatininModal = ({ isOpenModal, onCancel, onOk, title }) => {
  useAuth();
  const [form] = Form.useForm();
  const { createUreCreatine } = useUreCreatine();
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
    const {
      MEDICAL_FACILITY_USER_INPUT,
      EXAM_DATE,
      UREA_RESULT,
      CREATINE_RESULT,
    } = newData;

    if (
      MEDICAL_FACILITY_USER_INPUT === undefined ||
      MEDICAL_FACILITY_USER_INPUT === null ||
      EXAM_DATE === undefined ||
      EXAM_DATE === null ||
      UREA_RESULT === undefined ||
      UREA_RESULT === null ||
      CREATINE_RESULT === null ||
      CREATINE_RESULT === undefined ||
      UREA_RESULT.trim() === "" ||
      MEDICAL_FACILITY_USER_INPUT.trim() === "" ||
      CREATINE_RESULT.trim() === ""
    ) {
      return;
    }

    if (SelfSpecialPhysicalExamByUser?.id) {
      if (SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id) {
        handleCreateUreCreatine({
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
            handleCreateUreCreatine({
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
            const preData = {
              PHYSICAL_EXAM_ID: physicalExam?.data?.elements?.id,
            };
            let preClinical =
              await preclinicalDetailApi.createPreclinicalDetail(preData);
            if (preClinical.data) {
              handleCreateUreCreatine({
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
  const handleCreateUreCreatine = async (data) => {
    await createUreCreatine(data);
    handleCancel();
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <>
      <Modal
        width={489}
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={false}
        className='modal-container'
      >
        <Form
          name="ureCreatine"
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
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập tên cơ sở khám..." />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Thời gian xét nghiệm</p>
              </div>
            }
            name="EXAM_DATE"
          >
            {/* <div className="input-modal"> */}
            <DatePicker
              style={{ width: "100%" }}
              format={dateFormat}
              disabledDate={disabledDate}
            />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số Ure</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số Ure"
                  description="Ure là sản phẩm cuối cùng của quá trình chuyển hóa chất đạm (hay còn gọi là protein) trong cơ thể và được thận đào thải ra ngoài. Giá trị bình thường của chỉ số ure máu là khoảng 2.5 – 7.5 mmol/l. Ure là chất tương đối ít độc, ngay cả khi lượng ure trong máu cao"
                />
              </div>
            }
            name="UREA_RESULT"
          >
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập chỉ số..." />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số Creatinin</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số Creatinin"
                  description="Creatinin - Sản phẩm của sự thoái hóa creatin trong các cơ, được đào thải qua thận và là chỉ số phản ánh chính xác chức năng của thận. Creatin đóng vai trò quan trọng cho việc sinh ra nguồn năng lượng cho các cơ hoạt động, creatin bị thoái dáng trong các cơ sẽ tạo thành creatinin và được lọc qua cầu thận."
                />
              </div>
            }
            name="CREATINE_RESULT"
          >
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập chỉ số..." />
            {/* </div> */}
          </Form.Item>
          <Row>
            <Col offset={9}>
              <Form.Item>
                <Button
                  form="ureCreatine"
                  key="ureCreatine"
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
export default UreCreatininModal;
