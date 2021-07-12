import React from "react";
import { Grid, GridColumn, Segment, Container } from "semantic-ui-react";
import DashboardLayout from "../../components/userdashboard/DashboardLayout";
import "../../styles/Layout/_myorders_layout.scss";
import Footer from "../../components/Footer";
const MyOrders = (props) => {
  return (
    <>
      <Container fluid className="myorders">
        <DashboardLayout>
          <Grid>
            <h3>My Orders</h3>
          </Grid>
          <Segment>
            <Grid>
              <GridColumn mobile={16} tablet={8} computer={8}>
                <Grid>
                  <GridColumn mobile={8} tablet={8} computer={8}>
                    <img
                      src="../images/Casual Flat Loafers 2.png"
                      alt=""
                      className="order-image"
                    />
                    <button className="order-status">Delivered</button>
                  </GridColumn>
                  <GridColumn mobile={8} tablet={8} computer={8}>
                    <p className="order-title">Casual flat loafers</p>
                    <span className="order-size">Size - EU: 36 US: 5.5</span>
                    <p className="order-ammount">₦ 10,000</p>
                    <span>Qty: 1</span>
                    <p className="order-date">On 20/07/2020</p>
                  </GridColumn>
                </Grid>
              </GridColumn>
              <GridColumn mobile={16} tablet={8} computer={4}>
                <p className="order-payment">Payment Details</p>
                <span className="payment-details">
                  Item’s total - ₦ 10,000{" "}
                </span>
                <p className="payment-details">Delivery fee - ₦ 2,000 </p>
                <span className="payment-details">TOTAL - ₦ 12,000 </span>
              </GridColumn>
              <GridColumn mobile={16} tablet={8} computer={4}>
                <p className="order-payment">Delivery Method</p>
                <span className="payment-detail">Door delivery</span>
                <p className="order-payment">Shipping address</p>
                <span className="payment-detail">
                  Ayokunle Oriolowo 4, Barnawa Close, Barnawa Kaduna.
                </span>
              </GridColumn>
            </Grid>
            <Grid>
              <button className="order-btn order-again-btn">Order Again</button>
              <button className="order-btn request-return-btn">
                Request Return
              </button>
            </Grid>
          </Segment>
        </DashboardLayout>
      </Container>
      <Footer />
    </>
  );
};
export default MyOrders;