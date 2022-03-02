import React from "react";
import Qualities from "./qualities";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from "../../../store/qualities";

const QualitiesList = ({ qualitiesId }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesId));
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
