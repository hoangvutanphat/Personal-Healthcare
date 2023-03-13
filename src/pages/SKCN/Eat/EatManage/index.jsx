import BMIApi from '../../../../api/bmiApi';

function EatManage() {
    const getAllBMI = async () => {
        try {
            let res = await BMIApi.getAllBMI();
            if (res.data) {
                // setAllBMI(res.data.elements);
                // setBMIState(res.data.elements);
                // console.log(res.data.elements);
            }
        } catch (error) {
            // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
        }
    };
    getAllBMI();
    return <div className=""></div>;
}

export default EatManage;
