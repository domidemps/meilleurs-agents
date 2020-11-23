/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import map from 'lodash/map'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {NativeSelect} from '@material-ui/core'
import {useHistory} from 'react-router'

import {getAgencies, selectAgency} from '../actions/realtors'
import {SECONDARY_COLOR} from '../styles/material_ui_raw_theme_file'

const styles = css`
  padding: 5px;
  .options {
    background: ${SECONDARY_COLOR} !important;
    font-weight: 500 !important;
  }
}
`

export default function AgencySelector() {
  const dispatch = useDispatch()
  const agencies = useSelector(state => state.realtors.agencies)
  const selectedAgency = useSelector(state => state.realtors.selectedAgency)
  const history = useHistory()

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
  }

  const renderAgenciesChoices = agencies => {
    return map(agencies, agency => {
      return (
        <option value={agency.id} className="options" key={`agency-${agency.id}`}>
          {agency.name}
        </option>
      )
    })
  }
  return (
    <NativeSelect css={styles} onChange={e => handleSelection(e)}>
      {renderAgenciesChoices(agencies)}
    </NativeSelect>
  )
}
