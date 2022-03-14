import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import CheckBoxForm from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, logIn } from "../../store/users";

const LoginForm = () => {
  const history = useHistory();
  const loginError = useSelector(getAuthErrors());
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const dispatch = useDispatch();

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" }
    }
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
    setEnterError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(logIn({ payload: data, redirect }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={data.email}
        onChange={handleChange}
        label="E-mail"
        error={errors.email}
      />
      <TextField
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        label="Password"
        error={errors.password}
      />
      <CheckBoxForm onChange={handleChange} name="stayOn" value={data.stayOn}>
        Оставаться в системе
      </CheckBoxForm>
      {loginError && <p className="text-danger">{loginError}</p>}

      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid || enterError}
      >
        Submit
      </button>
    </form>
  );
};
export default LoginForm;
