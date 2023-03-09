import { atom, selector } from "recoil";
import { authState } from "./authState";

const employeeState = atom({
    key: "employeeState",
    default: [],
});

const employeeSelectState = atom({
    key: "employeeSelected",
    default: undefined,
})

const employeeByIdState = selector({
    key: "getEmployeeByIdState",
    get: ({ get }) => {
        const user = get(authState);
        const id = user.profile?.Employees[0]?.id;
        const employeeList = get(employeeState);

        if (id && employeeList.length > 0) {
            const employee = employeeList.filter(emp => emp.id === id);

            return employee[0];
        }
        return undefined;
    }
})


export {
    employeeState,
    employeeSelectState,
    employeeByIdState,
}