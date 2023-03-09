import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import ListResultOccupationalDisease from "../../../components/HealthHandbooks/OccupationalDiseaseMedicalExamination/ListResultOccupationalDisease";
import BannerBot from "../../../components/home/banners/bot_banner/index.";
import { useEmployee } from "../../../hooks/employee";
import { usePhysicalExam } from "../../../hooks/physicalExam";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";

const OccupationalDiseaseMedicalExamination = () => {
  useEmployee();
  const auth = useRecoilValue(authState);
  const employeeList = useRecoilValue(employeeState);
  const employeeUser = employeeList.filter(
    (item) => item.USER_ID === auth?.profile?.id
  );
  const { physicalExams, isLoading } = usePhysicalExam();
  const [physicalExamOption, setPhysicalExamOption] = useState();
  useEffect(() => {
    if (physicalExams) {
      const newPhyscalExam = physicalExams.filter(
        (item) =>
          item.TYPE === 6 &&
          item.INPUT_STATUS === 1 &&
          item.USER_ID === employeeUser?.[0]?.USER_ID
      );
      setPhysicalExamOption(newPhyscalExam);
    }
  }, [physicalExams]);

  return (
    <>
      <BreadcrumbProvider address="Khám sức khoẻ bệnh nghề nghiệp" />
      <div className="container-fluid page-container">
        <div className="container">
          <ListResultOccupationalDisease
            dataSource={physicalExamOption}
            isLoading={isLoading}
          />
        </div>
      </div>
      {/* <BreadcrumbProvider adrress="Khám sức khoẻ bệnh nghề nghiệp   " />
      <div className="container-fluid page-container">
        <Row justify="center" gutter={[24, 24]} className="top-content-box">
          <Col xs={{ span: 22 }} lg={{ span: 15 }}>
            <Row gutter={[24, 24]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Space size={32} direction="vertical">
                  <EmployeeCode code={employeeUser[0]?.CD} />
                  <EmployeeName
                    title="Kết quả khám sức khoẻ bệnh nghề nghiệp"
                    name={
                      auth?.profile?.FIRST_NAME + " " + auth?.profile?.LAST_NAME
                    }
                  />
                  <EmployeeDescription
                    description="Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                  />
                  <LabelTitleBottom content="XEM DANH SÁCH KẾT QUẢ" />
                </Space>
              </Col>
              <div className="right-content-box">
                <SmallTutorial title="Hướng dẫn xem kết quả khám sức khỏe" />
              </div>
            </Row>
          </Col>
        </Row>
      </div>
      <div>
        <FilterList />
      </div> */}
      <div className="employee-health-handbook__advice">
        <p>
          <span>{auth?.profile?.LAST_NAME}</span> nhớ tự khám sức khoẻ định kỳ
          của mình nhé.
        </p>
      </div>
      <BannerBot />
    </>
  );
};

export default OccupationalDiseaseMedicalExamination;
