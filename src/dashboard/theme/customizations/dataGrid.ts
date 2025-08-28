import type { Theme } from '@mui/material/styles';
import type { DataGridProComponents } from '@mui/x-data-grid-pro/themeAugmentation';
import { gray } from '../../../shared-theme/themePrimitives';

export const dataGridCustomizations: DataGridProComponents<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: gray[50],
          color: gray[900],
          fontWeight: 600,
          ...theme.applyStyles('dark', {
            backgroundColor: gray[800],
            color: gray[200],
          }),
        },
        '& .MuiDataGrid-cell': {
          borderColor: (theme.vars || theme).palette.divider,
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: gray[50],
          ...theme.applyStyles('dark', {
            backgroundColor: gray[800],
          }),
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      }),
    },
  },
};
