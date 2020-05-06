import React from 'react';
import './App.css';
import { Card, Grid } from "tabler-react";

import "tabler-react/dist/Tabler.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Grid.Row cards>
        <Grid.Col>
          <Card title="Title" body="A" />
        </Grid.Col>
        <Grid.Col>
          <Card
            title="Title"
            body={`orem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        deleniti fugit incidunt.`}
          />
        </Grid.Col>
        <Grid.Col>
          <Card title="Title" body="C" />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row cards deck>
        <Grid.Col>
          <Card title="Title" body="A" />
        </Grid.Col>
        <Grid.Col>
          <Card
            title="Title"
            body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          deleniti fugit incidunt.`}
          />
        </Grid.Col>
        <Grid.Col>
          <Card title="Title" body="C" />
        </Grid.Col>
      </Grid.Row>

      </header>
    </div>
  );
}

export default App;
