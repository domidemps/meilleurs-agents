/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Chip from '@material-ui/core/Chip'
import MailIcon from '@material-ui/icons/Mail'
import {useSelector} from 'react-redux'

import media from '../styles/media'

const styles = css`
  margin: 20px;
  padding: 5px;
  ${media.phone`
    margin: 20px 0px 20px 10px;
  `}
`

export default function UnreadMessagesCounter() {
  const agencies = useSelector(state => state.realtors.agencies)
  const unreadMessages = useSelector(state => state.realtors.unreadMessages)

  if (!Boolean(agencies)) {
    return null
  }

  return (
    <Chip
      css={styles}
      icon={<MailIcon/>}
      label={<strong>{unreadMessages}</strong>}
      color="primary"
    />
  )
}
