import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import bloodLipidApi from "../api/bloodLipidApi";
import { useSnackbar } from "notistack";
import { lipidBloodByUserState, lipidBloodState } from "../recoil/atom/healthIndexState";

export const useBloodLipid = () => {
  const [bloodLipids, setBloodLipids] = useState([]);
  const [bloodLipidsByUserId, setBloodLipidsByUserId] = useState([]);
  const [bloodLipid, setBloodLipid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const setBloodLipidState = useSetRecoilState(lipidBloodState);
  const setBloodLipidByUser = useSetRecoilState(lipidBloodByUserState)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllBloodLipids();
    getBloodLipidByUserId();
  }, []);

  const getAllBloodLipids = async () => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.getAllBloodLipids();
      if (res.data) {
        setBloodLipids(res.data.elements);
        setBloodLipidState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data?.status !== 401) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    }
  };
  const getBloodLipid = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.getBloodLipidById(id);
      if (res.data) {
        setBloodLipid(res.data.elements.bloodLipid);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const createBloodLipid = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.createBloodLipid(data);
      if (res.data) {
        getAllBloodLipids();
        getBloodLipidByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setBloodLipid(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      // if (error?.response?.data?.status !== 401) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
      setIsLoading(false);
    }
  };

  const updateBloodLipid = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.updateBloodLipid(data, id);
      if (res.data) {
        getAllBloodLipids();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setBloodLipid(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteBloodLipid = async (id) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.deleteBloodLipid(id);
      if (res.data) {
        getAllBloodLipids();
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
  const getBloodLipidByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.getBloodLipidByUserId();
      if (res.data) {
        setBloodLipidsByUserId(res.data.elements);
        setBloodLipidByUser(res.data.elements);
        // callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    }
  };

  return {
    bloodLipids,
    deleteBloodLipid,
    bloodLipid,
    getBloodLipid,
    updateBloodLipid,
    createBloodLipid,
    getAllBloodLipids,
    isLoading,
    error,
    success,
    setBloodLipid,
    bloodLipidsByUserId,
    getBloodLipidByUserId,
  };
};
