import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubUsername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: ""
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const { formData, setFormData } = useState(initialState);

  const creatingProfile = useMatch("/create-profile");

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? "Create your profile" : "Edit your profile"}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? `Let's get some information to make your`
          : "Add some changes to profile"}
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="statu" value={status} onChnage={onChange}>
            <option>* select professional status</option>
            <option value="developer">Developer</option>
            <option value="junior developer">Junio developer</option>
            <option value="student">student</option>
            <option value="other">other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="company"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            could be your own company or the one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">could be the company website</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">city & state suggested</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            please use comma separated values(js, php)
          </small>
        </div>
        <div className="form=group">
          <input
            type="text"
            placeholder="Github username"
            name="github username"
            value={githubUsername}
            onChange={onChange}
          />
          <small className="form-text">include username</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="a short bi of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>
        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add social network links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="twitter url"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="facebook url"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="linkedin url"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="instagram url"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
