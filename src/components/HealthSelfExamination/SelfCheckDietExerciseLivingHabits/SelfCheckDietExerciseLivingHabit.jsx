import React, { useState } from "react";
import { Tabs, Col, Row, Modal, Button } from "antd";
import Nutrition from "./Nutrition";
import Motive from "./Motive";
import OtherHabits from "./OtherHabits";
import Result from "./Result";

const SelfCheckDietExerciseLivingHabit = ({ setIsChange }) => {
  const [activeKey, setActiveKey] = useState("1");
  const onKeyChange = (key) => setActiveKey(key);

  const [isNutrition, setIsNutrition] = useState(true);
  const [isMotive, setIsMotive] = useState(false);
  const [isOtherHabits, setIsOtherHabits] = useState(false);
  const [isResult, setIsResult] = useState(false);

  return (
    <div>
      <Tabs
        // defaultActiveKey="1"
        centered
        activeKey={activeKey}
        onChange={onKeyChange}
        className="tabs_children"
      >
        <Tabs.TabPane
          //   tab="Dinh dưỡng"
          tab={<label>Dinh dưỡng</label>}
          key="1"
          disabled={isNutrition ? false : true}
        >
          <Nutrition
            onKeyChange={onKeyChange}
            setIsNutrition={setIsNutrition}
            setIsMotive={setIsMotive}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Vận động" key="2" disabled={isMotive ? false : true}>
          <Motive
            onKeyChange={onKeyChange}
            setIsOtherHabits={setIsOtherHabits}
            setIsMotive={setIsMotive}
            setIsNutrition={setIsNutrition}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Thói quen khác"
          key="3"
          disabled={isOtherHabits ? false : true}
        >
          <OtherHabits
            onKeyChange={onKeyChange}
            setIsResult={setIsResult}
            setIsOtherHabits={setIsOtherHabits}
            setIsMotive={setIsMotive}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Kết quả" key="4" disabled={isResult ? false : true}>
          <Result
            setIsChange={setIsChange}
            onKeyChange={onKeyChange}
            setIsResult={setIsResult}
            setIsOtherHabits={setIsOtherHabits}
            setIsNutrition={setIsNutrition}
            setIsMotive={setIsMotive}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SelfCheckDietExerciseLivingHabit;
