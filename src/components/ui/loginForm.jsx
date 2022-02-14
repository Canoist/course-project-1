import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import CheckBoxForm from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const { signIn } = useAuth();

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" }
    }
  };

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await signIn(data);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
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
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={Object.keys(errors).length !== 0}
      >
        Submit
      </button>
    </form>
  );
};
export default LoginForm;
