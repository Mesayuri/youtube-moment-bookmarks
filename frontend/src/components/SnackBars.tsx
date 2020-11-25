import React, { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// context
import { AlertContext } from '../contexts/alert';

const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const SnackBars: React.FC = () => {
  const { alertInfo, setAlertInfo } = useContext(AlertContext);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertInfo({
      open: false,
      type: alertInfo.type,
      message: alertInfo.message,
    });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={alertInfo.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alertInfo.type}>
        {alertInfo.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBars;
