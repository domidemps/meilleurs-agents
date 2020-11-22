/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import map from 'lodash/map'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getAgencies} from '../actions/realtors'
import {NativeSelect} from '@material-ui/core'
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

  const renderAgenciesChoices = agencies => {
    return map(agencies, agency => {
      return (
        <option value={agency.id} selected={agencies[0] === agency} className="options">
          {agency.name}
        </option>
      )
    })
  }

  if (!Boolean(agencies)) {
    return null
  }
  return <NativeSelect css={styles}>{renderAgenciesChoices(agencies)}</NativeSelect>
}
