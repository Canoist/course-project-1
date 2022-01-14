import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: ""
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

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
    },
    profession: {
      isRequired: { message: "Обязательно выбрите профессию" }
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
      <SelectField
        onChange={handleChange}
        error={errors.profession}
        options={professions}
        label="Выберете вашу профессию"
        defaultOption="Choose..."
        value={data.profession}
      />
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
export default RegisterForm;
