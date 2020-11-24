/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import {useSelector} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import {lighten} from '@material-ui/core'
import dayjs from 'dayjs'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import {TEXT_COLOR, THIRD_COLOR} from '../styles/material_ui_raw_theme_file'
import media from '../styles/media'
import breakpoints from '../styles/breakpoints'
import {useHistory} from 'react-router'

const styles = css`
  width: 70%;
  display: flex;
  flex-direction: column;
  .papers {
    padding: 20px;
    margin: 15px;
    color: ${TEXT_COLOR};
  }
  .paperTop {
    height: 15%;
  }
  .paperBottom {
    height: 85%;
  }
  .infos {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
  .contactLabel {
    color: ${lighten(TEXT_COLOR, 0.3)};
    margin: 10px 0px 0px 10px;
  }
  .contactValue {
    color: ${THIRD_COLOR};
    margin: 10px 0px 0px 50px;
  }
  .messageBody {
    margin-top: 30px;
    line-height: 20px;
  }
  ${media.phone`
    width: 100%;
    .contactLabel {
      margin: 5px 0px 0px 0px;
    }
    .contactValue {
      margin: 5px 0px 0px 10px;
    }
    .papers {
      margin: 5px;
    }
    .paperTop {
      height: 30%;
    }
    .paperBottom {
      height: 70%;
    }
    .messageBody {
      margin-top: 20px;
      max-height: ${window.innerHeight - 430}px;
      overflow-y: scroll;
    }
  `}
`

export default function MessageView() {
  const selectedMessage = useSelector(state => state.messages.selectedMessage)
  const selectedAgency = useSelector(state => state.realtors.selectedAgency)
  const history = useHistory()

  if (!Boolean(selectedMessage)) {
    return <div css={styles} />
  }

  const renderContactInformation = messageContact => {
    return (
      <Paper className="papers paperTop">
        <Typography
          variant="h5"
          key="sender"
          css={css`
            font-weight: 600;
          `}>
          {messageContact.firstname} {messageContact.lastname}
        </Typography>
        <div className="infos">
          <div key="labels">
            <Typography variant="body1" key="email" className="contactLabel">
              Email
            </Typography>
            <Typography variant="body1" key="phone" className="contactLabel">
              Téléphone
            </Typography>
          </div>
          <div key="values" className="inLine">
            <Typography variant="body1" key="email" className="contactValue">
              {messageContact.email}
            </Typography>
            <Typography variant="body1" key="phone" className="contactValue">
              {messageContact.phone.match(/.{1,2}/g).join(' ')}
            </Typography>
          </div>
        </div>
      </Paper>
    )
  }

  const renderMessageContent = message => {
    return (
      <Paper className="papers paperBottom">
        <Typography
          variant="h5"
          key="sender"
          css={css`
            font-weight: 600;
          `}>
          {message.contact.firstname} {message.contact.lastname}
        </Typography>
        <Typography
          variant="h6"
          key="dateTime"
          css={css`
            color: ${lighten(TEXT_COLOR, 0.5)};
          `}>
          Le {dayjs(message.date).format('DD/MM/YYYY')} à {dayjs(message.date).format('HH:mm')}
        </Typography>
        <div className="messageBody">{message.body}</div>
      </Paper>
    )
  }

  return (
    <div css={styles}>
      {window.innerWidth < breakpoints.phone ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => history.replace(`/realtor/${selectedAgency}`)}
          css={css`
            margin: 12px !important;
            width: min-content;
          `}>
          Retour
        </Button>
      ) : null}
      {renderContactInformation(selectedMessage.contact)}
      {renderMessageContent(selectedMessage)}
    </div>
  )
}
