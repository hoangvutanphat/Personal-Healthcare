import React from "react";
import Banner from "../../components/home/banners";
import BannerBot from "../../components/home/banners/bot_banner/index.";
import HealthHandbook from "../../components/home/health_handbook";
import MedicalFacility from "../../components/home/medical_facility";
import NutritionMenu from "../../components/home/NutritionMenu/NutritionMenu";
import Solutions from "../../components/Solutions";

const Home = () => {
  return (
    <div style={{ background: "white" }}>
      <Banner />
      <HealthHandbook />
      <Solutions />
      <NutritionMenu />
      <MedicalFacility />
      <BannerBot />
    </div>
  );
};

export default Home;
