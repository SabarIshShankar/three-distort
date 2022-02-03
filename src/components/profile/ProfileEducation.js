import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../util/formatDate";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </p>
    <p> {degree}</p>
    <p>{fieldofstudy}</p>
    <p>{description}</p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
