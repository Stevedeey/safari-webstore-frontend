import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Segment,
  Button,
  Checkbox,
  Form,
} from "semantic-ui-react";
import "../styles/Layout/_success-layout.scss";

function SuccessPaymentLayout() {
  return(
    <Container className="success-container">
    <Grid className="">
      <Grid.Column width="10">
            <Segment>
                <img src="./images/success.png"/>
                <h1>Successful</h1>
                <button
            id="success"
            onClick=""
            className="success-class"
          >Home</button>
            </Segment>
      </Grid.Column>
    </Grid>
  </Container>

  );
}

export default SuccessPaymentLayout;
