import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textFields";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useHistory } from "react-router-dom";

const UserEditPage = () => {
  const { currentUser, updateUser } = useAuth();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const {
    professions,
    getProfession,
    isLoading: isLoadProf
  } = useProfessions();
  const { qualities, isLoading: isLoadQual, getQualities } = useQualities();
  const qualitiesObject = { ...qualities };
  const history = useHistory();

  useEffect(() => {
    setData({
      ...currentUser
    });
  }, [currentUser]);

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
    for (const qualitie in qualitiesObject) {
      for (const i in value) {
        if (value[i].value === qualitiesObject[qualitie]._id) {
          newQualities.push(qualitiesObject[qualitie]._id);
        }
      }
    }
    setData((prev) => ({ ...prev, qualities: newQualities }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    updateUser(data);
    console.log(data);
    history.push(`/users/${currentUser._id}`);
  };

  const professionsList = Object.keys(professions).map((prof) => ({
    name: professions[prof].name,
    value: professions[prof]._id
  }));

  const isLoad =
    currentUser && !isLoadProf && !isLoadQual && getProfession(data.profession);

  return isLoad ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Редактирование пользователя</h3>
          <form onSubmit={handleSubmit}>
            {" "}
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
              options={professionsList}
              label="Выберете вашу профессию"
              defaultOption={getProfession(data.profession).name}
              value={getProfession(data.profession)._id}
            />
            <MultiSelectField
              defaultValue={data.qualities.map((qualId) => ({
                label: getQualities(qualId).name,
                value: getQualities(qualId)._id
              }))}
              options={qualitiesObject}
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
            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              disabled={Object.keys(errors).length !== 0}
              onSubmit={handleSubmit}
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <h1>...Loading</h1>
  );
};

export default UserEditPage;
