import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { physicalExamByQueryData } from "../../../common/getAllApi";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import ListResultHeavyToxic from "../../../components/HealthHandbooks/HeavyToxicMedicalExamination/ListResultHeavyToxic";
import BannerBot from "../../../components/home/banners/bot_banner/index.";
import { ROUTES } from "../../../constant/router";
import { useEmployee } from "../../../hooks/employee";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";
import { physicalExamType5 } from "../../../recoil/atom/physicalExamState";
const HeavyToxicMedicalExamination = () => {
  useEmployee();
  const employeeList = useRecoilValue(employeeState);
  const auth = useRecoilValue(authState);
  const itemBreadcrumb = [
    {
      label: "Khám sức khỏe nặng nhọc, độc hại",
      link: ROUTES.HEALTH_HANDBOOK.HEAVY_TOXIC_MEDICAL_EXAMINATION.path,
    },
  ];
  const employeeUser = employeeList.filter(
    (item) => item.USER_ID === auth?.profile?.id
  );
  const [physicalExamOption5, setPhysicalExamOption5] =
    useRecoilState(physicalExamType5);
  const [physicalExamOptionType5, setPhysicalExamOptionType5] = useState([]);

  // const [physicalExamOption, setPhysicalExamOption] = useState([]);

  // useEffect(() => {
  //   if (physicalExams) {
  //     const newPhyscalExam = physicalExams.filter(
  //       (item) =>
  //         item.TYPE === 5 &&
  //         item.INPUT_STATUS === 1 &&
  //         item.USER_ID === employeeUser?.[0]?.USER_ID
  //     );
  //     setPhysicalExamOption(newPhyscalExam);
  //   }
  // }, [physicalExams]);

  useEffect(() => {
    if (physicalExamOptionType5.length === 0) {
      physicalExamByQueryData(
        physicalExamOptionType5,
        setPhysicalExamOptionType5,
        {
          INPUT_STATUS: 1,
          TYPE: 5,
        }
      );
    }
  }, [physicalExamOptionType5]);

  useEffect(() => {
    if (physicalExamOptionType5) {
      setPhysicalExamOption5(
        physicalExamOptionType5.filter(
          (item) => item?.USER_ID === employeeUser?.[0]?.USER_ID
        )
      );
    }
  }, [physicalExamOptionType5, employeeList]);

  return (
    <>
      <BreadcrumbProvider item={itemBreadcrumb} />
      <div className="container-fluid page-container">
        <div className="container">
          <ListResultHeavyToxic dataSource={physicalExamOption5} />
        </div>
      </div>
      <div className="employee-health-handbook__advice">
        <p>
          <span>{auth?.profile?.LAST_NAME}</span> nhớ tự khám sức khoẻ định kỳ
          của mình nhé.
        </p>
      </div>
      <BannerBot />
    </>
    // <>
    //   <BreadcrumbProvider adrress="Khám sức khoẻ nặng nhọc, độc hại   " />
    //   <div className="container-fluid page-container">
    //     <Row justify="center" gutter={[24, 24]} className="top-content-box">
    //       <Col xs={{ span: 22 }} lg={{ span: 15 }}>
    //         <Row gutter={[24, 24]}>
    //           <Col xs={{ span: 24 }} lg={{ span: 12 }}>
    //             <Space size={32} direction="vertical">
    //               <EmployeeCode code={employeeUser[0]?.CD} />
    //               <EmployeeName
    //                 title="Kết quả khám sức khoẻ nặng nhọc, độc hại"
    //                 name={
    //                   auth?.profile?.FIRST_NAME + " " + auth?.profile?.LAST_NAME
    //                 }
    //               />
    //               <EmployeeDescription
    //                 description="Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet,
    //         consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    //               />
    //               <LabelTitleBottom content="XEM DANH SÁCH KẾT QUẢ" />
    //             </Space>
    //           </Col>
    //           <Col xs={{ span: 24 }} lg={{ span: 12 }}>
    //             <div className="right-content-box">{/* <SmallLabel /> */}</div>
    //           </Col>
    //           <div className="right-content-box">
    //             <SmallTutorial title="Hướng dẫn xem kết quả khám sức khỏe" />
    //           </div>
    //         </Row>
    //       </Col>
    //       <Col xs={{ span: 22 }} lg={{ span: 15 }}></Col>
    //     </Row>
    //   </div>
    //   <div className="container-fluid recommendedResults-wrapper  ">
    //     <ListResult physicalExam={physicalExamOption} />
    //   </div>
    //   <div className="employee-health-handbook__advice">
    //     <p>
    //       <span>{auth?.profile?.LAST_NAME}</span> nhớ tự khám sức khoẻ định kỳ
    //       của mình nhé.
    //     </p>
    //   </div>
    //   <BannerBot />
    // </>
  );
};

export default HeavyToxicMedicalExamination;
