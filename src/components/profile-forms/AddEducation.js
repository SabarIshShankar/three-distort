import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current
  } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  return (
    <section className="container">
      <h1 className="large text-primary">Add your education</h1>
      <p className="lead">Add any school or bootcamp</p>
      <small>* - required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, navigate);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or bootcamp"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* degree or certificate"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* field of study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <h4>From date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() =>
                setFormData({
                  ...formData,
                  current: !current
                })
              }
            />{" "}
            current school/college
          </p>
        </div>
        <div className="form-group">
          <h4>To date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            colr="30"
            rows="5"
            placeholder="program description"
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go back
        </Link>
      </form>
    </section>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
