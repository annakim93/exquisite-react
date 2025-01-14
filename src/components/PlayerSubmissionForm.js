import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = props => {
  const defaultFormFields = {
    adj1: '',
    noun1: '',
    adv: '',
    verb: '',
    adj2: '',
    noun2: ''
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  const onInputChange = event => {
    const newFormFields = { ...formFields };
    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
  };

  const onFormSubmit = event => {
    event.preventDefault();
    props.sendSubmission(formFields);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{ props.index }</h3>
      <form className="PlayerSubmissionForm__form" onSubmit={ onFormSubmit } >
        <div className="PlayerSubmissionForm__poem-inputs">
          { props.fields.map((value, index) => {
            if (typeof value === 'string') {
              return value;
            } else {
              return <input 
                        key={ index }
                        name={ value.key }
                        placeholder={ value.placeholder }
                        onChange={ onInputChange }
                        type='text' 
                        value={ formFields[value.key] || '' }
                        className={ !formFields[value.key]
                                    ? 'PlayerSubmissionForm__input--invalid' 
                                    : '' 
                                  }
                    />
            }
          })}
        </div>
        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
