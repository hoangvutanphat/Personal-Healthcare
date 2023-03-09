export const ROUTES = {
  HOME: {
    path: "/",
  },
  CONTENT:{
    patch:"/content"
  },
  HEALTH_HANDBOOK: {
    EMPLOYEE_HEALTH_INFORMATION: {
      path: "/health-handbook/emp-health-information",
      BLOOD_PRESSURE: {
        path: "/health-handbook/emp-health-information/blood-pressure-index",
      },
      GLYCEMIC: {
        path: "/health-handbook/emp-health-information/glycemic-index",
      },
      PREDIABETES_RISK: {
        path: "/health-handbook/emp-health-information/prediabetes-risk",
      },
      LIVER_ENZYME: {
        path: "/health-handbook/emp-health-information/liver-enzyme-index",
      },
      URE_CREATININ: {
        path: "/health-handbook/emp-health-information/ure-creatinin-index",
      },
      LIPID: {
        path: "/health-handbook/emp-health-information/lipit-index",
      },
      AXIT_URIC: {
        path: "/health-handbook/emp-health-information/axit-uric-index",
      },
      PDF_FILE_EXPORT: {
        path: "/health-handbook/emp-health-information/pdf-file",
      },
    },
    INPUT_MEDICAL_EXAMINATION: {
      path: "/health-handbook/input-medical-examination",
    },
    PERIODIC_MEDICAL_EXAMINATION: {
      path: "/health-handbook/periodic-medical-examination",
      PDF_FILE_EXPORT: {
        path: "/health-handbook/periodic-medical-examination/pdf-file",
      },
    },
    SPECIAL_MEDICAL_EXAMINATION: {
      path: "/health-handbook/special-medical-examination",
    },
    OCCUPATIONAL_DISEASE_MEDICAL_EXAMINATION: {
      path: "/health-handbook/occupational-disease-medical-examination",
      PDF_FILE_EXPORT: {
        path: "/health-handbook/occupational-disease-medical-examination/pdf-file",
      },
    },
    HEAVY_TOXIC_MEDICAL_EXAMINATION: {
      path: "/health-handbook/heavy-toxic-medical-examination",
      HEAVY_TOXIC_MEDICAL_EXAMINATION_PDF: {
        path: "/health-handbook/heavy-toxic-medical-examination/pdf-file",
      },
    },
    MEDICAL_CONDITION: {
      path: "/health-handbook/medical-condition",
      SHOW_MEDICAL_CONSULTATION: {
        path: "/health-handbook/medical-condition/show-medical-consultation",
      },
    },
    HEALTH_ADVICE: {
      path: "/health-handbook/health-advice",
    },
    MEDICAL_FACILITY: {
      path: "/health-handbook/medical-facility",
      MEDICAL_FACILITY_RESULT:{
        path:"/health-handbook/medical-facility/result"
      }

    },
  },
  SHOW_DETAILS_PDF: {
    path: "/show-detail-pdf",
  },
  PERIODIC_MEDICAL_EXAMINATION: {
    path: "/health-handbook/periodic-medical-examination",
    PDF_FILE_EXPORT: {
      path: "/health-handbook/periodic-medical-examination/pdf-file",
    },
  },
  SPECIAL_MEDICAL_EXAMINATION: {
    path: "/health-handbook/special-medical-examination",
  },
  OCCUPATIONAL_DISEASE_MEDICAL_EXAMINATION: {
    path: "/health-handbook/occupational-disease-medical-examination",
    PDF_FILE_EXPORT: {
      path: "/health-handbook/occupational-disease-medical-examination/pdf-file",
    },
  },
  INPUT_MEDICAL_EXAMINATION: {
    path: "/health-handbook/input-medical-examination",
  },
  HEAVY_TOXIC_MEDICAL_EXAMINATION: {
    path: "/health-handbook/heavy-toxic-medical-examination",
    HEAVY_TOXIC_MEDICAL_EXAMINATION_PDF: {
      path: "/health-handbook/heavy-toxic-medical-examination/pdf-file",
    },
  },
  MEDICAL_CONDITION: {
    path: "/health-handbook/medical-condition",
    SHOW_MEDICAL_CONSULTATION: {
      path: "/health-handbook/medical-condition/show-medical-consultation",
    },
  },
  HEALTH_ADVICE: {
    path: "/health-handbook/health-advice",
  },
  MEDICAL_FACILITY: {
    path: "/health-handbook/medical-facility",
  },
  HEALTH_SELF_EXAMINATION: {
    SELF_CHECK_BMI: {
      path: "/health-self-examination/self-check-bmi",
    },
    SELF_CHECK_DIET_EXERCISE_LIVING_HABITS: {
      path: "/health-self-examination/self-check-diet-exercise-living-habits",
    },
  },
  BALENCED_MENU: {
    RECOMMENDED_MENU: {
      HEALTHY_EMPLOYEE: {
        path: "/balenced-menu/recommended-menu/healthy-employee",
      },
      SPECIFIC_DESEASE_EMPLOYEE: {
        path: "/balenced-menu/recommended-menu/specific-desease-employee",
      },
    },
    RECOMMENDED_NUTRITIONAL: {
      HEALTHY_EMPLOYEE: {
        path: "/balenced-menu/recommended-nutritional/healthy-employee",
      },
      SPECIFIC_DESEASE_EMPLOYEE: {
        path: "/balenced-menu/recommended-nutritional/specific-desease-employee",
      },
    },
  },
  HEALTH_SOLUTIONS: {
    TRAINING_FORM: {
      HEALTHY_EMPLOYEE: {
        path: "/health-solutions/training-form/healthy-employee",
      },
      SPECIFIC_DESEASE_EMPLOYEE: {
        path: "/health-solutions/training-form/specific-desease-employee",
      },
    },
    NUTRITION_HEALTH_ADVICE: {
      path: "/health-solutions/nutrition-health-advice",
    },
    NUTRITION_HEALTH_TRAINING: {
      path: "/health-solutions/nutrition-health-training",
    },
  },
  FAQ: {
    path: "/question-and-answer",
  },
};
