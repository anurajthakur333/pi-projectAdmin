import React, { useState, FormEvent, Dispatch } from "react";
import { OnChangeModel } from "../../common/types/Form.types";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/account.actions";
import TextInput from "../../common/components/TextInput";
import { useHistory } from "react-router-dom"; // ✅ useHistory instead of useNavigate

const Login: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory(); // ✅ react-router-dom v5 uses useHistory

  const [formState, setFormState] = useState({
    email: { error: "", value: "" },
    password: { error: "", value: "" }
  });

  const [errorMessage, setErrorMessage] = useState("");

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (formState.email.value === adminEmail && formState.password.value === adminPassword) {
      dispatch(login(formState.email.value));
      history.push("/dashboard"); // ✅ use history.push
    } else {
      setErrorMessage("Invalid email or password");
    }
  }

  function isFormInvalid() {
    return (
      formState.email.error ||
      formState.password.error ||
      !formState.email.value ||
      !formState.password.value
    );
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid() as boolean;
    return isError ? "disabled" : "";
  }

  return (
    <div className="container">
      {/* Your UI code here */}
    </div>
  );
};

export default Login;
