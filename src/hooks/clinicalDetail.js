import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import clinicalDetailApi from "../api/clinicalDetailApi";
import { clinicalDetailState, newestClinicalDetailState } from "../recoil/atom/clinicalDetailState";

export const useClinicalDetail = () => {
    const [clinicalDetails, setClinicalDetails] = useState([]);
    const [clinicalDetail, setClinicalDetail] = useState();
    const [clinicalDetailNew, setClinicalDetailNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    const setClinicalDetailState = useSetRecoilState(clinicalDetailState);
    const setNewestClinicalDetailState = useSetRecoilState(newestClinicalDetailState);

    useEffect(() => {
        getAllClinicalDetails();
    }, []);

    const getAllClinicalDetails = async () => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.getAllClinicalDetails();
            if (res.data) {
                setClinicalDetails(res.data.elements);
                setClinicalDetailState(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getClinicalDetailById = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.getClinicalDetailById(id);
            if (res.data) {
                console.log("response:", res.data);
                setClinicalDetail(res.data.elements.clinicalDetail);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createClinicalDetail = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.createClinicalDetail(data);
            if (res.data) {
                getAllClinicalDetails();
                setClinicalDetailNew(res.data.elements);
                setNewestClinicalDetailState(res.data.elements);
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
                callback();
                setClinicalDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updateClinicalDetail = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.updateClinicalDetail(data, id);
            if (res.data) {
                getAllClinicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
                callback();
                setClinicalDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deleteClinicalDetail = async (id) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.deleteClinicalDetail(id);
            if (res.data) {
                getAllClinicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" });
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return {
        clinicalDetails,
        clinicalDetail,
        clinicalDetailNew,
        getAllClinicalDetails,
        getClinicalDetailById,
        createClinicalDetail,
        updateClinicalDetail,
        deleteClinicalDetail,
        setClinicalDetail,
        isLoading,
        error,
    };
};
