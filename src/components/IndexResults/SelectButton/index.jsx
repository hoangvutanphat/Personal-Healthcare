import { Space } from "antd/lib";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isChangeState } from "../../../recoil/atom/healthIndexState";
import LargeButton from "../../globals/ButtonTracking/LargeButton";

const SelectButton = ({
  leftButtonContent,
  rightButtonContent,
  Icon_right,
  Icon_left,
  Icon_right_1,
  Icon_left_2,
  right_path,
  left_path,
}) => {
  const history = useHistory();
  const [isActiveButton1, setIsActiveButton1] = useState(true);
  const [isActiveButton2, setIsActiveButton2] = useState(false);
  const [isChange, setIsChange] = useRecoilState(isChangeState);

  const handleLeftButton = () => {
    // setIsActiveButton1(true);
    // setIsActiveButton2(false);
    // history.push(left_path);
    setIsChange(true);
  };

  const handleRightButton = () => {
    // setIsActiveButton1(false);
    // setIsActiveButton2(true);
    // history.push(right_path);
    setIsChange(false);
  };

  useEffect(() => {
    if (isChange === true) {
      setIsActiveButton1(true);
      setIsActiveButton2(false);
    } else {
      setIsActiveButton1(false);
      setIsActiveButton2(true);
    }
  }, [isChange]);

  return (
    <Space size={24} wrap>
      <LargeButton
        content={leftButtonContent}
        icon={Icon_left}
        icon1={Icon_left_2}
        onClick={handleLeftButton}
        active={isActiveButton1}
      />
      <LargeButton
        content={rightButtonContent}
        icon={Icon_right}
        icon1={Icon_right_1}
        onClick={handleRightButton}
        active={isActiveButton2}
      />
    </Space>
  );
};

export default SelectButton;
