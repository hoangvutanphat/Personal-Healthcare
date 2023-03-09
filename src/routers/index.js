import { ROUTES } from "../constant/router";
import EmployeeHealthInfo from "../pages/health_handbook/emp_health_information";
import AxitUricIndex from "../pages/health_handbook/emp_health_information/axit_uric_index";
import BloodPressureIndex from "../pages/health_handbook/emp_health_information/blood_pressure_index";
import GlycemicIndex from "../pages/health_handbook/emp_health_information/glycemic_index";
import LipidIndex from "../pages/health_handbook/emp_health_information/lipid_index";
import LiverEnzymeIndex from "../pages/health_handbook/emp_health_information/liver_enzyme_index";
import UreCreatininIndex from "../pages/health_handbook/emp_health_information/ure_creatinin_index";
import InputMedicalExamination from "../pages/health_handbook/input_medical_examination";
import PeriodicMedicalExamination from "../pages/health_handbook/periodic_medical_examination";
import SelfSpecialMedicalExamination from "../pages/health_handbook/self_special_medical_examination";
import Home from "../pages/Home";
import MedicalCondition from "../pages/health_handbook/medical_condition";
import OccupationalDiseaseMedicalExamination from "../pages/health_handbook/occupational_disease_medical_examination";
import HeavyToxicMedicalExamination from "../pages/health_handbook/heavy-toxic-medical-examination";
import MedicalFacility from "../pages/health_handbook/medical-facility";
import HealthAdvice from "../pages/health_handbook/health_advice";
import SelfCheckBMI from "../pages/health_self_examination/self_check_bmi";
import SelfCheckDietExerciseLivingHabits from "../pages/health_self_examination/self-check-diet-exercise-living-habits";
import HealthyEmpMenu from "../pages/NutritionMenu/RecommendedMenu/HealthyEmpMenu";
import SpecificDiseaseEmpMenu from "../pages/NutritionMenu/RecommendedMenu/SpecificDiseaseEmpMenu";
import HealthyEmpNutritional from "../pages/NutritionMenu/RecommendedNutritional/HealthyEmpNutritional";
import SpecificDiseaseEmpNutritional from "../pages/NutritionMenu/RecommendedNutritional/SpecificDiseaseEmpNutritional";
import Content from "../pages/content";

export const routes = [
  {
    path: "/",
    key: "HOME",
    label: "Trang chủ",
    exact: true,
    component: Home,
    children: null,

  },

  {
    path: null,
    key: "HEALTH_HANDBOOK",
    label: "Sổ Tay Sức Khoẻ",
    exact: null,
    component: null,
    children: [
      {
        // path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.path,
        path: null,
        key: "EMP_HEALTH_INFO",
        label: "Thông tin sức khỏe nhân viên",
        exact: true,
        component: EmployeeHealthInfo,
        children: [
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.path,
            key: "EMP_HEALTH_INFO_1",
            label: "Thông tin tổng quát",
            exact: true,
            component: EmployeeHealthInfo,
            children: null,
          },
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
              .BLOOD_PRESSURE.path,
            key: "BLOOD_PRESSURE_INDEX",
            label: "Chỉ số huyết áp",
            exact: true,
            component: BloodPressureIndex,
            children: null,
          },
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.GLYCEMIC
              .path,
            key: "GLYCEMIC_INDEX",
            label: "Chỉ số đường huyết",
            exact: true,
            component: GlycemicIndex,
            children: null,
          },
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
              .LIVER_ENZYME.path,
            key: "LIVER_ENZYME_INDEX",
            label: "Chỉ số men gan",
            exact: true,
            component: LiverEnzymeIndex,
            children: null,
          },
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
              .URE_CREATININ.path,
            key: "URE_CREATININ_INDEX",
            label: "Chỉ số Ure và Creatinin",
            exact: true,
            component: UreCreatininIndex,
            children: null,
          },
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.LIPID.path,
            key: "LIPIT_INDEX",
            label: "Chỉ số Lipid máu",
            exact: true,
            component: LipidIndex,
            children: null,
          },
          {
            path: ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.AXIT_URIC
              .path,
            key: "AXIT_URIC_INDEX",
            label: "Chỉ số axit uric",
            exact: true,
            component: AxitUricIndex,
            children: null,
          },
        ],
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.INPUT_MEDICAL_EXAMINATION.path,
        key: "INPUT_MEDICAL_EXAMINATION",
        label: "Kết quả KSK đầu vào",
        exact: true,
        component: InputMedicalExamination,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.PERIODIC_MEDICAL_EXAMINATION.path,
        key: "PERIODIC_MEDICAL_EXAMINATION",
        label: "Kết quả KSK định kỳ",
        exact: true,
        component: PeriodicMedicalExamination,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.SPECIAL_MEDICAL_EXAMINATION.path,
        key: "SPECIAL_MEDICAL_EXAMINATION",
        label: " Kết quả KSK (tự khám/ Gói Đặc Biệt)",
        exact: true,
        component: SelfSpecialMedicalExamination,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.HEAVY_TOXIC_MEDICAL_EXAMINATION.path,
        key: "HEAVY_TOXIC_MEDICAL_EXAMINATION",
        label: " Kết quả khám sức khỏe nặng nhọc độc hại",
        exact: true,
        component: HeavyToxicMedicalExamination,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.OCCUPATIONAL_DISEASE_MEDICAL_EXAMINATION
          .path,
        key: "OCCUPATIONAL_DISEASE_MEDICAL_EXAMINATION",
        label: "Kết quả khám sức khỏe bệnh nghề nghiệp",
        exact: true,
        component: OccupationalDiseaseMedicalExamination,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.MEDICAL_CONDITION.path,
        key: "MEDICAL_CONDITION",
        label: "Tình trạng bệnh lý của bạn",
        exact: true,
        component: MedicalCondition,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.HEALTH_ADVICE.path,
        key: "HEALTH_ADVICE",
        label: "Tư vấn sức khỏe dựa trên tình trạng bệnh lý",
        exact: true,
        component: HealthAdvice,
        children: null,
      },
      {
        path: ROUTES.HEALTH_HANDBOOK.MEDICAL_FACILITY.path,
        key: "MEDICAL_FACILITY",
        label: "Cơ sở khám chữa bệnh uy tín",
        exact: true,
        component: MedicalFacility,
        children: null,
      },
    ],
  },
  {
    path: null,
    key: "HEALTH_SELF_EXAMINATION",
    label: "Tự Kiểm Tra Sức khoẻ",
    exact: null,
    component: null,
    children: [
      {
        path: ROUTES.HEALTH_SELF_EXAMINATION.SELF_CHECK_BMI.path,
        key: "SELF_CHECK_BMI",
        label: "Tự kiểm tra BMI ở mọi thời điểm",
        exact: true,
        component: SelfCheckBMI,
        children: null,
      },
      {
        path: ROUTES.HEALTH_SELF_EXAMINATION
          .SELF_CHECK_DIET_EXERCISE_LIVING_HABITS.path,
        key: "SELF_CHECK_DIET_EXERCISE_LIVING_HABITS",
        label:
          "Tự kiểm tra chế độ ăn uống, luyện tập & thói quen sinh hoạt hiện tại",
        exact: true,
        component: SelfCheckDietExerciseLivingHabits,
        children: null,
      },
    ],
  },
  {
    path: null,
    key: "BALENCED_MENU",
    label: "Thực đơn cân bằng",
    exact: null,
    component: null,
    children: [
      {
        path: null,
        key: "RECOMMENDED_MENU",
        label: "Thực đơn đề xuất (giảm muối, sử dụng umami)",
        exact: null,
        component: null,
        children: [
          {
            path: ROUTES.BALENCED_MENU.RECOMMENDED_MENU.HEALTHY_EMPLOYEE.path,
            key: "HEALTHY_EMPLOYEE",
            label: "Dành cho nhân viên khỏe mạnh",
            exact: true,
            component: HealthyEmpMenu,
            children: null,
          },
          {
            path: ROUTES.BALENCED_MENU.RECOMMENDED_MENU
              .SPECIFIC_DESEASE_EMPLOYEE.path,
            key: "SPECIFIC_DESEASE_EMPLOYEE",
            label: "Dành cho nhân viên thuộc nhóm bệnh cụ thể",
            exact: true,
            component: SpecificDiseaseEmpMenu,
            children: null,
          },
        ],
      },
      {
        path: null,
        key: "RECOMMENDED_NUTRITIONAL",
        label: "Nhu cầu dinh dưỡng khuyến nghị",
        exact: null,
        component: null,
        children: [
          {
            path: ROUTES.BALENCED_MENU.RECOMMENDED_NUTRITIONAL.HEALTHY_EMPLOYEE
              .path,
            key: "HEALTHY_EMPLOYEE_01",
            label: "Dành cho nhân viên khỏe mạnh",
            exact: true,
            component: HealthyEmpNutritional,
            children: null,
          },
          {
            path: ROUTES.BALENCED_MENU.RECOMMENDED_NUTRITIONAL
              .SPECIFIC_DESEASE_EMPLOYEE.path,
            key: "SPECIFIC_DESEASE_EMPLOYEE_01",
            label: "Dành cho nhân viên thuộc nhóm bệnh cụ thể",
            exact: true,
            component: SpecificDiseaseEmpNutritional,
            children: null,
          },
        ],
      },
    ],
  },
  {
    path: null,
    key: "HEALTH_SOLUTIONS",
    label: "Giải pháp sức khoẻ",
    exact: null,
    component: null,
    children: [
      {
        path: null,
        key: "TRAINING_FORM",
        label: "Hình thức luyện tập",
        exact: null,
        component: null,
        children: [
          {
            path: ROUTES.HEALTH_SOLUTIONS.TRAINING_FORM.HEALTHY_EMPLOYEE.path,
            key: "HEALTHY_EMPLOYEE_02",
            label: "Dành cho nhân viên khỏe mạnh",
            exact: true,
            component: null,
            children: null,
          },
          {
            path: ROUTES.HEALTH_SOLUTIONS.TRAINING_FORM
              .SPECIFIC_DESEASE_EMPLOYEE.path,
            key: "SPECIFIC_DESEASE_EMPLOYEE_02",
            label: "Dành cho nhân viên thuộc nhóm bệnh cụ thể",
            exact: true,
            component: null,
            children: null,
          },
        ],
      },
      {
        path: ROUTES.HEALTH_SOLUTIONS.NUTRITION_HEALTH_ADVICE.path,
        key: "NUTRITION_HEALTH_ADVICE",
        label: "Tư vấn chung về dinh dưỡng, sức khỏe của các chuyên gia",
        exact: true,
        component: null,
        children: null,
      },
      {
        path: ROUTES.HEALTH_SOLUTIONS.NUTRITION_HEALTH_TRAINING.path,
        key: "NUTRITION_HEALTH_TRAINING",
        label: "Đào tạo về kiến thức về sức khỏe & dinh dưỡng",
        exact: true,
        component: null,
        children: null,
      },
    ],
  },
  {
    path: ROUTES.FAQ.path,
    key: "FAQ",
    label: "Hỏi đáp",
    exact: true,
    component: null,
    children: null,
  },
];
