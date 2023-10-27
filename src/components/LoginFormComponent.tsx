// ignore type errors for now
// @ts-nocheck
import {ChangeEvent, SyntheticEvent, useDeferredValue, useState} from "react";
import { UseRiveParameters } from "rive-react";

const LOGIN_PASSWORD = 'teddy';

const LoginFormComponent = (riveProps: UseRiveParameters = {}) => {

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUserValue(newVal);
    };

    const onSubmit = (e: SyntheticEvent) => {};

    return (
        <div className={"form-container"}>
            <form onSubmit={onSubmit}>
                <label htmlFor="">
                    <input type="text" className="form-username"
                    name="username"
                    placeholder="Username"
                    value={userValue}
                    onChange={onUsernameChange}/>
                </label>
                <label htmlFor="">
                    <input type="password" 
                    className="form-pass"
                    name="password"
                    placeholder="Password (ssh.. it's 'teddy'"
                    value={passValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassValue(e.target.value);
                    }}/>
                </label>
                <button className="login-btn">Login</button>
            </form>
        </div>
    )
};

export default LoginFormComponent;