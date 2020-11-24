/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import map from 'lodash/map'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {NativeSelect} from '@material-ui/core'
import {useHistory} from 'react-router'
import IconButton from '@material-ui/core/IconButton'
import StoreIcon from '@material-ui/icons/Store'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import React from 'react'

import {getAgencies, selectAgency} from '../actions/realtors'
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../styles/material_ui_raw_theme_file'
import breakpoints from '../styles/breakpoints'

const styles = css`
  padding: 5px;
  .options {
    background: ${SECONDARY_COLOR} !important;
    font-weight: 500 !important;
  }
`

export default function AgencySelector() {
  const dispatch = useDispatch()
  const agencies = useSelector(state => state.realtors.agencies)
  const selectedAgency = useSelector(state => state.realtors.selectedAgency)
  const history = useHistory()
  const [isDialogPhoneViewOpen, openDialogPhoneView] = useState(false)

  useEffect(() => {
    if (!Boolean(agencies)) {
      dispatch(getAgencies())
    } else {
      history.replace(`/realtor/${selectedAgency}`)
    }
  }, [agencies])

  if (!Boolean(agencies)) {
    return null
  }

  const handleSelection = event => {
    const newAgency = Number(event.target.value)
    dispatch(selectAgency(newAgency))
    history.replace(`/realtor/${newAgency}`)
    handleToggleDialogPhoneView()
  }

  const renderAgenciesChoices = () => {
    return map(agencies, agency => {
      return (
        <option value={agency.id} className="options" key={`agency-${agency.id}`}>
          {agency.name}
        </option>
      )
    })
  }

  const handleToggleDialogPhoneView = () => {
    openDialogPhoneView(!isDialogPhoneViewOpen)
  }

  const renderDialogPhoneView = () => {
    return (
      <Dialog onClose={handleToggleDialogPhoneView} open={isDialogPhoneViewOpen}>
        <DialogTitle>Choisir une agence</DialogTitle>
        <DialogContent>
          <NativeSelect css={styles} onChange={e => handleSelection(e)}>
            {renderAgenciesChoices()}
          </NativeSelect>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <React.Fragment>
      {window.innerWidth < breakpoints.phone ? (
        <IconButton
          onClick={() => handleToggleDialogPhoneView()}
          css={css`
            padding-right: 0px !important;
          `}>
          <StoreIcon
            css={css`
              color: ${PRIMARY_COLOR};
            `}
          />
        </IconButton>
      ) : (
        <NativeSelect css={styles} onChange={e => handleSelection(e)}>
          {renderAgenciesChoices()}
        </NativeSelect>
      )}
      {renderDialogPhoneView()}
    </React.Fragment>
  )
}
