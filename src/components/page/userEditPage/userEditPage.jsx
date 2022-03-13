import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textFields";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData } from "../../../store/users";

const UserEditPage = () => {
  const { updateUser } = useAuth();
  const currentUser = useSelector(getCurrentUserData());
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  const isLoadProf = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const isLoadQual = useSelector(getQualitiesLoadingStatus());
  const qualitiesObject = { ...qualities };
  const history = useHistory();

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
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (
      !isLoadProf &&
      !isLoadQual &&
      currentUser &&
      Object.keys(data).length === 0
    ) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      });
    }
  }, [isLoadProf, isLoadQual, currentUser, data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
    return result;
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
// Редактировать тут
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    await updateUser({
      ...data,
      qualities: data.qualities.map((q) => q.value)
    });
    console.log(data);
    history.push(`/users/${currentUser._id}`);
  };

  const professionsList = Object.keys(professions).map((prof) => ({
    name: professions[prof].name,
    value: professions[prof]._id
  }));

  const isLoad = currentUser && !isLoadProf && !isLoadQual && !isLoading;

  return isLoad ? (
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
              options={professionsList}
              label="Выберете вашу профессию"
              defaultOption="Choose..."
              value={data.profession}
            />
            <MultiSelectField
              defaultValue={data.qualities}
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
