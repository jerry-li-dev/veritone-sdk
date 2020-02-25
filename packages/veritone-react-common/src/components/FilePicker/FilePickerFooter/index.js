import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from 'helpers/withStyles';
import { bool, func, string } from 'prop-types';
import cx from 'classnames';
import styles from './styles';
const classes = withStyles(styles);

class FilePickerFooter extends Component {
  static propTypes = {
    disabled: bool,
    onCancel: func,
    onSubmit: func,
    title: string,
    hasIntercom: bool
  };

  static defaultProps = {
    title: 'Upload'
  };

  render() {
    const {
      hasIntercom,
      onCancel,
      disabled,
      onSubmit,
      title
    } = this.props;
    return (
      <div className={cx(classes.filePickerFooter, {
        [classes.hasIntercom]: hasIntercom
      })}>
        <Button
          data-veritone-element={`picker-footer-cancel-button`}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          data-veritone-element={`picker-footer-${title}-button`}
          variant="contained"
          disabled={disabled}
          color="primary"
          onClick={onSubmit}
        >
          {title}
        </Button>
      </div>
    );
  }
}

export default FilePickerFooter;
