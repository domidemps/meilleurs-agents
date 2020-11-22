/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Chip from '@material-ui/core/Chip'
import MailIcon from '@material-ui/icons/Mail'

const styles = css`
  margin: 20px;
  padding: 5px;
`

export default function UnreadMessagesCounter() {
  return <Chip css={styles} icon={<MailIcon />} label={<strong>3</strong>} color="primary" />
}
