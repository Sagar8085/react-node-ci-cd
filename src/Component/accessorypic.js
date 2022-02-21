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
import { Delete } from "@material-ui/icons";
import {DropzoneArea} from 'material-ui-dropzone'
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
export default function Accessorypic(props){
const classes = useStyles();
const[categoryId,setCategoryId]=useState("")
const[SubcategoryId,setSubcategoryId]=useState("")
const[accessoryId,setAccessoryId]=useState("")
const[image,setImage]=useState({bytes:"",file:"/noimage.webp"})
const[listCategory,SetListCategory]=useState([])
const[sublistCategory,SetSubListCategory]=useState([])
const[accessorylistCategory,SetAccessoryListCategory]=useState([])
const[dataSources,SetDataSources]=useState([])
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
    var result = await postData("subcategories/displaysubcategoryintocategory",body)
     SetSubListCategory(result)
  }
  const FillSubcategory=()=>{
    return sublistCategory.map((item)=>{
      return(
  <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }
  const handleSubcategoryChange=async(event)=>{
    setSubcategoryId(event.target.value)
   var body={subcategoryid:event.target.value}
    var result = await postData("accessory/displayaccessoryintosubcategory",body)
    SetAccessoryListCategory(result)
  }
  const FillAccessorycategory=()=>{
    return accessorylistCategory.map((item)=>{
      return(
  <MenuItem value={item.accessoryid}>{item.accessoryname}</MenuItem>
      )
    })
  }   


const handleImage=(event)=>{
setImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
} 
//////////////////image uploader//////////////////////////////////////////////////////////////////////////////////////
const handleSave=async(files) => {
  SetDataSources(files)
  console.log("Select files", files);
}
 const handleClose=()=>{
   Delete();
  
} 

const handleClick=async() => {
  var formData = new FormData()
    formData.append("categoryid",categoryId)
    formData.append("subcategoryid",SubcategoryId) 
    formData.append("accessoryid",accessoryId)
    dataSources.map((item,index)=>{
      formData.append("image"+index,item)
    })
    var config={headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage("accessorypic/addnewaccessorypic",formData,config);    
if(result)
{
  swal({
    title: "Accessories Submitted Successfully",
    icon: "success",
    dangerMode: true,
  })
}


    
  };
  
 




////////////////////end///////////////////////////////////////////////////////////////////////////////////////////////  

return(
<div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.root}> 
            <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
            Accessories Image Interface
            </div>
                </Grid>
                 
         <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
            <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label-subcategory">SubCategory Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-subcategory"
          id="demo-simple-select-outlined-subcategory"
          //value={age}
          onChange={(event)=>handleSubcategoryChange(event)}
          label="Subcategory Id"
        >
        {FillSubcategory()}
          
      </Select>
      </FormControl>
            </Grid>         
            <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label-accessory">Accessories Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-accessory"
          id="demo-simple-select-outlined-accessory"
          //value={age}
         onChange={(event)=>setAccessoryId(event.target.value)}
          label="Accessories Id"
        >
        
        {FillAccessorycategory()}  
      </Select>
      </FormControl>
            </Grid>         
            
              <Grid item xs={12}>
              <DropzoneArea
                    
                    onChange={(files)=>handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp',]}
                    //showPreviews={true}
                    maxFileSize={5000000}
                    onClose={()=>handleClose()}
                    filesLimit={10}
                />
             
                </Grid>    
                <Grid item xs={6} className={classes.root} >
   <Button variant="contained" color="primary" onClick={()=>handleClick()} fullWidth>Submit</Button>
  </Grid>  
             
                <Grid item xs={6} className={classes.root} >
              <Button variant="contained" color="primary" fullWidth>Reset</Button>
                </Grid>      
        </Grid>
    </div>

</div>
    )
}