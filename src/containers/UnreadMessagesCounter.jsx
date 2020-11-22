/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Chip from '@material-ui/core/Chip'
import MailIcon from '@material-ui/icons/Mail'
import {useSelector} from 'react-redux'
import filter from 'lodash/filter'

const styles = css`
  margin: 20px;
  padding: 5px;
`

export default function UnreadMessagesCounter() {
  const agencies = useSelector(state => state.realtors.agencies)
  const selectedAgency = useSelector(state => state.realtors.selectedAgency)

  if (!Boolean(agencies)) {
    return null
  }

  const unreadMessages = filter(agencies, agency => {
    return agency.id === Number(selectedAgency)
  })[0].unread_messages

  return (
    <Chip
      css={styles}
      icon={<MailIcon />}
      label={<strong>{unreadMessages}</strong>}
      color="primary"
    />
  )
}
