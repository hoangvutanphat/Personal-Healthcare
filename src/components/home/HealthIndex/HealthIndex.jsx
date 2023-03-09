import React, { useEffect, useState } from "react";
import IndexOption from "../IndexOption/IndexOption";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import RecommendedResults from "../RecommendedResults/RecommendedResults";
import { useRecoilState } from "recoil";
import {
  axitUricByUserState,
  bloodPressureByUserState,
  BMIByUserState,
  glucoseByUserState,
  lipidBloodByUserState,
  liverEnzymeByUserState,
  ureCreatineByUserState,
} from "../../../recoil/atom/healthIndexState";
import {
  axitUricData,
  bloodLipidData,
  bloodpressureData,
  BMIData,
  glucoseData,
  liverEnzymeData,
  ureCreatininData,
} from "../../../common/getAllHealthIndexApi";
import {
  recommendedAxitUricState,
  recommendedBloodLipidState,
  recommendedBloodPressuresState,
  recommendedBMIState,
  recommendedDataState,
  recommendedGlucoseState,
  recommendedLiverEnzymeState,
  recommendedUreCreatininState,
} from "../../../recoil/atom/recommendedIndexState";
import {
  recommendedBloodPressureByQueryData,
  recommendedBloodPressuresData,
} from "../../../common/getAllApi";

const HealthIndex = () => {
  const [bloodPressuresByUserId, setBloodPressuresByUserId] = useRecoilState(
    bloodPressureByUserState
  );
  const [glucosesByUserId, setGlucosesByUserId] =
    useRecoilState(glucoseByUserState);
  const [liverEnzymesByUserId, setLiverEnzymesByUserId] = useRecoilState(
    liverEnzymeByUserState
  );
  const [ureCreatinesByUserId, setUreCreatinesByUserId] = useRecoilState(
    ureCreatineByUserState
  );
  const [bloodLipidsByUserId, setBloodLipidsByUserId] = useRecoilState(
    lipidBloodByUserState
  );
  const [axitUricsByUserId, setAxitUricsByUserId] =
    useRecoilState(axitUricByUserState);
  const [BMIByUserId, setBMIByUserId] = useRecoilState(BMIByUserState);

  const [bloodPressureLast, setBloodPressureLast] = useState(undefined);
  const [glucoseLast, setGlucoseLast] = useState(undefined);
  const [liverEnzymeLast, setLiverEnzymeLast] = useState(undefined);
  const [ureCreatininLast, setUreCreatininLast] = useState(undefined);
  const [bloodLipidLast, setBloodLipidLast] = useState(undefined);
  const [BMILast, setBMILast] = useState(undefined);
  const [axitUricLast, setAxitUricLast] = useState(undefined);

  const [recommendedData, setRecommendedData] =
    useRecoilState(recommendedDataState);

  const [recommendedBloodPressure, setRecommendedBloodPressure] =
    useRecoilState(recommendedBloodPressuresState);

  const [recommendedGlucose, setRecommendedGlucose] = useRecoilState(
    recommendedGlucoseState
  );

  const [recommendedLiverEnzyme, setRecommendedLiverEnzyme] = useRecoilState(
    recommendedLiverEnzymeState
  );

  const [recommendedUreCreatinin, setRecommendedUreCreatinin] = useRecoilState(
    recommendedUreCreatininState
  );

  const [recommendedAxitUric, setRecommendedAxitUric] = useRecoilState(
    recommendedAxitUricState
  );

  const [recommendedBloodLipid, setRecommendedBloodLipid] = useRecoilState(
    recommendedBloodLipidState
  );

  const [recommendedBMI, setRecommendedBMI] =
    useRecoilState(recommendedBMIState);

  useEffect(() => {
    bloodpressureData(bloodPressuresByUserId, setBloodPressuresByUserId);
    glucoseData(glucosesByUserId, setGlucosesByUserId);
    liverEnzymeData(liverEnzymesByUserId, setLiverEnzymesByUserId);
    ureCreatininData(ureCreatinesByUserId, setUreCreatinesByUserId);
    bloodLipidData(bloodLipidsByUserId, setBloodLipidsByUserId);
    axitUricData(axitUricsByUserId, setAxitUricsByUserId);
    BMIData(BMIByUserId, setBMIByUserId);
  }, []);

  useEffect(() => {
    if (bloodPressuresByUserId) {
      setBloodPressureLast(
        bloodPressuresByUserId[bloodPressuresByUserId.length - 1]
      );
    }
  }, [bloodPressuresByUserId]);

  useEffect(() => {
    if (bloodPressureLast) {
      recommendedBloodPressureByQueryData(
        recommendedBloodPressure,
        setRecommendedBloodPressure,
        {
          TYPE: 1,
          SYSTOLIC: bloodPressureLast?.SYSTOLIC,
          DIASTOLE: bloodPressureLast?.DIASTOLE,
        }
      );
    }
  }, [bloodPressureLast]);

  useEffect(() => {
    if (glucosesByUserId) {
      setGlucoseLast(glucosesByUserId[glucosesByUserId.length - 1]);
    }
  }, [glucosesByUserId]);

  useEffect(() => {
    if (liverEnzymesByUserId) {
      setLiverEnzymeLast(liverEnzymesByUserId[liverEnzymesByUserId.length - 1]);
    }
  }, [liverEnzymesByUserId]);

  useEffect(() => {
    if (ureCreatinesByUserId) {
      setUreCreatininLast(
        ureCreatinesByUserId[ureCreatinesByUserId.length - 1]
      );
    }
  }, [ureCreatinesByUserId]);

  useEffect(() => {
    if (bloodLipidsByUserId) {
      setBloodLipidLast(bloodLipidsByUserId[bloodLipidsByUserId.length - 1]);
    }
  }, [bloodLipidsByUserId]);

  useEffect(() => {
    if (axitUricsByUserId) {
      setAxitUricLast(axitUricsByUserId[axitUricsByUserId.length - 1]);
    }
  }, [axitUricsByUserId]);

  useEffect(() => {
    if (BMIByUserId) {
      setBMILast(BMIByUserId[BMIByUserId.length - 1]);
    }
  }, [BMIByUserId]);

  useEffect(() => {
    setRecommendedData([{ ...recommendedBloodPressure, NAME: "Huyết áp" }]);
  }, [recommendedBloodPressure]);

  return (
    <div className="healthIndex-container">
      <div className="healthIndex-Info">
        <h1 className="healthIndex-Info__title">
          Các chỉ số sức khoẻ quan trọng
        </h1>
        <p className="healthIndex-Info__content">
          Tại Ajinomoto, sức khoẻ của nhân viên là chìa khoá quan trọng trong
          bước tiến của tập đoàn. Cùng khám phá chỉ số sức khoẻ quan trọng củ
          bạn theo biểu đồ bên dưới.
        </p>
        <div className="indexInfo-container">
          <IndexOption
            title="Chỉ số BMI"
            title1="BMI"
            value={`${BMILast?.BMI_INDEX}`}
            // percent="80%"
          />
          <IndexOption
            title="Huyết áp"
            title1="Blood"
            value={`${bloodPressureLast?.SYSTOLIC?.toFixed()}/${bloodPressureLast?.DIASTOLE?.toFixed()}`}
            // percent="80%"
          />
          <IndexOption
            title="Chỉ số đường huyết"
            title1="Glucose"
            title2="Glucose_1"
            title3="Glucose_2"
            title4="Glucose_3"
            title5="HBAC1"
            value={`${glucoseLast?.GLUCOSE_HUNGRY}`}
            value1={`${glucoseLast?.GLUCOSE_1}`}
            value2={`${glucoseLast?.GLUCOSE_2}`}
            value3={`${glucoseLast?.GLUCOSE_3}`}
            value4={`${glucoseLast?.HBAC1}`}
            // percent="80%"
          />
          <IndexOption
            title="Axit Uric"
            title1="Axit"
            value={axitUricLast?.AXIT_URIC_RESULT}
            // percent="80%"
          />
          <IndexOption
            title="Chỉ số Ure & Creatinin"
            title1="Ure"
            title2="Creatinin"
            value={`${ureCreatininLast?.UREA_RESULT}`}
            value1={`${ureCreatininLast?.CREATINE_RESULT}`}
            // percent="80%"
          />
          <IndexOption
            title="Chỉ số Choles & Triglycerid"
            title1="Choles"
            title2="HDL"
            title3="LDL"
            title4="Trig"
            value={`${bloodLipidLast?.CHOLESTEROL_RESULT}`}
            value1={`${bloodLipidLast?.HDL_RESULT}`}
            value2={`${bloodLipidLast?.LDL_RESULT}`}
            value3={`${bloodLipidLast?.TRIGLYCERIDE_RESULT}`}
            // percent="80%"
          />
          <IndexOption
            title="Chỉ số men gan"
            title1="SGOT/AST"
            title2="SGPT/ALT"
            value={`${liverEnzymeLast?.SGOT_AST_RESULT}`}
            value1={`${liverEnzymeLast?.SGPT_ALT_RESULT}`}
            // percent="80%"
          />
        </div>
        <p className="healthIndex-Info__note">
          <ExclamationCircleOutlined
            style={{ marginRight: 12, color: "#3FA641" }}
          />
          Tất cả thông tin được tổng hợp dựa trên số liệu thu thập của người
          dùng.
        </p>
      </div>
      <RecommendedResults />
    </div>
  );
};

export default HealthIndex;
