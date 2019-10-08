import React from 'react';
import { bool, string, func, number } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styles from './styles.scss';

export default function TextInput({ label, required, name, onChange, instruction, value, error }) {
  const handleChange = React.useCallback(
    (e) => {
      onChange({ name, value: e.target.value})
    },
    [name, onChange],
  );

  return (
    <TextField
      fullWidth
      label={label}
      required={required}
      error={error.length > 0}
      helperText={error || instruction}
      variant="outlined"
      value={value}
      onChange={handleChange}
      className={styles['form-item']}
      type="number"
      name={name}
    />
  )
}

TextInput.propTypes = {
  label: string,
  required: bool,
  name: string,
  onChange: func,
  instruction: string,
  value: number,
  error: string
}

TextInput.defaultProps = {
  label: 'InputNumber',
  name: `number-${Date.now()}`,
  onChange: () => { },
  value: 0,
  error: ''
}