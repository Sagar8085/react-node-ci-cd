import React ,{useState}from "react"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {ServerURL, postDataAndImage} from "./FetchNodeServices";
import swal from "sweetalert"
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"
import swalhtml from "@sweetalert/with-react"
const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

      },
    subdiv:{
        padding:20,
        width:700,
        marginTop:20,
        background:"white"
    },
    input: {
        display: 'none',
      },
      formControl: {
        minWidth: 690,
      }, 
  }));
export default function CategoryInterface(props){
const classes = useStyles();
const[categoryName,setCategoryName]=useState("")
const[categoryDescription,setCategoryDescription]=useState("")
const[icon,setIcon]=useState({bytes:"",file:"/noimage.webp"})
const[ad,setAd]=useState({bytes:"",file:"/noimage.webp"})
const[adStatus,setAdStatus]=useState("")
const handleIcon=(event)=>{
setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
} 
const handleAd=(event)=>{
  setAd({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  } 
const handleClick=async()=>{
var error= false
var msg='<div>'
if(isBlank(categoryName))
{error=true
msg+="<font color='#eb4d4b'><b>Category should not be blank..</b></font><br>"
}
if(isBlank(categoryDescription))
{error=true
  msg+="<font color='#eb4d4b'><b>Category should not be blank..</b></font><br>"
}
if(isBlank(icon.bytes))
{error=true
msg+="<font color='#eb4d4b'><b>Pls select picture select category icon..</b></font><br>"
}
if(isBlank(ad.bytes))
{error=true
msg+="<font color='#eb4d4b'><b>Pls select picture for the advertisment..</b></font><br>" 
}
if(isBlank(adStatus))
{error=true
msg+="<font color='#eb4d4b'><b>pls choose ad status..</b></font><br>"
}
msg+='</div>'
if(error)
{
  swalhtml(renderHTML(msg))
}
else{
var formData = new FormData()
formData.append("categoryname",categoryName)
formData.append("description",categoryDescription)
formData.append("icon",icon.bytes)
formData.append("ad",ad.bytes)
formData.append("adstatus",adStatus)
var config={headers:{"content-type":"multipart/form-data"}}
var result = await postDataAndImage("categories/addnewcategory",formData,config);
if(result)
{
  swal({
    title: "Category Submitted Successfully",
    icon: "success",
    dangerMode: true,
  })
}
}
}
return(
<div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.root}> 
            <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
            Category Interface
            </div>
                </Grid>
            <Grid item xs={12}>
                <TextField label="Category name" variant="outlined" fullWidth onChange={(event)=>setCategoryName(event.target.value)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Description" variant="outlined" fullWidth onChange={(event)=>setCategoryDescription(event.target.value)}/>
            </Grid>
            <Grid item xs={6}>
            <span style={{fontSize:16,fontWeight:'300'}}>Upload Category icon</span>
            <input accept="image/*" onChange={(event)=>handleIcon(event)} className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> 
        </label> 
            </Grid>
          <Grid item xs={6} style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
          <Avatar  src={icon.file} style={{width:60, height:60}} variant="rounded"/>
              </Grid> 
              <Grid item xs={6}>
            <span style={{fontSize:16,fontWeight:'300'}}>Upload Category Ad</span>
            <input accept="image/*"onChange={(event)=>handleAd(event)}   className={classes.input} id="icon-button-ad" type="file" />
      <label htmlFor="icon-button-ad">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> 
        </label> 
        </Grid>
        <Grid item xs={6} style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
        <Avatar  src={ad.file} style={{width:60, height:60}} variant="rounded"/>
        </Grid>
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          //value={age}
          onChange={(event)=>setAdStatus(event.target.value)}
          //label="Ad Status"
        >
          <MenuItem value={"Activate"}>Activate</MenuItem>
          <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
           </Select>
      </FormControl>
            </Grid> 
            <Grid item xs={6} className={classes.root}>
              <Button onClick={()=>handleClick()} variant="contained" color="primary" fullWidth>Save</Button>
                </Grid> 
                <Grid item xs={6} className={classes.root} >
              <Button variant="contained" color="primary" fullWidth>Reset</Button>
                </Grid>      
        </Grid>
    </div>

</div>
    )
}