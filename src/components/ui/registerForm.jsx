import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxForm from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    API.qualities.fetchAll().then((data) => {
      setQualities(data);
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
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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

  const handleChange = (target) => {
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
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберете ваши качества"
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберет ваш пол"
      />
      <CheckBoxForm
        onChange={handleChange}
        name="license"
        value={data.license}
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
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
export default RegisterForm;
