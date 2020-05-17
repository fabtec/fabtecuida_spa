import React from 'react'
import { Grid, Card, Form, Button, Alert } from 'tabler-react'
import RingLoader from "react-spinners/RingLoader"

// TODO center hor-ver
function LoadingPage (isLoading=true) {
  return (
    <Grid.Row alignItems='center'>
    <Grid.Col></Grid.Col>
    <Grid.Col>

        <RingLoader
          size={150}
          color={"#24426c"}
          loading={isLoading}
        />

    </Grid.Col>
    <Grid.Col></Grid.Col>
  </Grid.Row>
  )
}

export default LoadingPage
