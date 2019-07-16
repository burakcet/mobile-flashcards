import React from 'react'
import { Text } from 'react-native'
import { black } from '../utils/colors'

export default function QuizHeader ({pageInfo}) {
  return (
    <Text style={{color: black, fontSize: 25}}>
    {pageInfo}
  </Text>
  )
}