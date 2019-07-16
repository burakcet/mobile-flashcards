import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const MFC_NOTIFICATION_KEY = 'MobileFlashCards:mfcnotifications'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(MFC_NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: "Let's quiz !",
      body: "👋 don't forget to make quiz for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(MFC_NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(MFC_NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }