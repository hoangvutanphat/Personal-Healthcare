import React from "react";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import CheckBMI from "../../../components/HealthSelfExamination/SelfCheckBMI";

const SelfCheckBMI = () => {
  return (
    <div>
      <BreadcrumbProvider address="Tự kiểm tra sức khỏe bằng BMI" />
      <div className="container-fluid page-container">
        <div className="container">
          <CheckBMI />
        </div>
      </div>
    </div>
  );
};

export default SelfCheckBMI;
