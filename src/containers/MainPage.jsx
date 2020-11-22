/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import MeilleursAgentsLogo from '../assets/logo-meilleursagentspro-neg.svg'
import UnreadMessagesCounter from './UnreadMessagesCounter'
import AgencySelector from './AgencySelector'
import MessagesList from './MessagesList'

const styles = css`
  .toolBar {
    display: flex;
    justify-content: space-between;
  }
  .verticallyCentered {
    vertical-align: middle;
  }
  .appBody {
    display: flex;
  }
  .messagesList {
    width: 30%;
    display: flex;
  }
  .messageView {
    width: 70%;
  }
`

export default function MainPage() {
  return (
    <div css={styles}>
      <AppBar position="sticky">
        <Toolbar className="toolBar">
          <div>
            <img
              src={MeilleursAgentsLogo}
              alt="MeilleursAgents PRO"
              className="verticallyCentered"
            />
            <UnreadMessagesCounter />
          </div>
          <AgencySelector />
        </Toolbar>
      </AppBar>
      <div className="appBody">
        <MessagesList className="messagesList" />
        <div className="messageView"></div>
      </div>
    </div>
  )
}
