/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import map from 'lodash/map'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {NativeSelect} from '@material-ui/core'

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

  useEffect(() => {
    if (!Boolean(agencies)) {
      dispatch(getAgencies())
    }
  }, [agencies])

  if (!Boolean(agencies)) {
    return null
  }

  const handleSelection = event => dispatch(selectAgency(Number(event.target.value)))

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
