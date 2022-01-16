import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import API from "../../../api";
import TextField from "../../common/form/textFields";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";

const UserEditPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
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
    name: {
      isRequired: { message: "Пользователь не может быть без имени" }
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" }
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Редактирование пользователя</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              value={data.name}
              onChange={handleChange}
              type="name"
              label="Имя"
              error={errors.name}
            />
            <TextField
              name="email"
              value={data.email}
              onChange={handleChange}
              label="E-mail"
              error={errors.email}
            />
            <SelectField
              onChange={handleChange}
              name="professions"
              error={errors.profession}
              options={professions}
              label="Выберете вашу профессию"
              defaultOption="Choose..."
              value={data.profession}
            />
            <MultiSelectField
              defaultValue={data.qualities}
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
export default UserEditPage;
