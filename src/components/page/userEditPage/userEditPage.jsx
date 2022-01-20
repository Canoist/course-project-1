import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textFields";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import PropTypes from "prop-types";
import API from "../../../api";

const UserEditPage = ({ user, professions, qualities }) => {
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession,
    sex: user.sex,
    qualities: user.qualities
  });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    name: {
      isRequired: { message: "Пользователь не может быть без имени" }
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" }
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

  const handleChangeQualities = ({ value }) => {
    const newQualities = [];
    for (const qualitie in qualities) {
      for (const i in value) {
        if (value[i].value === qualities[qualitie]._id) {
          newQualities.push(qualities[qualitie]);
        }
      }
    }
    console.log(newQualities);
    setData((prev) => ({ ...prev, qualities: newQualities }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    API.users.update(user._id, data);
    console.log(data);
  };

  return data && professions ? (
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
              name="profession"
              error={errors.profession}
              options={professions}
              label="Выберете вашу профессию"
              defaultOption={user.profession.name}
              value={data.profession._id}
            />
            <MultiSelectField
              defaultValue={data.qualities.map((qual) => ({
                label: qual.name,
                value: qual._id
              }))}
              options={qualities}
              onChange={handleChangeQualities}
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
            <a
              href={`/users/${user._id}`}
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              disabled={Object.keys(errors).length !== 0}
              onSubmit={handleSubmit}
            >
              {/* <button
              > */}
              {/* `/users/${user._id}` */}
              Обновить
              {/* </button> */}
            </a>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

UserEditPage.propTypes = {
  user: PropTypes.object,
  qualities: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UserEditPage;
