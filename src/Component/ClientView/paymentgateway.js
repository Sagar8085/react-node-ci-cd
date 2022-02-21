import React, {useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {ServerURL} from "../FetchNodeServices";
const styles = (theme) => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
    },
    table: {
      minWidth: 700,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    margin: {
      marginRight: "80%",
      paddingLeft: "",
    },
    button: {
      margin: theme.spacing.unit,
    },
  
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });
  const PaymentGateway = (props) => { 
    var userData = useSelector((state) => state.user);
    var cart = useSelector((state) => state.cart);
    var user = Object.values(userData)[0];
    var keys = Object.keys(cart);
    var values = Object.values(cart);
    var totalamt = values.reduce(calculation, 0);
    var totalsaving = values.reduce(calculationsaving, 0);
    var actualamt = values.reduce(actualcalculation, 0);
  
    function actualcalculation(a, b) {
      var price = b.rentamt * b.qtydemand * b.duration;
      return a + price;
    }
  
    function calculation(a, b) {
      var price =
        b.offer > 0
          ? b.offer * b.qtydemand * b.duration
          : b.rentamt * b.qtydemand * b.duration;
      return a + price;
    }
    function calculationsaving(a, b) {
      var price = (b.rentamt - b.offer) * b.qtydemand * b.duration;
      return a + price;
    }
    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH",
        amount:totalamt*100, //  = INR 1
        name: "GameZone",
        description: 'Gurugam Haryana',
        image:
          "https://i.pinimg.com/originals/d1/d2/66/d1d26618a7876afa7b99f2afebf6c790.jpg",
        handler: function (response) {
             
            alert(response.razorpay_payment_id);
        },
        prefill: {
          name: user.firstname + " " + user.lastname,
          contact: user.mobileno,
          email: user.emailid,
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "#1e6b7b ",
          hide_topbar:false,
        },
      };
    
      const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);  
      const { classes } = props;

      return (
        <>
          <center>
            <Button
              variant="contained"
              color="primary"
              // size="large"
              // className={classes.button}
              onClick={()=>openPayModal()}
            >
              <h3>Proceed to Pay</h3>
            </Button>
          </center>
        </>
      );
    };
    export default withStyles(styles)(PaymentGateway);  