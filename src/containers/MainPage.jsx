/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import MeilleursAgentsLogo from '../assets/logo-meilleursagentspro-neg.svg'
import UnreadMessagesCounter from './UnreadMessagesCounter'
import AgencySelector from './AgencySelector'

const styles = css`
  .toolBar {
    display: flex;
    justify-content: space-between;
  }
  .verticallyCentered {
    vertical-align: middle;
  }
`

export default function MainPage() {
  return (
    <div css={styles}>
      <AppBar>
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
    </div>
  )
}
