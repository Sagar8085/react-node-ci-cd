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
import {ServerURL, postDataAndImage,getData,postData} from "./FetchNodeServices";
import swal from "sweetalert"
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"
import swalhtml from "@sweetalert/with-react"
import { OfflinePinRounded } from "@material-ui/icons";
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
export default function SubcategoryInterface(props){
const classes = useStyles();
const[categoryId,setCategoryId]=useState("")
const[SubcategoryName,setSubcategoryName]=useState("")
const[SubcategoryDescription,setSubcategoryDescription]=useState("")
const[icon,setIcon]=useState({bytes:"",file:"/noimage.webp"})
const[ad,setAd]=useState({bytes:"",file:"/noimage.webp"})
const[adStatus,setAdStatus]=useState("")
const[stock,SetStock]=useState("")
const[rented,SetRented]=useState("")
const[rentamt,SetRentamt]=useState("")
const[offer,SetOffer]=useState("")
const[price,SetPrice]=useState("")
const[listCategory,SetListCategory]=useState([])

const FetchAllCategory=async()=>{
  var result = await getData("categories/displayall")
   SetListCategory(result)
  }
  useEffect(function(){
      FetchAllCategory()
  },[])

const ShowCategory=()=>{
  return listCategory.map((item)=>{
    return(
<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    )
  })
}

const handleIcon=(event)=>{
setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
} 
const handleAd=(event)=>{
  setAd({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  } 
const handleClick=async()=>{
var error= false
var msg='<div>'
if(isBlank(categoryId))
{error=true
msg+="<font color='#eb4d4b'><b>Category should not be blank..</b></font><br>"
}
if(isBlank(SubcategoryName))
{error=true
msg+="<font color='#eb4d4b'><b>Category should not be blank..</b></font><br>"
}
if(isBlank(SubcategoryDescription))
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
if(isBlank(stock))
{error=true
msg+="<font color='#eb4d4b'><b>stock should not be blank ..</b></font><br>"
}
if(isBlank(rented))
{error=true
msg+="<font color='#eb4d4b'><b>Rented should not be blank ..</b></font><br>"
}
if(isBlank(rentamt))
{error=true
msg+="<font color='#eb4d4b'><b>Rent Amount should not be blank ..</b></font><br>"
}
if(isBlank(price))
{error=true
msg+="<font color='#eb4d4b'><b>price should not be blank ..</b></font><br>"
}


msg+='</div>'
if(error)
{
  swalhtml(renderHTML(msg))
}
else{
var formData = new FormData()
formData.append("categoryid",categoryId)
formData.append("subcategoryname",SubcategoryName)
formData.append("subdescription",SubcategoryDescription)
formData.append("subicon",icon.bytes)
formData.append("subad",ad.bytes)
formData.append("subadstatus",adStatus)
formData.append("stock",stock)
formData.append("rented",rented)
formData.append("rentamt",rentamt)
formData.append("offer",offer)
formData.append("price",price)
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
}
return(
<div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.root}> 
            <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
            Subcategory Interface
            </div>
                </Grid>
                 
         <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label-category">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-category"
          id="demo-simple-select-outlined-category"
          //value={age}
          onChange={(event)=>setCategoryId(event.target.value)}
          label="Category Id"
        >
          {ShowCategory()}
          
      </Select>
      </FormControl>
            </Grid>   
                
              
            <Grid item xs={12}>
                <TextField label="Subcategory name" variant="outlined" fullWidth onChange={(event)=>setSubcategoryName(event.target.value)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Description" variant="outlined" fullWidth onChange={(event)=>setSubcategoryDescription(event.target.value)}/>
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
              <TextField label="Stock" variant="outlined" fullWidth onChange={(event)=>SetStock(event.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Rented" variant="outlined" fullWidth onChange={(event)=>SetRented(event.target.value)}/>
            </Grid>  
            <Grid item xs={12}>
                <TextField label="Rent Amount" variant="outlined" fullWidth onChange={(event)=>SetRentamt(event.target.value)}/>
            </Grid> 
            <Grid item xs={12}>
                <TextField label="Offer" variant="outlined" fullWidth onChange={(event)=>SetOffer(event.target.value)}/>
            </Grid>   
            <Grid item xs={12}>
                <TextField label="Price" variant="outlined" fullWidth onChange={(event)=>SetPrice(event.target.value)}/>
            </Grid>  
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          //value={age}
          onChange={(event)=>setAdStatus(event.target.value)}
         // label="Ad Status"
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