import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import DialogsContext from './DialogsContext';
import { AlertDialog, ConfirmDialog, PromptDialog } from './useDialogs';
import type { 
  DialogHook, 
  OpenAlertDialog, 
  OpenConfirmDialog, 
  OpenPromptDialog 
} from './useDialogs';

export function useDialogs(): DialogHook {
  const dialogsContext = React.useContext(DialogsContext);
  if (!dialogsContext) {
    throw new Error('Dialogs context was used without a provider.');
  }
  const { open, close } = dialogsContext;

  const alert = useEventCallback<OpenAlertDialog>(
    (msg, { onClose, ...options } = {}) =>
      open(AlertDialog, { ...options, msg }, { onClose }),
  );

  const confirm = useEventCallback<OpenConfirmDialog>(
    (msg, { onClose, ...options } = {}) =>
      open(ConfirmDialog, { ...options, msg }, { onClose }),
  );

  const prompt = useEventCallback<OpenPromptDialog>(
    (msg, { onClose, ...options } = {}) =>
      open(PromptDialog, { ...options, msg }, { onClose }),
  );

  return React.useMemo(
    () => ({
      alert,
      confirm,
      prompt,
      open,
      close,
    }),
    [alert, close, confirm, open, prompt],
  );
}
