import {createMuiTheme} from '@material-ui/core/styles'

const rawBaseTheme = {
  palette: {
    type: 'light',
    background: {
      default: '#ededed',
      paper: '#fefefe'
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: '#e0e0e0',
        backgroundColor: '#124080',
      }
    }
  }
}

export default createMuiTheme(rawBaseTheme)