/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'

import AgencySelector from './AgencySelector'
import MeilleursAgentsLogo from '../assets/logo-meilleursagentspro-neg.svg'
import UnreadMessagesCounter from './UnreadMessagesCounter'

const styles = css`
  display: flex;
  .toolBar {
    display: flex;
    justify-content: space-between;
  }
  .verticallyCentered {
    vertical-align: middle;
  }
`

export default function Header() {
  return (
    <AppBar position="sticky" css={styles}>
      <Toolbar className="toolBar">
        <div>
          <img src={MeilleursAgentsLogo} alt="MeilleursAgents PRO" className="verticallyCentered" />
          <UnreadMessagesCounter />
        </div>
        <AgencySelector />
      </Toolbar>
    </AppBar>
  )
}
