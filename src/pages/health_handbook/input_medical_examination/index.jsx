import { Col, Row, Space } from "antd";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import EmployeeCode from "../../../components/globals/EmployeeCode";
import EmployeeDescription from "../../../components/globals/EmployeeDescription";
import SmallLabel from "../../../components/globals/EmployeeInformation/SmallLabel";
import EmployeeName from "../../../components/globals/EmployeeName";
import { authState } from "../../../recoil/atom/authState";
import { latestPhysicalExamInputState } from "../../../recoil/atom/physicalExamState";
import InputMedicalExam from "../../../components/HealthHandbooks/InputMedicalExamination/InputMedicalExamination";
import {
  authData,
  latestPhysicalExamInputData,
} from "../../../common/getAllApi";
import { LoadingOutlined } from "@ant-design/icons";

const InputMedicalExamination = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [physicalExamByUser, setPhysicalExamByUser] = useRecoilState(
    latestPhysicalExamInputState
  );

  useEffect(() => {
    if (Object.getOwnPropertyNames(auth).length === 0) {
      authData(auth, setAuth);
    }
  }, [auth]);

  useEffect(() => {
    latestPhysicalExamInputData(physicalExamByUser, setPhysicalExamByUser, {
      INPUT_STATUS: 1,
      TYPE: 3,
      USER_ID: auth?.profile?.id,
    });
  }, []);

  const FULL_NAME = auth?.profile?.FIRST_NAME + " " + auth?.profile?.LAST_NAME;

  return (
    <>
      <BreadcrumbProvider address="Khám sức khoẻ đầu vào" />
      <div className="container-fluid page-container">
        <Row justify="center" gutter={[0, 24]} className=" top-content-box">
          <Col xs={{ span: 22 }} lg={{ span: 15 }}>
            <Space size={32} direction="vertical">
              <EmployeeName
                title="Kết quả khám sức khoẻ đầu vào"
                name={FULL_NAME}
              />
              <EmployeeCode
                avatar={auth?.profile?.AVATAR}
                code={
                  auth ? auth?.profile?.Employees[0]?.CD : <LoadingOutlined />
                }
              />
              <EmployeeDescription
                description="Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
              />
            </Space>
          </Col>
          {/* <Col xs={{ span: 22 }} lg={{ span: 15 }}>
            <ShowInputMedicalDetailsPDF dataViewPDF={physicalExamByUser} />
          </Col> */}
        </Row>
        <Row justify="center" gutter={[0, 24]}>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <div className="right-content-box">
              <SmallLabel employeeInfo={physicalExamByUser[0]} />
            </div>
          </Col>
        </Row>
        <Row justify={{ xs: "center", lg: "center" }}>
          <Col xs={{ span: 22 }} lg={{ span: 15 }}>
            <InputMedicalExam dataViewPDF={physicalExamByUser[0]} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InputMedicalExamination;
