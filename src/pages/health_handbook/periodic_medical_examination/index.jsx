import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { physicalExamByQueryData } from "../../../common/getAllApi";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import ListResultPeriodicMedical from "../../../components/HealthHandbooks/PeriodicMedicalExamination/ListResultPeriodicMedical";
import BannerBot from "../../../components/home/banners/bot_banner/index.";
import { useEmployee } from "../../../hooks/employee";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";
import { physicalExamType4 } from "../../../recoil/atom/physicalExamState";

const PeriodicMedicalExamination = () => {
  useEmployee();
  const employeeList = useRecoilValue(employeeState);
  const auth = useRecoilValue(authState);
  const employeeUser = employeeList.filter(
    (item) => item.USER_ID === auth?.profile?.id
  );
  const [physicalExamOption4, setPhysicalExamOption4] =
    useRecoilState(physicalExamType4);
  const [physicalExamOptionType5, setPhysicalExamOptionType5] = useState([]);

  useEffect(() => {
    if (physicalExamOptionType5.length === 0) {
      physicalExamByQueryData(
        physicalExamOptionType5,
        setPhysicalExamOptionType5,
        {
          INPUT_STATUS: 1,
          TYPE: 4,
        }
      );
    }
  }, [physicalExamOptionType5]);

  useEffect(() => {
    if (physicalExamOptionType5.length > 0) {
      setPhysicalExamOption4(
        physicalExamOptionType5.filter(
          (item) => item?.USER_ID === employeeUser?.[0]?.USER_ID
        )
      );
    }
  }, [physicalExamOptionType5, employeeList]);
  return (
    <>
      <BreadcrumbProvider address="Kết quả khám sức khỏe định kỳ" />
      <div className="container-fluid page-container">
        <div className="container">
          <ListResultPeriodicMedical dataSource={physicalExamOption4} />
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
  );
};

export default PeriodicMedicalExamination;
