import React, { useEffect, useState } from "react";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import BannerBot from "../../../components/home/banners/bot_banner/index.";
import "./emp_health_handbook.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import icon_arrowNext from "../../../assets/images/arrowNext.svg";
import { authState } from "../../../recoil/atom/authState";
import { useRecoilState } from "recoil";
import RecommendedResults from "../../../components/home/RecommendedResults/RecommendedResults";
import LabelTitleBottom from "../../../components/LabelTitles/LabelTitleBottom";
import Chart from "../../../components/charts/lipid_chart";
import ItemIndex from "../../../components/ItemIndex/ItemIndex";
import { ROUTES } from "../../../constant/router";
import EmployeeCode from "../../../components/globals/EmployeeCode";
import EmployeeName from "../../../components/globals/EmployeeName";
import EmployeeDescription from "../../../components/globals/EmployeeDescription";
import { employeeState } from "../../../recoil/atom/employeeState";
import {
  authData,
  employeeData,
  recommendedBloodPressuresData,
} from "../../../common/getAllApi";
import { physicalExamLastestState } from "../../../recoil/atom/physicalExamState";
import {
  axitUricData,
  bloodLipidData,
  bloodpressureData,
  glucoseData,
  liverEnzymeData,
  ureCreatininData,
} from "../../../common/getAllHealthIndexApi";
import {
  axitUricByUserState,
  bloodPressureByUserState,
  glucoseByUserState,
  lipidBloodByUserState,
  liverEnzymeByUserState,
  ureCreatineByUserState,
} from "../../../recoil/atom/healthIndexState";
import { Row, Col } from "antd";
import { recommendedBloodPressuresState } from "../../../recoil/atom/recommendedIndexState";

const itemBreadcrumb = [
  {
    label: "Thông tin sức khoẻ nhân viên",
    link: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.path,
  },
];
const EmployeeHealthInfo = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [employeeList, setEmployeeList] = useRecoilState(employeeState);
  const [physicalExamLastest, setPhysicalExamLastest] = useRecoilState(
    physicalExamLastestState
  );

  const [isShow, setIsShow] = useState(true);
  const [bloodPresure, setBloodPresure] = useState();
  const [glucose, setGlucose] = useState();
  const [liverEnzymes, setLiverEnzymes] = useState();
  const [bloodLipit, setBloodLipit] = useState();
  const [axitUric, setAxitUric] = useState();
  const [ureaCreatine, setUreaCreatine] = useState();

  const employeeUser = employeeList.filter(
    (item) => item.USER_ID === auth?.profile?.id
  );
  useEffect(() => {
    if (Object.getOwnPropertyNames(auth).length === 0) {
      authData(auth, setAuth);
    }
  }, [auth]);

  useEffect(() => {
    employeeData(employeeList, setEmployeeList);
  }, []);

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
  const [recommendedBloodPressure, setRecommendedBloodPressure] =
    useRecoilState(recommendedBloodPressuresState);

  useEffect(() => {
    bloodpressureData(bloodPressuresByUserId, setBloodPressuresByUserId);
    glucoseData(glucosesByUserId, setGlucosesByUserId);
    liverEnzymeData(liverEnzymesByUserId, setLiverEnzymesByUserId);
    ureCreatininData(ureCreatinesByUserId, setUreCreatinesByUserId);
    bloodLipidData(bloodLipidsByUserId, setBloodLipidsByUserId);
    axitUricData(axitUricsByUserId, setAxitUricsByUserId);
    recommendedBloodPressuresData(
      recommendedBloodPressure,
      setRecommendedBloodPressure
    );
  }, []);

  useEffect(() => {
    if (bloodPressuresByUserId) {
      setBloodPresure(
        bloodPressuresByUserId[bloodPressuresByUserId.length - 1]
      );
    }
  }, [bloodPressuresByUserId]);

  useEffect(() => {
    if (glucosesByUserId) {
      setGlucose(glucosesByUserId[glucosesByUserId.length - 1]);
    }
  }, [glucosesByUserId]);

  useEffect(() => {
    if (liverEnzymesByUserId) {
      setLiverEnzymes(liverEnzymesByUserId[liverEnzymesByUserId.length - 1]);
    }
  }, [liverEnzymesByUserId]);

  useEffect(() => {
    if (ureCreatinesByUserId) {
      setUreaCreatine(ureCreatinesByUserId[ureCreatinesByUserId.length - 1]);
    }
  }, [ureCreatinesByUserId]);

  useEffect(() => {
    if (bloodLipidsByUserId) {
      setBloodLipit(bloodLipidsByUserId[bloodLipidsByUserId.length - 1]);
    }
  }, [bloodLipidsByUserId]);

  useEffect(() => {
    if (axitUricsByUserId) {
      setAxitUric(axitUricsByUserId[axitUricsByUserId.length - 1]);
    }
  }, [axitUricsByUserId]);

  return (
    <div className="container-wrapper employee-health-handbook">
      <BreadcrumbProvider item={itemBreadcrumb} />
      <Row justify="center" gutter={[0, 24]} className="employee-health-info">
        <Col xs={{ span: 22 }} lg={{ span: 15 }}>
          <Row gutter={[0, 24]}>
            <Col
              xs={{ span: 22 }}
              lg={{ span: 12 }}
              style={{ paddingRight: 40 }}
            >
              <EmployeeName
                title="Hồ sơ sức khoẻ cá nhân"
                name={
                  auth?.profile?.FIRST_NAME + " " + auth?.profile?.LAST_NAME
                }
              />
              <EmployeeDescription
                description="Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet,
                     consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
              />
              <EmployeeCode
                avatar={auth?.profile?.AVATAR}
                code={employeeUser[0]?.CD}
              />
              <LabelTitleBottom
                content="XEM FILE PDF"
                Icon_arrow={icon_arrowNext}
                route={
                  ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
                    .PDF_FILE_EXPORT.path
                }
              />
            </Col>
            <Col xs={{ span: 22 }} lg={{ span: 12 }}>
              <Chart />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="employee-health-handbook__healtHandbook">
        {/* <div className="container-fluid">
          <div className="container health-container ">
            <div className="health-handbook-container">
              <div className="health-handbook">
                <EmployeeCode
                  avatar={auth?.profile?.AVATAR}
                  code={employeeUser[0]?.CD}
                />
                <div className="health-handbook__content">
                  <EmployeeName
                    title="Hồ sơ sức khoẻ cá nhân"
                    name={
                      auth?.profile?.FIRST_NAME + " " + auth?.profile?.LAST_NAME
                    }
                  />
                  <EmployeeDescription
                    description="Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet,
                     consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                  />
                </div>
              </div>
              <Chart />
            </div>
          </div>
        </div> */}
        <div className="container-fluid healthIndex-wrapper">
          <div className="container">
            {/* <div className="btn-bottom">
              <LabelTitleBottom
                content="XEM FILE PDF"
                Icon_arrow={icon_arrowNext}
                route={
                  ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
                    .PDF_FILE_EXPORT.path
                }
              />
            </div> */}
            <div className="healthIndex-container">
              <div className="healthIndex-Info">
                <h1 className="healthIndex-Info__title">
                  Các chỉ số sức khoẻ quan trọng
                </h1>
                <p className="healthIndex-Info__content">
                  Tại Ajinomoto, sức khoẻ của nhân viên là chìa khoá quan trọng
                  trong bước tiến của tập đoàn. Cùng khám phá chỉ số sức khoẻ
                  quan trọng củ bạn theo biểu đồ bên dưới.
                </p>
                <div className="indexInfo-container">
                  <ItemIndex
                    name_index="Huyết áp"
                    unit_index="nmol/L"
                    tooltip="Huyết áp là áp lực của mạch máu lên thành động mạch. Huyết áp thì bằng cung lượng tim nhân với sức cản ngoại vi từ công thức này ta có thể biết được những yếu tố làm tăng giảm huyết áp.
                    Bình thường khi đo huyết áp có 2 chỉ số: số cao hơn là huyết áp tâm thu hay áp lực của máu lên động mạch khi tim co bóp, Chỉ số còn lại là huyết áp tâm trương hay áp lực máu lên thành động mạch khi tim giãn ra."
                    indexConten="Huyết áp"
                    value={`${bloodPresure?.SYSTOLIC?.toFixed()}/${bloodPresure?.DIASTOLE?.toFixed()}`}
                  />
                  <ItemIndex
                    name_index="Đường huyết"
                    unit_index="nmol/L"
                    tooltip="Chỉ số đường huyết viết tắt là GI (glycemic index) được định nghĩa là giá trị chỉ nồng độ glucose có trong máu thường được đo bằng đơn vị là mmol/l hoặc mg/dl. Nồng độ glucose trong máu liên tục thay đổi từng ngày thậm chí từng phút đặc biệt liên quan đến chế độ ăn uống sinh hoạt hàng ngày."
                    indexConten="Đường huyết"
                    value={glucose?.GLUCOSE_HUNGRY}
                  />
                  <ItemIndex
                    name_index="Men gan"
                    unit_index="U/L"
                    tooltip="Trong gan có hệ thống các enzyme rất hoàn chỉnh bao gồm: AST, ALT, GGT,… có chức năng hỗ trợ gan lọc bỏ độc tố, giúp hoàn thiện, tổng hợp và chuyển hóa các chất như bao gồm: lipid, gluxit, protid…, các enzyme này được gọi chung là men gan."
                    indexConten="Men gan"
                    value={liverEnzymes?.SGOT_AST_RESULT}
                    // value1={liverEnzymes?.SGPT_ALT_RESULT}
                  />
                  <ItemIndex
                    name_index="Ure & Creatinin"
                    unit_index="mol/L"
                    tooltip="Ure là sản phẩm thoái hóa protein của cơ thể, là các protein ngoại sinh được chuyển hóa thành axit amin nhờ các protease của đường tiêu hóa sau đó được chuyển hóa tiếp và cuối cùng thành CO2 và NH3. Ure luôn tồn tại trong máu , được lọc qua cầu thận và đào thải ra ngoài cơ thể qua nước tiểu. Xét nghiệm ure máu được dùng để đánh giá chức năng thận và theo dõi các căn bệnh về thận. Chỉ số chức năng thận bình thường nếu giá trị ure máu dao động trong khoảng 2.5 - 7.5 mmol/l."
                    tooltip1="Creatinin là sản phẩm của sự thoái hóa creatin trong các cơ, được đào thải qua thận và thận duy trì Creatinin trong máu ở một nồng độ hằng định nên nồng độ của Creatinin phản ánh chính xác chức năng lọc của thận."
                    indexConten="Ure & Creatinin"
                    value={ureaCreatine?.UREA_RESULT}
                    // value1={ureaCreatine?.CREATINE_RESULT}
                  />
                  <ItemIndex
                    name_index="Lipid máu"
                    unit_index="mol/L"
                    tooltip="mỡ trong máu là tên gọi chung cho các loại mỡ tồn tại trong huyết dịch, bao gồm rất nhiều thành phần khác nhau. Trong mỡ máu, Cholesterol là thành phần quan trọng nhất,  có mặt trong tất cả các mô tổ chức của cơ thể, tham gia vào quá trình xây dựng cấu trúc tế bào, vận hành chức năng não bộ, sản xuất hormone hay dự trữ vitamin. Cholesterol chỉ trở nên có hại khi rối loạn cholesterol xảy ra. "
                    indexConten="Lipid máu"
                    value={bloodLipit?.CHOLESTEROL_RESULT}
                    // value1={bloodLipit?.HDL_RESULT}
                    // value2={bloodLipit?.LDL_RESULT}
                    // value3={bloodLipit?.TRIGLYCERIDE_RESULT}
                  />
                  <ItemIndex
                    name_index="Axit Uric"
                    unit_index="mol/L"
                    tooltip="Acid uric là một sản phẩm của quá trình chuyển hóa tự nhiên của các base purin trong cơ thể. Khi tế bào chết đi, Acid uric nội sinh là sản phẩm chuyển hóa của chất đạm có nhân purin (adenine và guadinine của các acid nucleic). Acid uric ngoại sinh đến từ các chất đạm có nhân purin được tìm thấy nhiều trong một số loại thực phẩm và đồ uống như phủ tạng động vật, cá biển, đậu Hà Lan, bia, rượu..."
                    indexConten="Axit Uric"
                    value={axitUric?.AXIT_URIC_RESULT}
                  />
                </div>
                <p className="healthIndex-Info__note">
                  <ExclamationCircleOutlined
                    style={{ marginRight: 12, color: "#3FA641" }}
                  />
                  Tất cả thông tin được tổng hợp dựa trên số liệu thu thập của
                  người dùng.
                </p>
              </div>
              <RecommendedResults />
              <div className="employee-health-handbook__advice">
                <p>
                  <span>{auth?.profile?.LAST_NAME}</span> nhớ tự khám sức khoẻ
                  định kỳ của mình nhé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="employee-health-handbook__advice">
        <p>
          <span>{auth?.profile?.LAST_NAME}</span> nhớ tự khám sức khoẻ định kỳ
          của mình nhé.
        </p>
      </div> */}
      <BannerBot isShow={isShow} />
    </div>
  );
};

export default EmployeeHealthInfo;
