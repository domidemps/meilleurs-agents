/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import React from 'react'
import List from '@material-ui/core/List'
import InfiniteScroll from 'react-infinite-scroll-component'
import Typography from '@material-ui/core/Typography'
import {useDispatch, useSelector} from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CallIcon from '@material-ui/icons/Call'
import SmsIcon from '@material-ui/icons/Sms'
import EmailIcon from '@material-ui/icons/Email'
import ListItemText from '@material-ui/core/ListItemText'
import {lighten} from '@material-ui/core'
import map from 'lodash/map'
import truncate from 'lodash/truncate'
import Divider from '@material-ui/core/Divider'

import {getPageMessages} from '../actions/messages'
import {READ_COLOR, SECONDARY_COLOR, UNREAD_COLOR} from '../styles/material_ui_raw_theme_file'

const styles = css``

export default function MessagesList() {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages.messages)
  const page = useSelector(state => state.messages.page)
  const selectedAgency = useSelector(state => state.realtors.selectedAgency)
  const hasMore = useSelector(state => state.messages.hasMore)

  const renderMessageIcon = (messageType, isMessageRead) => {
    const color = isMessageRead ? READ_COLOR : SECONDARY_COLOR
    const icons = {
      phone: (
        <CallIcon
          css={css`
            color: ${color};
          `}
        />
      ),
      sms: (
        <SmsIcon
          css={css`
            color: ${color};
          `}
        />
      ),
      email: (
        <EmailIcon
          css={css`
            color: ${color};
          `}
        />
      ),
    }
    return icons[messageType]
  }

  const renderMessageSender = (messageContact, isMessageRead) => {
    const sender = `${messageContact.firstname} ${messageContact.lastname}`
    if (isMessageRead) {
      return sender
    }
    return <strong>{sender}</strong>
  }

  const renderMessageInfo = (messageType, isMessageRead) => {
    const subtitle =
      messageType === 'phone'
        ? 'Appel téléphonique depuis MeilleursAgents'
        : 'Message sur votre vitrine MeilleursAgents'
    return (
      <Typography
        variant="body1"
        css={css`
          color: ${isMessageRead ? READ_COLOR : UNREAD_COLOR};
        `}>
        {subtitle}
      </Typography>
    )
  }

  const renderMessagePreview = (messageBody, isMessageRead) => {
    return (
      <Typography
        variant="body2"
        css={css`
          color: ${isMessageRead ? READ_COLOR : lighten(UNREAD_COLOR, 0.3)};
        `}>
        {truncate(messageBody, {length: 100, separator: ' '})}
      </Typography>
    )
  }

  const renderMessages = messages => {
    return map(messages, message => {
      return [
        <ListItem alignItems="flex-start" key={`message-${message.id}`}>
          <ListItemIcon>{renderMessageIcon(message.type, message.read)}</ListItemIcon>
          <ListItemText
            primary={
              <React.Fragment>{renderMessageSender(message.contact, message.read)}</React.Fragment>
            }
            secondary={
              <React.Fragment>
                {renderMessageInfo(message.type, message.read)}
                {renderMessagePreview(message.body, message.read)}
              </React.Fragment>
            }
          />
        </ListItem>,
        <Divider variant="inset" component="li" />,
      ]
    })
  }

  const getMoreMessages = (selectedAgency, nextPage, hasMore) => {
    if (!hasMore) {
      return
    }
    dispatch(getPageMessages(selectedAgency, nextPage))
  }

  if (!Boolean(selectedAgency)) {
    return null
  }

  return (
    <div css={styles}>
      <InfiniteScroll
        dataLength={messages.length}
        next={getMoreMessages(selectedAgency, page, hasMore)}
        hasMore={hasMore}
        loader={<Typography variant="h5">Loading...</Typography>}
        height={window.innerHeight - 100}
        endMessage={<Typography variant="h6">No more messages</Typography>}>
        <List>{renderMessages(messages)}</List>
      </InfiniteScroll>
    </div>
  )
}
