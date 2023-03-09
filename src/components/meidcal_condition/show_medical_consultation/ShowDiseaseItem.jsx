import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useMedicalConsultationDisease } from "../../../hooks/medicalConsultationDisease";
import { medicalConsultationDiseaseState } from "../../../recoil/atom/medicalConsultationDiseaseState";
import "./style.scss";

const ShowDiseaseItem = ({ diseaseItem }) => {
  useMedicalConsultationDisease();
  const medicalConsultationDiseases = useRecoilValue(
    medicalConsultationDiseaseState
  );
  const [medicalConsultationByDisease, setMedicalConsultationByDisease] =
    useState("");

  useEffect(() => {
    if (medicalConsultationDiseases || diseaseItem) {
      const data = medicalConsultationDiseases.filter(
        (item) => item.DISEASE_ID === diseaseItem?.DISEASE_ID
      );
      setMedicalConsultationByDisease(data[0]);
    }
  }, [diseaseItem]);

  const htmlContent =
    medicalConsultationByDisease?.Medical_Consultation?.CONTENT;

  return (
    <div className="disease-info-wrapper">
      {htmlContent ? (
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div>Hiện tại chưa có thông tin tư vấn về bệnh lý này.</div>
      )}
    </div>
  );
};

export default ShowDiseaseItem;
