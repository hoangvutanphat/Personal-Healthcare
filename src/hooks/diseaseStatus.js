import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import diseaseStatusApi from "../api/diseaseStatusApi";
import { diseasesStatusState } from "../recoil/atom/diseaseStatusState";

export const useDiseaseStatus = () => {
  const [diseasesStatus, setDiseasesStatus] = useState([]);
  // const [userstatus, setUserStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setDiseasesStatusState = useSetRecoilState(diseasesStatusState)

  useEffect(() => {
    getAllDiseaseStatus();
  }, []);

  const getAllDiseaseStatus = async () => {
    setIsLoading(true);
    try {
      let res = await diseaseStatusApi.getAllDiseaseStatus();
      if (res.data) {
        setDiseasesStatus(res.data.elements);
        setDiseasesStatusState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  // const getUserStatus = async (id, callback) => {
  //   setIsLoading(true);
  //   try {
  //     let res = await userStatusApi.getUserStatus( id);
  //     if (res.data) {
  //       setUserStatus(res.data.elements.userstatus);
  //       callback();
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //           if (error?.response?.data.status !== 401) {
  //       enqueueSnackbar(error.response.data.message, { variant: "error" });
  //     }
  //   }
  // };




  return {
    diseasesStatus,
    isLoading,
    error,
    success,
    getAllDiseaseStatus,
    setDiseasesStatus,
  };
};
