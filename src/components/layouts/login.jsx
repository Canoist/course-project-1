import React, { useEffect, useState } from "react";
import TextField from "../textFields";
import { validator } from "../../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: { isRequired: { message: "Электронная почта обязательна для заполнения" } },
    password: { isRequired: { message: "Пароль обязателен для заполнения" } }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
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
      <button type="submit">Submit</button>
    </form>
  );
};
export default Login;
