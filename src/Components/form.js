import React, { useContext } from 'react';
import '../Styles/form.css';
import axios from 'axios';
import { GlobalContext } from '../Context/globalContext';
import illustration from '../Static/Images/gamer-colour.svg';

const Form = () => {
  const { state, setState } = useContext(GlobalContext);
  const email_regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const updateFirstName = (e) => {
    const firstName = e.target.value;
    const validFirstName = firstName.length !== 0;
    setState((prevState) => ({
      ...prevState,
      details: { ...state.details, firstName },
    }));
    switch (validFirstName) {
      case true:
        setState((prevState) => ({
          ...prevState,
          firstNameError: false,
          validFirstName: true,
        }));
        break;
      case false:
        setState((prevState) => ({
          ...prevState,
          firstNameError: true,
          validFirstName: false,
        }));
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          firstNameError: false,
          validFirstName: false,
        }));
        break;
    }
    checkValid();
  };
  const updateLastName = (e) => {
    const lastName = e.target.value;
    const validLastName = lastName.length > 0;
    setState((prevState) => ({
      ...prevState,
      details: { ...state.details, lastName },
    }));
    switch (validLastName) {
      case true:
        setState((prevState) => ({
          ...prevState,
          lastNameError: false,
          validLastName: true,
        }));
        break;
      case false:
        setState((prevState) => ({
          ...prevState,
          lastNameError: true,
          validLastName: false,
        }));
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          lastNameError: false,
          validLastName: false,
        }));
        break;
    }
    checkValid();
  };
  const updateEmail = (e) => {
    const email = e.target.value;
    const validEmail = email_regEx.test(email);
    setState((prevState) => ({
      ...prevState,
      details: { ...state.details, email },
    }));
    switch (validEmail) {
      case true:
        setState((prevState) => ({
          ...prevState,
          emailError: false,
          validEmail: true,
        }));
        break;
      case false:
        setState((prevState) => ({
          ...prevState,
          emailError: true,
          validEmail: false,
        }));
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          emailError: true,
          validEmail: false,
        }));
        break;
    }
    checkValid();
  };
  const updatePassword = (e) => {
    const password = e.target.value;
    const validPassword = password.length >= 5;
    setState((prevState) => ({
      ...prevState,
      details: { ...state.details, password },
    }));
    switch (validPassword) {
      case true:
        setState((prevState) => ({
          ...prevState,
          passwordError: false,
          validPassword: true,
        }));
        break;
      case false:
        setState((prevState) => ({
          ...prevState,
          passwordError: true,
          validPassword: false,
        }));
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          passwordError: false,
          validPassword: false,
        }));
        break;
    }
    checkValid();
  };
  const checkValid = () => {
    const validFirstName = document.querySelector('#firstName').value.length !== 0;
    const validLastName = document.querySelector('#lastName').value.length > 0;
    const validEmail = email_regEx.test(document.querySelector('#email').value);
    const validPassword = document.querySelector('#password').value.length >= 5;

    if (validFirstName && validLastName && validEmail && validPassword) {
      setState((prevState) => ({
        ...prevState,
        isComplete: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isComplete: false,
      }));
    }
  };
  const clearForm = () => {
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
  };
  const handleSubmit = () => {
    const details = {
      campaignUuid: state.campaignUuid,
      data: state.details,
    };
    axios.post('https://api.raisely.com/v3/signup', details)
      .then(
        clearForm(),
        setState((prevState) => ({
          ...prevState,
          formSubmitted: true,
        })),
      );
  };
  const emailError = () => {
    switch (state.emailError) {
      case true:
        return <p className="error">Please enter a valid email address</p>;
      case false:
        return null;
      default:
        return null;
    }
  };
  const passwordError = () => {
    switch (state.passwordError) {
      case true:
        return <p className="error">Please enter a password with at least 5 characters</p>;
      case false:
        return null;
      default:
        return null;
    }
  };
  const disableButton = () => {
    switch (state.isComplete) {
      case true:
        return <button id="submit_button" type="submit" onClick={handleSubmit}>Submit</button>;
      case false:
        return <button disabled id="submit_button_disabled" type="submit">Submit</button>;
      default:
        return null;
    }
  };
  const formSubmitted = () => {
    switch (state.formSubmitted) {
      case true:
        return <p>Form submitted</p>;
      case false:
        return null;
      default:
        return null;
    }
  };
  return (
    <div id="maindiv">
      <div className="row">
        <div className="d-none d-lg-block col-sm-12 col-lg-6" id="left">
          <img id="illustration" src={illustration} alt="main illustration" />
        </div>
        <div className="col-sm-12 col-lg-6" id="right">
          <div id="right-inner">
            <h1>Raisely Form</h1>
            <p className="headers">First name</p>
            <input id="firstName" className={state.firstNameError ? 'input_error' : 'input'} onChange={updateFirstName} type="text" />
            <p className="headers">Last name</p>
            <input id="lastName" className={state.lastNameError ? 'input_error' : 'input'} onChange={updateLastName} type="text" />
            <p className="headers">Email</p>
            <input id="email" className={state.emailError ? 'input_error' : 'input'} onChange={updateEmail} type="text" />
            {emailError()}
            <p className="headers">Password</p>
            <input id="password" className={state.passwordError ? 'input_error' : 'input'} onChange={updatePassword} type="password" />
            {passwordError()}
            {disableButton()}
            {formSubmitted()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
