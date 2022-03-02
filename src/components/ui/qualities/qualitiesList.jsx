import React, { useEffect } from "react";
import Qualities from "./qualities";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualitiesId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesId));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return !isLoading ? (
    <>
      {qualitiesList.map((qual) => (
        <Qualities quality={qual} key={qual._id} />
      ))}
    </>
  ) : (
    <>Loading...</>
  );
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array.isRequired
};

export default QualitiesList;
