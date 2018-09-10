import React from 'react';
import { func, string } from 'prop-types';

import TextField from '@material-ui/core/TextField';


const FingerprintSearchForm = ({
    onCancel,
    defaultValue,
    onChange,
    onKeyPress,
    inputValue
  }) => {
    return (
      <TextField
        id="fingerprint_search_field"
        autoFocus
        margin="none"
        defaultValue={defaultValue}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Phrase to search"
        fullWidth
      />
    );
  };
  

  FingerprintSearchForm.propTypes = {
    onCancel: func,
    defaultValue : string,
    onChange: func,
    onKeyPress: func,
    inputValue: string
  }
  
  FingerprintSearchForm.defaultProps = {
    onCancel: () => console.log('onCancel event '),
    defaultValue: '',
    onChange: () => console.log('onChange event '),
    onKeyPress: () => console.log('onKeyPress event')
  };

  export {
    FingerprintSearchForm
  };
  