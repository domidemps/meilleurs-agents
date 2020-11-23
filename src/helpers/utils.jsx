import dayjs from 'dayjs'
import filter from 'lodash/filter'

export function getRelativeDateTime(date) {
  const dateObject = dayjs(date)
  const now = dayjs()
  // If the date is today, we return the time
  if (dateObject.format('DD/MM/YYYY') === now.format('DD/MM/YYYY')) {
    return dateObject.format('HH:mm')
  } else if (now.diff(dateObject, 'days') < 2) {
    return 'Hier'
  } else if (now.diff(dateObject, 'days') < 3) {
    return 'Avant-hier'
  }
  return dateObject.format('DD/MM/YYYY')
}

export function getUnreadMessagesCounter(agencies, selectedAgency) {
  return filter(agencies, agency => {
    return agency.id === Number(selectedAgency)
  })[0].unread_messages
}