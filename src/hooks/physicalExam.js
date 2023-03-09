import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
// import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import physicalExamApi from "../api/physicalExamApi";
import { useSnackbar } from "notistack";
import { bloodLipdByUserIdState, physicalExamByIdState, physicalExamLastestState, physicalExamsState, SelfSpecialPhysicalExamByUserState } from "../recoil/atom/physicalExamState";

export const usePhysicalExam = () => {
  const [physicalExams, setPhysicalExams] = useState([]);
  const [bloodLipidsByUserId, setBloodLipidsByUserId] = useState([]);
  const [physicalExam, setPhysicalExam] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const setPhysicalExamState = useSetRecoilState(physicalExamsState);
  const setSelfSpecialPhysicalExamByUser = useSetRecoilState(SelfSpecialPhysicalExamByUserState);
  const setBloodLipidsByUser = useSetRecoilState(bloodLipdByUserIdState);
  const setPhysicalExamLastest = useSetRecoilState(physicalExamLastestState);
  const setPhysicalExamById = useSetRecoilState(physicalExamByIdState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllPhysicalExams();
    getPhysicalExamByUserId();
    getLatestImportantRatings();
    getPhysicalSelfExam();
    getPhysicalSelfExam();
  }, []);

  const getAllPhysicalExams = async () => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.getAllPhysicalExams();
      if (res.data) {
        setPhysicalExams(res.data.elements);
        setPhysicalExamState(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data?.status !== 401) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
    }
  };
  const getPhysicalExam = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.getPhysicalExam(id);
      if (res.data) {
        setPhysicalExam(res.data.elements.physicalExam);
        setPhysicalExamById(res.data.elements.physicalExam);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data.status !== 401) {
      //   enqueueSnackbar(error.response.data.message, { variant: "error" });
      // }
    }
  };
  const createPhysicalExam = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.createPhysicalExam(data);
      if (res.data) {
        getAllPhysicalExams();
        getPhysicalExamByUserId();
        getLatestImportantRatings();
        getPhysicalSelfExam();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPhysicalExam(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updatePhysicalExam = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.updatePhysicalExam(data, id);
      if (res.data) {
        getAllPhysicalExams();
        getPhysicalExamByUserId();
        getLatestImportantRatings();
        getPhysicalSelfExam();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPhysicalExam(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deletePhysicalExam = async (id) => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.deletePhysicalExam(id);
      if (res.data) {
        getAllPhysicalExams();
        getPhysicalExamByUserId();
        getLatestImportantRatings();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const getPhysicalExamByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.getBloodLipidByUserId();
      if (res.data) {
        setBloodLipidsByUserId(res.data.elements);
        setBloodLipidsByUser(res.data.elements)
        // callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
  const getLatestImportantRatings = async () => {
    // console.log("Call API")
    setIsLoading(true);
    try {
      let res = await physicalExamApi.getLatestImportantRatings();
      if (res.data) {
        setPhysicalExamLastest(res.data.elements)
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getPhysicalSelfExam = async () => {
    setIsLoading(true);
    try {
      let res = await physicalExamApi.getPhysicalSelfExam();
      if (res.data) {
        setSelfSpecialPhysicalExamByUser(res.data.elements);
        // callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data?.status !== 401) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
    }
  };

  return {
    physicalExams,
    deletePhysicalExam,
    physicalExam,
    getPhysicalExam,
    updatePhysicalExam,
    createPhysicalExam,
    getAllPhysicalExams,
    isLoading,
    error,
    success,
    setPhysicalExam,
    bloodLipidsByUserId,
    getPhysicalExamByUserId,
    getLatestImportantRatings,
  };
};
