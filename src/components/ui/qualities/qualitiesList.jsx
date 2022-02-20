import React from "react";
import Qualities from "./qualities";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualitiesId }) => {
  const { getQualities, isLoading } = useQualities();
  const qualitiesFromDB = qualitiesId.map((qualId) => getQualities(qualId));
  return !isLoading ? (
    <>
      {qualitiesFromDB.map((qual) => (
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
