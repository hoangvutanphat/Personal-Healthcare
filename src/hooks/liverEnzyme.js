import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
// import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import liverEnzymeApi from "../api/liverEnzymeApi";
import { useSnackbar } from "notistack";
import { liverEnzymeByUserState, liverEnzymeState } from "../recoil/atom/healthIndexState";

export const useLiverEnzyme = () => {
  const [liverEnzymes, setLiverEnzymes] = useState([]);
  const [liverEnzymesByUserId, setLiverEnzymesByUserId] = useState([]);
  const [liverEnzyme, setLiverEnzyme] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setLiverEnzymeState = useSetRecoilState(liverEnzymeState)
  const setLiverEnzymeByUser = useSetRecoilState(liverEnzymeByUserState)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllLiverEnzymes();
    getAllLiverEnzymeByUserId();
  }, []);

  const getAllLiverEnzymes = async () => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.getAllLiverEnzymes();
      if (res.data) {
        setLiverEnzymes(res.data.elements);
        setLiverEnzymeState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
  const getLiverEnzyme = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.getLiverEnzymeById(id);
      if (res.data) {
        setLiverEnzyme(res.data.elements.liverEnzyme);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const createLiverEnzyme = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.createLiverEnzyme(data);
      if (res.data) {
        getAllLiverEnzymes();
        getAllLiverEnzymeByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setLiverEnzyme(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateLiverEnzyme = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.updateLiverEnzyme(data, id);
      if (res.data) {
        getAllLiverEnzymes();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setLiverEnzyme(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const deleteLiverEnzyme = async (id) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.deleteLiverEnzyme(id);
      if (res.data) {
        getAllLiverEnzymes();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const getAllLiverEnzymeByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.getAllLiverEnzymeByUserId();
      if (res.data) {
        setLiverEnzymesByUserId(res.data.elements);
        setLiverEnzymeByUser(res.data.elements);
        // callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  return {
    liverEnzymes,
    deleteLiverEnzyme,
    liverEnzyme,
    getLiverEnzyme,
    updateLiverEnzyme,
    createLiverEnzyme,
    getAllLiverEnzymes,
    isLoading,
    error,
    success,
    setLiverEnzyme,
    liverEnzymesByUserId,
    getAllLiverEnzymeByUserId,
  };
};
