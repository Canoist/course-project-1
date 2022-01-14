import React, { useEffect, useState } from "react";
import TextField from "./textFields";
import { validator } from "../utils/validator";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isContainCapital: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
      minLength: {
        message: "Длина пароля должна быть не менее 7 символов",
        value: 7
      }
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
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
            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              disabled={Object.keys(errors).length !== 0}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
