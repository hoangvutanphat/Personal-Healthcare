import './style.scss';

import { authState } from '../../../../src/recoil/atom/authState';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const UpdateInfor = () => {
    //const { label, errorMessage, onChange, id, type, ...inputProps } = props;
    const [auth, setAuth] = useRecoilState(authState);
    const [users, setValues] = useState({
        username: '',
        gender: '',
        email: '',
        birthday: '',
        phonenumber: '',
        height: '',
        weight: '',
    });
    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: '',
            // errorMessage:
            //     "Username should be 3-16 characters and shouldn't include any special character!",
            label: 'Họ và tên',
            //pattern: "^[A-Za-z]",
            required: true,
        },
        {
            id: 2,
            name: 'Gender',
            type: 'select',
            label: 'Giới tính',
            values: [
                { value: 'Male', label: 'Nam' },
                { value: 'Female', label: 'Nữ' },
                { value: 'Other', label: 'Khác' },
            ],
        },
        {
            id: 3,
            name: 'birthday',
            type: 'date',
            placeholder: 'Birthday',
            label: 'Ngày sinh',
        },
        {
            id: 4,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'Phải là một email hợp lệ!',
            label: 'Email',
            required: true,
        },
        {
            id: 5,
            name: 'phonenumber',
            type: 'text',
            pattern: '[0][1-9]{9}',
            errorMessage: 'Số điện thoại chưa hợp lệ',
            placeholder: 'Phone number',
            label: 'Số điện thoại',
        },
        // {
        //   id: 6,
        //   name: "height",
        //   type: "number",
        //   min: 100,
        //   max: 250,
        //   default: 160,
        //   errorMessage: "Chiều cao không hợp lệ",
        //   placeholder: "Height",
        //   label: "Chiều cao(cm)",
        // },
        // {
        //   id: 7,
        //   name: "weight",
        //   type: "number",
        //   max: 200,
        //   min: 100,
        //   default: 60,
        //   errorMessage: "Cân nặng không hợp lệ",
        //   placeholder: "Weight",
        //   label: "Cân nặng(kg)",
        // },
    ];
    const FULL_NAME = auth?.profile?.FIRST_NAME + ' ' + auth?.profile?.LAST_NAME;
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...users, [e.target.name]: e.target.value });
    };
    return (
        <div className="Update-infor">
            <form className='form' onSubmit={handleSubmit}>
                <h1 className="h1">Thông tin cá nhân</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={users[input.name]} onChange={onChange} />
                ))}
                <button className="btn">Xác nhận</button>
            </form>
        </div>
    );
};
const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, type, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="FormInput">
            <label className="label">{label}</label>
            {type === 'select' ? (
                <>
                    <select className="input" name={inputProps.name}>
                        {props.values.map((result) => (
                            <option value={result.value}>{result.label}</option>
                        ))}
                    </select>
                </>
            ) : (
                <>
                    <input
                        className="input"
                        {...inputProps}
                        type={type}
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() => setFocused(true)}
                        focused={focused.toString()}
                    />
                    <span className="span">{errorMessage}</span>
                </>
            )}
        </div>
    );
};
export default UpdateInfor;
