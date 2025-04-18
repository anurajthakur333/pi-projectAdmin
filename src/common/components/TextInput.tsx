import React, { useState, ChangeEvent } from "react";
import { TextInputProps } from "../types/TextInput.types";

function TextInput(props: TextInputProps): JSX.Element {
  const [touched, setTouch] = useState(false);
  const [internalError, setInternalError] = useState("");

  function onValueChanged(event: ChangeEvent<HTMLInputElement>): void {
    const elementValue = event.target.value;

    let [error, validClass] = (!elementValue && props.required)
      ? ["Value cannot be empty", "is-invalid"]
      : ["", "is-valid"];

    if (!error) {
      [error, validClass] = (props.maxLength && elementValue.length > props.maxLength)
        ? [`Value can't have more than ${props.maxLength} characters`, "is-invalid"]
        : ["", "is-valid"];
    }

    props.onChange({ value: elementValue, error: error, touched: touched, field: props.field });

    setTouch(true);
    setInternalError(error);
  }

  const finalError = props.error || internalError;
  const isInvalid = finalError !== "";

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        value={props.value}
        type={props.type}
        onChange={onValueChanged}
        className={`form-control ${props.inputClass || ""} ${isInvalid ? "is-invalid" : ""}`}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxLength}
      />
      {isInvalid && (
        <div className="invalid-feedback">
          {finalError}
        </div>
      )}
    </div>
  );
}

export default TextInput;
