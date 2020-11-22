import {createMuiTheme} from '@material-ui/core/styles'

export const ENABLED_COLOR = '#6cb81e'
export const READ_COLOR = '#a8a8a8'
export const UNREAD_COLOR = '#212121'
export const TEXT_SECONDARY_COLOR = '#ffffff'
export const PRIMARY_COLOR = '#ededed'
export const SECONDARY_COLOR = '#124080'

const rawBaseTheme = {
  palette: {
    type: 'light',
    background: {
      default: PRIMARY_COLOR,
      paper: '#fefefe',
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: TEXT_SECONDARY_COLOR,
        backgroundColor: SECONDARY_COLOR,
      },
    },
    MuiChip: {
      colorPrimary: {
        backgroundColor: ENABLED_COLOR,
        color: TEXT_SECONDARY_COLOR,
      },
    },
    MuiInput: {
      underline: {
        borderBottom: `2px solid ${TEXT_SECONDARY_COLOR}`,
      },
    },
    MuiNativeSelect: {
      icon: {
        color: TEXT_SECONDARY_COLOR,
      },
      root: {
        color: TEXT_SECONDARY_COLOR,
      },
    },
  },
}

export default createMuiTheme(rawBaseTheme)
