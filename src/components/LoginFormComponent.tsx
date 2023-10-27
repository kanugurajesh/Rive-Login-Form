// ignore typescript errors
// @ts-nocheck

import {ChangeEvent, SyntheticEvent, useState, useRef, useEffect} from "react";
import "../styles/LoginFormComponent.css"

import { 
    useRive,
    Layout,
    Fit,
    Alignment,
    UseRiveParameters,
    StateMachineInput,
    useStateMachineInput,
    RiveState,
} from "rive-react";

const STATE_MACHINE_NAME = 'Login Machine'
const LOGIN_PASSWORD = 'teddy';

const LoginFormComponent = (riveProps: UseRiveParameters = {}) => {
    
    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
    const [loginButtonText, setLoginButtonText] = useState('Login');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef?.current && !inputLookMultiplier) {
            setInputLookMultiplier(inputRef.current.offsetWidth / 100);
        }
    },[inputRef])

    const { rive: riveInstance, RiveComponent}:RiveState = useRive({
        src: '/bear.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center
        }),
        ...riveProps
    });

    const onSubmit = (e: SyntheticEvent) => {
        setLoginButtonText('Checking...');
        setTimeout(() => {
            setLoginButtonText('Login');
            passValue === LOGIN_PASSWORD ? trigSuccessInput.fire() : trigFailInput.fire();
        }, 1500);
        e.preventDefault();
        return false;
    };

    // State Machine Inputs
    const isCheckingInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'isChecking');
    const numLookInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'numLook');
    const trigSuccessInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'trigSuccess');
    const trigFailInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'trigFail');
    const isHandsUpInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'isHandsUp');

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUserValue(newVal);

        if(!isCheckingInput.value) {
            isCheckingInput.value = true;
        }

        const numChars = newVal.length;
        numLookInput.value = numChars * inputLookMultiplier;
    };

    const onUsernameFocus = () => {
        isCheckingInput.value = true;
        if(numLookInput.value !== userValue.length * inputLookMultiplier) {
            numLookInput.value = userValue.length * inputLookMultiplier;
        }
    }

    return (
        <div className="rive-container">
            <div className="rive-wrapper">
                <RiveComponent className="rive-container"/>
            </div>
            <div className={"form-container"}>
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">
                        <input type="text" className="form-username"
                        name="username"
                        placeholder="Username"
                        onFocus={onUsernameChange}
                        value={userValue}
                        onChange={onUsernameChange}
                        onBlur={()=> isCheckingInput.value = false}
                        ref={inputRef}
                        />
                    </label>
                    <label htmlFor="password">
                        <input type="password" 
                        className="form-pass"
                        name="password"
                        placeholder="Password (ssh.. it's 'teddy'"
                        value={passValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassValue(e.target.value);
                        }}
                        onFocus={() => isHandsUpInput.value = true}
                        onBlur={() => isHandsUpInput.value = false}
                        />
                    </label>
                    <button className="login-btn">{loginButtonText}</button>
                </form>
            </div>
        </div>
    )
};

export default LoginFormComponent;