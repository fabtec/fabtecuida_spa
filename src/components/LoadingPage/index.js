import React from 'react'
import RingLoader from 'react-spinners/RingLoader'

// TODO center hor-ver
function LoadingPage (isLoading = true) {
  return (
    <RingLoader
      size={150}
      color='#24426c'
      loading={isLoading}
    />
  )
}

export default LoadingPage
