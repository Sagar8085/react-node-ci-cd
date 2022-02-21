import React ,{useState,useEffect}from "react"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {ServerURL, postDataAndImage,getData,postData} from "./Component/FetchNodeServices";
import swal from "sweetalert"

import renderHTML from "react-render-html"
import swalhtml from "@sweetalert/with-react"
import { Component } from "react";
class Registration extends Component{
    constructor(props) {
        super(props);
        this.state={
email:"", //yha par state ka name mention krte hai
password:"",
        }
    }
    handleEmail=(event)=>{
        this.setState({email:event.target.value})
//ye hai par state ki value ko set krte hai 
    }
    handlePassword=(event)=>{
        this.setState({password:event.target.value})

    }
    handleClick=async()=>{
        var formData = new FormData()

        formData.append("emailid",this.state.email)//yha apni value set hoti hai jse apne hooks me krte the
                        //ye database ki field name hona chaiye
        formData.append("password",this.state.password)
        
        var config={headers:{"content-type":"multipart/form-data"}}
        var result = await postDataAndImage("subcategories/addnewsubcategory",formData,config);
        if(result)
        {
          swal({
            title: "Subcategory Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
        }
    }
 render(){
  return(
      <div>
<Grid item xs={12}>
                <TextField label="email" variant="outlined" fullWidth onChange={(event)=>this.handleEmail(event)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="password" variant="outlined" fullWidth onChange={(event)=>this.handlePassword(event)}/>
            </Grid>
            <Grid item xs={6} >
              <Button onClick={(event)=>this.handleClick(event)} variant="contained" color="primary" fullWidth>Save</Button>
                </Grid> 
      </div>
  )
}
    }

export default Registration;