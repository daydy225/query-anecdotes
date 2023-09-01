import { useReducer, useContext, createContext } from 'react'

export const NotificationContext = createContext(null)

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const useNotification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const setNotification = notification => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
  }

  const clearNotification = () => {
    notificationDispatch({
      type: 'CLEAR_NOTIFICATION',
    })
  }

  return {
    notification,
    setNotification,
    clearNotification,
  }
}

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
