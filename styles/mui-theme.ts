import { createMuiTheme } from '@material-ui/core/styles'

export const muiTheme = createMuiTheme({
  props: {
    MuiCheckbox: {
      color: 'primary',
      disableRipple: false,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiSelect: {
      variant: 'outlined',
    },
    MuiTextField: {
      variant: 'outlined',
    },
    MuiAccordionSummary: {
      IconButtonProps: {
        edge: 'start',
      },
    },
    MuiLink: {
      underline: 'always',
    },
  },
})
