import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxForm from "../common/form/checkBoxField";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  console.log("Thied3@thd.eu");

  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  const isLoadProf = useSelector(getProfessionsLoadingStatus());

  const qualities = useSelector(getQualities());
  const isLoadQual = useSelector(getQualitiesLoadingStatus());

  const qualitiesObject = { ...qualities };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" }
    },
    name: {
      isRequired: { message: "Имя обязательно для заполнения" },
      minLength: {
        message: "Имя должно быть не менее 2 символов",
        value: 2
      }
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
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };
    dispatch(signUp(newData));
  };

  const professionsList = Object.keys(professions).map((prof) => ({
    name: professions[prof].name,
    value: professions[prof]._id
  }));

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={data.email}
        onChange={handleChange}
        label="Электронная почта"
        error={errors.email}
      />
      <TextField
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        label="Пароль"
        error={errors.password}
      />
      <TextField
        name="name"
        value={data.name}
        onChange={handleChange}
        label="Имя"
        error={errors.name}
      />
      {!isLoadProf ? (
        <SelectField
          onChange={handleChange}
          name="profession"
          error={errors.profession}
          options={professionsList}
          label="Выберете вашу профессию"
          defaultOption="Choose..."
          value={data.profession}
        />
      ) : (
        <h5>Loading...</h5>
      )}
      {!isLoadQual ? (
        <MultiSelectField
          defaultValue={data.qualities}
          options={qualitiesObject}
          onChange={handleChange}
          name="qualities"
          label="Выберете ваши качества"
        />
      ) : (
        <h5>Loading...</h5>
      )}
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
