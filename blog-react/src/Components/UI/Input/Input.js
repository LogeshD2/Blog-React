// Librairie
import React from "react";
import classes from "./Input.module.css";

function Input(props) {

    let inputElement;

    let errorMessageShow;

    if (!props.valid && props.value.length > 0) {
        errorMessageShow = <span>{props.errorMessage}</span>
    }


    switch (props.elementType) {

        case "input":
            inputElement = (
                <input
                    type={props.type}
                    value={props.value}
                    placeholder={props.placeholder}
                    id={props.label}
                    onChange={props.changed}
                />
            );
            break;

        case "textarea":
            inputElement = (
                <textarea value={props.value} id={props.label} onChange={props.changed} />
            );
            break;

        case "select":
            inputElement = (
                <select value={props.value} id={props.label} onChange={props.changed}>
                    <option value={props.option[0].value}>{props.option[0].content}</option>
                    <option value={props.option[1].value}>{props.option[1].content}</option>
                </select>
            );
            break;
        default: 
                console.log('ok');
    };

    return (
        <div className={classes.Input}>
            <label htmlFor={props.label}>{props.label} </label><br />
            {inputElement}
            {errorMessageShow}
        </div>
    )
}

export default Input;


// //{props.options.map(option => (
//     <option key={option.value} value={option.value}>{option.content}</option>
//     ))}
