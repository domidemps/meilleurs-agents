import dayjs from 'dayjs'

import * as methods from '../../helpers/utils'

describe('"utils" methods', () => {
  it('Should return a relative date time, given a date string', () => {
    const now = dayjs()
    const nowString = `${now.format('YYYY-MM-DD')}T${now.format('HH:mm:ss')}`
    expect(methods.getRelativeDateTime(nowString)).toEqual(now.format('HH:mm'))
    expect(methods.getRelativeDateTime(now.add(-1, 'day'))).toEqual('Hier')
    expect(methods.getRelativeDateTime(now.add(-2, 'day'))).toEqual('Avant-hier')
    expect(methods.getRelativeDateTime(now.add(-3, 'day'))).toEqual(
      now.add(-3, 'day').format('DD/MM/YYYY'),
    )
  })
  it('Should return the counter of unread messages of an agency', () => {
    const agencies = [
      {
        id: 101,
        logo: 'http://placehold.it/100x100?text=Agence+101',
        name: 'Agence #101',
        unread_messages: 73,
      },
      {
        id: 102,
        logo: 'http://placehold.it/100x100?text=Agence+102',
        name: 'Agence #102',
        unread_messages: 68,
      },
      {
        id: 103,
        logo: 'http://placehold.it/100x100?text=Agence+103',
        name: 'Agence #103',
        unread_messages: 76,
      },
    ]
    expect(methods.getUnreadMessagesCounter(agencies, '101')).toEqual(73)
    expect(methods.getUnreadMessagesCounter(agencies, '102')).toEqual(68)
    expect(methods.getUnreadMessagesCounter(agencies, '103')).toEqual(76)
  })
})
