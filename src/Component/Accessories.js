import React ,{useState,useEffect}from "react"
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
import {ServerURL, postDataAndImage,getData,postData} from "./FetchNodeServices";
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
        minWidth: 330,
      }, 
  }));
export default function AccessoriesInterface(props){
const classes = useStyles();
const[categoryId,setCategoryId]=useState("")
const[subcategoryId,setSubcategoryId]=useState("")
const[accessoryName,setAccessoryName]=useState("")
const[description,setDescription]=useState("")
const[picture,setPicture]=useState({bytes:"",file:"/noimage.webp"})
const[stock,setStock]=useState("")
const[rented,setRented]=useState("")
const[rentamt,setRentamt]=useState("")
const[offer,SetOffer]=useState("")
const[price,setPrice]=useState("")
const[listCategory,SetListCategory]=useState([])
const[sublistCategory,SetSubListCategory]=useState([])
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

const handleCategoryChange=async(event)=>{
  setCategoryId(event.target.value)
  var body={categoryid:event.target.value}
  var result = await  postData("subcategories/displaysubcategoryintocategory",body)
   SetSubListCategory(result)
}
const FillSubcategory=()=>{
  return sublistCategory.map((item)=>{
    return(
<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    )
  })
}


const handlePicture=(event)=>{
    setPicture({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    } 
const handleClick=async()=>{
    var error= false
var msg='<div>'
if(isBlank(categoryId))
{error=true
msg+="<font color='#eb4d4b'><b>Category id should not be blank..</b></font><br>"
}
if(isBlank(subcategoryId))
{error=true
  msg+="<font color='#eb4d4b'><b>Subcategory  id should not be blank..</b></font><br>"
}
if(isBlank(accessoryName))
{error=true
  msg+="<font color='#eb4d4b'><b>Accessory Name should not be blank..</b></font><br>"
}
if(isBlank(description))
{error=true
  msg+="<font color='#eb4d4b'><b>Description should not be blank..</b></font><br>"
}
if(isBlank(picture.bytes))
{error=true
msg+="<font color='#eb4d4b'><b>Pls select picture ...</b></font><br>"
}
if(isBlank(stock))
{error=true
  msg+="<font color='#eb4d4b'><b>Stock should not be blank..</b></font><br>"
}
if(isBlank(rented))
{error=true
  msg+="<font color='#eb4d4b'><b>Rented should not be blank..</b></font><br>"
}
if(isBlank(rentamt))
{error=true
  msg+="<font color='#eb4d4b'><b>Rent Amount should not be blank..</b></font><br>"
}
if(isBlank(price))
{error=true
  msg+="<font color='#eb4d4b'><b>Price should not be blank..</b></font><br>"
}
msg+='</div>'
if(error)
{
  swalhtml(renderHTML(msg))
}
else{
    var formData = new FormData()
    formData.append("categoryid",categoryId)
    formData.append("subcategoryid",subcategoryId)
    formData.append("accessoryname",accessoryName)
    formData.append("description",description)
    formData.append("picture",picture.bytes)
    formData.append("stock",stock)
    formData.append("rented",rented)
    formData.append("rentamt",rentamt)
    formData.append("offer",offer)
    formData.append("price",price)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage("accessory/accessoryadd",formData,config);
    if(result)
    {
      swal({
        title: "Accessories Submitted Successfully",
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
                Accessories Interface
            </div>
                </Grid>
          <Grid item xs={6}>
        <FormControl variant="outlined"  className={classes.formControl} >
        <InputLabel id="demo-simple-select-outlined-label-category">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-category"
          id="demo-simple-select-outlined-category"
          //value={age}
          onChange={(event)=>handleCategoryChange(event)}
          label="Category Id"
        >
          {ShowCategory()}
          
      </Select>
      </FormControl>
            </Grid>   
                
        <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label-subcategory">Subcategory Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-subcategory"
          id="demo-simple-select-outlined-subcategory"
          //value={age}
          onChange={(event)=>setSubcategoryId(event.target.value)}
          label="Subcategory Id"
        >
        {FillSubcategory()}
          
      </Select>
      </FormControl>
            </Grid>  
            <Grid item xs={12}>
              <TextField label="Accessories Name" variant="outlined" fullWidth onChange={(event)=>setAccessoryName(event.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField label="Description" variant="outlined" fullWidth onChange={(event)=>setDescription(event.target.value)} />
            </Grid>
            <Grid item xs={4} style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
            <span style={{fontSize:16,fontWeight:'300'}}>Picture</span>
            <input accept="image/*" onChange={(event)=>handlePicture(event)}   className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> 
        </label> 
        <Avatar  src={picture.file} style={{width:45, height:45}} variant="rounded"/>
            </Grid>
          <Grid item xs={12} >
          <TextField label="Stock" variant="outlined" fullWidth  onChange={(event)=>setStock(event.target.value)} />
              </Grid>
              <Grid item xs={6} >
          <TextField label="Rented" variant="outlined" fullWidth  onChange={(event)=>setRented(event.target.value)} />
              </Grid>   
              <Grid item xs={6} >
          <TextField label="Rent Amount" variant="outlined" fullWidth  onChange={(event)=>setRentamt(event.target.value)} />
              </Grid> 
              <Grid item xs={12}>
                <TextField label="Offer" variant="outlined" fullWidth onChange={(event)=>SetOffer(event.target.value)}/>
            </Grid>      
              <Grid item xs={12} >
          <TextField label="Price" variant="outlined" fullWidth  onChange={(event)=>setPrice(event.target.value)} />
              </Grid>
              <Grid item xs={6} className={classes.root}>
              <Button  variant="contained" color="primary" fullWidth  onClick={()=>handleClick()}>Save</Button>
                </Grid> 
                <Grid item xs={6} className={classes.root} >
              <Button variant="contained" color="primary" fullWidth>Reset</Button>
                </Grid>     
                </Grid>  

        </div>
        </div>
)
}