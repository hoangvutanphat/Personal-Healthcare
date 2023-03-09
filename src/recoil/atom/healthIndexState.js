import { atom } from "recoil";


export const isChangeState = atom({
  key: "isChangeState",
  default: true,
});

export const isDownLoadState = atom({
  key: "isDownLoadState",
  default: false,
});

export const indexKeyChangeState = atom({
  key: "indexKeyChangeState",
  default: undefined,
});

//BloodPressure
export const bloodPressureState = atom({
  key: "bloodPressureState",
  default: [],
});

export const bloodPressureByUserState = atom({
  key: "bloodPressureByUserState",
  default: [],
});

export const glucoseState = atom({
  key: "glucoseState",
  default: [],
});
export const glucoseByUserState = atom({
  key: "glucoseByUserState",
  default: [],
});

export const liverEnzymeState = atom({
  key: "liverEnzymeState",
  default: [],
});
export const liverEnzymeByUserState = atom({
  key: "liverEnzymeByUserState",
  default: [],
});

export const ureCreatineState = atom({
  key: "ureCreatineState",
  default: [],
});
export const ureCreatineByUserState = atom({
  key: "ureCreatineByUserState",
  default: [],
});

export const lipidBloodState = atom({
  key: "lipidBloodState",
  default: [],
});
export const lipidBloodByUserState = atom({
  key: "lipidBloodByUserState",
  default: [],
});

export const axitUricState = atom({
  key: "axitUricState",
  default: [],
});
export const axitUricByUserState = atom({
  key: "axitUricByUserState",
  default: [],
});

export const BMIState = atom({
  key: "BMIState",
  default: [],
});
export const BMIByUserState = atom({
  key: "BMIByUserState",
  default: [],
});
