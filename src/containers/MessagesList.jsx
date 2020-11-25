/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import React from 'react'
import List from '@material-ui/core/List'
import InfiniteScroll from 'react-infinite-scroller'
import Typography from '@material-ui/core/Typography'
import {useDispatch, useSelector} from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CallIcon from '@material-ui/icons/Call'
import SmsIcon from '@material-ui/icons/Sms'
import EmailIcon from '@material-ui/icons/Email'
import ListItemText from '@material-ui/core/ListItemText'
import {lighten} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import {useHistory} from 'react-router'

import map from 'lodash/map'
import truncate from 'lodash/truncate'

import {getPageMessages, markMessageAsRead, setMessageSelected} from '../actions/messages'
import {getRelativeDateTime} from '../helpers/utils'
import {
  READ_COLOR,
  SECONDARY_COLOR,
  THIRD_COLOR,
  UNREAD_COLOR,
} from '../styles/material_ui_raw_theme_file'

export default function MessagesList() {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages.messages)
  const page = useSelector(state => state.messages.page)
  const selectedAgency = useSelector(state => state.realtors.selectedAgency)
  const hasMore = useSelector(state => state.messages.hasMore)
  const history = useHistory()

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

  const renderMessageDate = (messageDate, isMessageRead) => {
    return (
      <text
        css={css`
          color: ${isMessageRead ? READ_COLOR : THIRD_COLOR};
          float: right;
        `}>
        {getRelativeDateTime(messageDate)}
      </text>
    )
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
        {truncate(messageBody, {
          length: 100,
          separator: ' ',
        })}
      </Typography>
    )
  }

  const openMessage = message => {
    if (!message.read) {
      dispatch(markMessageAsRead(selectedAgency, message.id))
    }
    dispatch(setMessageSelected(message.id))
    history.replace(`/realtor/${selectedAgency}/message/${message.id}`)
  }

  const renderMessages = messages => {
    return map(messages, message => {
      return [
        <ListItem
          alignItems="flex-start"
          key={`message-${message.id}`}
          onClick={() => openMessage(message)}
          button>
          <ListItemIcon>{renderMessageIcon(message.type, message.read)}</ListItemIcon>
          <ListItemText
            primary={
              <React.Fragment>
                {renderMessageSender(message.contact, message.read)}
                {renderMessageDate(message.date, message.read)}
              </React.Fragment>
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

  const getMoreMessages = (selectedAgency, nextPage) => {
    dispatch(getPageMessages(selectedAgency, nextPage))
  }

  if (!Boolean(selectedAgency)) {
    return null
  }

  return (
    <List
      css={css`
        height: ${window.innerHeight - 100}px;
        overflow: auto;
      `}>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => getMoreMessages(selectedAgency, page)}
        hasMore={hasMore}
        loader={
          <Typography
            variant="h6"
            css={css`
              text-align: center;
            `}>
            Chargement...
          </Typography>
        }
        useWindow={false}>
        {renderMessages(messages)}
      </InfiniteScroll>
      {!hasMore ? (
        <Typography
          variant="h6"
          css={css`
            text-align: center;
          `}>
          Pas de messages supplémentaires.
        </Typography>
      ) : null}
    </List>
  )
}
