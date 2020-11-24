import {createMuiTheme} from '@material-ui/core/styles'

export const ENABLED_COLOR = '#6cb81e'
export const READ_COLOR = '#a8a8a8'
export const UNREAD_COLOR = '#212121'
export const PRIMARY_COLOR = '#ffffff'
export const SECONDARY_COLOR = '#124080'
export const THIRD_COLOR = '#0074e3'
export const BACKGROUND = '#eeeeee'
export const TEXT_COLOR = '#303030'

const rawBaseTheme = {
  palette: {
    type: 'light',
    background: {
      default: BACKGROUND,
      paper: PRIMARY_COLOR,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: PRIMARY_COLOR,
        backgroundColor: SECONDARY_COLOR,
      },
    },
    MuiChip: {
      colorPrimary: {
        backgroundColor: ENABLED_COLOR,
        color: PRIMARY_COLOR,
      },
    },
    MuiInput: {
      underline: {
        borderBottom: `2px solid ${PRIMARY_COLOR}`,
      },
    },
    MuiNativeSelect: {
      icon: {
        color: PRIMARY_COLOR,
      },
      root: {
        color: PRIMARY_COLOR,
      },
    },
    MuiPaper: {
      root: {
        color: PRIMARY_COLOR,
      },
    },
    MuiList: {
      root: {
        backgroundColor: PRIMARY_COLOR,
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: SECONDARY_COLOR,
        paddingBottom: 20,
        textAlign: 'center',
      },
    },
  },
}

export default createMuiTheme(rawBaseTheme)
