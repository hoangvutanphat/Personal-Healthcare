import { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./assets/styles/style.scss";
import Footer from "./components/globals/Footer";
import Heading from "./components/globals/Heading";
import { ROUTES } from "./constant/router";
import { i18nConfig } from "./lib/Language";
import ForgotPassword from "./pages/auth/forgot-password";
import Login from "./pages/auth/login";
import PDFFileExport from "./pages/health_handbook/emp_health_information/pdf_file_export";
import PrediabetesRisk from "./pages/health_handbook/emp_health_information/prediabetes_risk";
import { languageState } from "./recoil/atom/languageState";
import { routes } from "./routers";
import RouteWithSubRoutes from "./routers/RouteWithSubRoutes";
import { useAuth } from "./hooks/auth";
import ShowMedicalConsultation from "./components/meidcal_condition/show_medical_consultation/ShowMedicalConsultation";
import HeavyToxicMedicalExaminationPDF from "./components/HealthHandbooks/HeavyToxicMedicalExaminationPDF";
import OccupationalDiseasePDF from "../src/components/HealthHandbooks/OccupationalDiseaseMedicalExamination/OccupationalDiseasePDF";
import PeriodicMedicalPDF from "./components/HealthHandbooks/PeriodicMedicalExamination/PeriodicMedicalPDF";
import MedicalFacility from "./pages/health_handbook/medical-facility";
import MedicalFacilityResult from "./components/HealthHandbooks/MedicalFacility/MedicalFacilityResult";
import Content from "./pages/content";

function flatten(destArray, nodeList) {
  nodeList.forEach((node) => {
    destArray.push(node);
    flatten(destArray, node.children || []);
  });
}

function App() {
  let location = useLocation();
  const history = useHistory();
  // Set language for App
  const [language, setLanguage] = useRecoilState(languageState);
  const isLogged = localStorage.getItem("isLogged") || false;
  const { refreshToken, logout } = useAuth();

  i18nConfig(language);

  const handleGetProfile = async () => {
    await refreshToken();
  };
  useEffect(() => {
    handleGetProfile();
  }, []);

  useEffect(() => {
    if (isLogged === false && !location.pathname.startsWith("/auth")) {
      // logout();
      history.push("/auth/login");
    }
    if (isLogged === "true" && location.pathname.startsWith("/auth")) {
      history.push("/");
    }
  }, [isLogged]);

  const menu = [];
  flatten(menu, routes);

  return (
    <div className="App">
      {isLogged === "true" ? (
        <>
          <Heading />
          <Switch>
            {menu.map((route) => {
              if (route.path === null) {
                return 0;
              }
              return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route
              path={
                ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
                  .PDF_FILE_EXPORT.path
              }
              exact
              children={<PDFFileExport />}
            />
            <Route
              path={
                ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
                  .PREDIABETES_RISK.path
              }
              exact
              children={<PrediabetesRisk />}
            />
            <Route
              path={`${ROUTES.HEALTH_HANDBOOK.PERIODIC_MEDICAL_EXAMINATION.PDF_FILE_EXPORT.path}/:id`}
              exact
              children={<PeriodicMedicalPDF />}
            />
            <Route
              path={`${ROUTES.HEALTH_HANDBOOK.OCCUPATIONAL_DISEASE_MEDICAL_EXAMINATION.PDF_FILE_EXPORT.path}/:id`}
              exact
              children={<OccupationalDiseasePDF />}
            />
            <Route
              path={`${ROUTES.HEALTH_HANDBOOK.HEAVY_TOXIC_MEDICAL_EXAMINATION.HEAVY_TOXIC_MEDICAL_EXAMINATION_PDF.path}/:id`}
              exact
              children={<HeavyToxicMedicalExaminationPDF />}
            />
            <Route
              path={`${ROUTES.HEALTH_HANDBOOK.MEDICAL_FACILITY.MEDICAL_FACILITY_RESULT.path}/:id`}
              exact
              children={<MedicalFacilityResult />}
            />
            <Route
              path={`${ROUTES.CONTENT.patch}/:id`
            }
            exact
            children={<Content/>}
            />
          </Switch>
          <Footer />
        </>
      ) : (
        <Switch>
          <Route exact path="/auth/login">
            <Login />
          </Route>
          <Route exact path="/auth/forgot-password">
            <ForgotPassword />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
