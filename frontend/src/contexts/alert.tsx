import { createContext } from 'react';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
};

export type AlertInfo = {
  open: boolean,
  type: AlertType,
  message: string,
};

type Props = {
  alertInfo: AlertInfo,
  setAlertInfo: SetState<AlertInfo>,
};

export const AlertContext = createContext<Props>({
  alertInfo: {
    open: false,
    type: AlertType.Warning,
    message: 'This is an initial message.'
  },
  setAlertInfo: () => {},
});
