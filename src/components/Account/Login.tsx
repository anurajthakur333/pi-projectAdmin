import React, { useState, FormEvent, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/actions/account.actions";
import { OnChangeModel } from "../../common/types/Form.types";
import TextInput from "../../common/components/TextInput";

const Login: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();

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

    setErrorMessage("");

    const emailEmpty = !formState.email.value.trim();
    const passwordEmpty = !formState.password.value.trim();

    if (emailEmpty || passwordEmpty) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      setErrorMessage("Server error: credentials missing.");
      return;
    }

    const inputEmail = formState.email.value.trim().toLowerCase();
    const inputPassword = formState.password.value.trim();

    if (inputEmail === adminEmail.toLowerCase() && inputPassword === adminPassword) {
      localStorage.setItem('adminEmail', formState.email.value); // ✅ Save email in localStorage
      dispatch(login(formState.email.value));
      history.push("/dashboard");
    } else {
      setErrorMessage("Invalid email or password.");
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
    return isFormInvalid() ? "disabled" : "";
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "'Poppins', sans-serif" }}>
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-4 mx-auto">
          <div className="card border-0 shadow rounded-lg p-5" style={{ backgroundColor: "#ffffff", transition: "all 0.3s ease" }}>
            <div className="text-center mb-4">
              <h2 className="h4 font-weight-bold text-dark mb-2">Welcome Back</h2>
              <p className="text-muted small mb-0">Admin access - authorized personnel only.</p>
            </div>

            {errorMessage && (
              <div className="alert alert-danger text-center py-2" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={submit} autoComplete="off">
              <div className="form-group mb-3">
                <TextInput
                  id="input_email"
                  field="email"
                  value={formState.email.value}
                  onChange={hasFormValueChanged}
                  required
                  maxLength={100}
                  label="Email Address"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group mb-4">
                <TextInput
                  id="input_password"
                  field="password"
                  value={formState.password.value}
                  onChange={hasFormValueChanged}
                  required
                  maxLength={100}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className={`btn btn-success btn-block font-weight-bold ${getDisabledClass()}`}
                style={{
                  fontSize: "16px",
                  padding: "10px",
                  transition: "background-color 0.3s ease",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)"
                }}
              >
                Login
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
