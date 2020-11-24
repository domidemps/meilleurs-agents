/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'

import AgencySelector from './AgencySelector'
import MeilleursAgentsLogo from '../assets/logo-meilleursagentspro-neg.svg'
import UnreadMessagesCounter from './UnreadMessagesCounter'
import media from '../styles/media'

const styles = css`
  display: flex;
  .toolBar {
    display: flex;
    justify-content: space-between;
  }
  .logo {
    vertical-align: middle;
  }
  ${media.phone`
    .logo {
      width: 150px;
    }
    .displayContents {
      display: contents;
    }
  `}
`

export default function Header() {
  return (
    <AppBar position="sticky" css={styles}>
      <Toolbar className="toolBar">
        <div className="displayContents">
          <img src={MeilleursAgentsLogo} alt="MeilleursAgents PRO" className="logo" />
          <UnreadMessagesCounter />
        </div>
        <AgencySelector />
      </Toolbar>
    </AppBar>
  )
}
