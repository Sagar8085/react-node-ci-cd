import React ,{useEffect, useState}from 'react'
import MaterialTable from 'material-table'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import swal from "sweetalert"
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"
import swalhtml from "@sweetalert/with-react"
import {ServerURL, postDataAndImage, getData,postData} from "./FetchNodeServices";
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function DisplaySubcategorypic(props)
{const[list,setList]=useState()
    const classes = useStyles();

//////////////////////edit form////////////////////////

const[imageId,setImageId]=useState("")
const[categoryId,setCategoryId]=useState("")
const[SubcategoryId,setSubcategoryId]=useState("")
const[image,setImage]=useState({bytes:"",file:"/noimage.webp"})
const[imageSaveCancel,setImageSaveCancel]=useState(false)
const[getRowData,setRowData]=useState([])
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
  FillSubcategoryByCategoryId(event.target.value)
 }
 const FillSubcategoryByCategoryId=async(cid)=>{
  var body={categoryid:cid}
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

const handleImage=(event)=>{
    setImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    setImageSaveCancel(true)  
} 

const handleDelete=async()=>{
    var body={"imageid":imageId}
    var result = await postData("subcategorypic/deletesubcategory",body);
      if(result)
      {
        swal({
          title: "Record  Deleted Successfully",
          icon: "success",
          dangerMode: true,
        })
      }else{
        swal({
          title: "Fail to Delete Record",
          icon: "success",
          dangerMode: true,
        })
      }
}
const handleClick=async()=>{
    var error= false
    var msg='<div>'
    if(isBlank(categoryId))
    {error=true
    msg+="<font color='#eb4d4b'><b>Category should not be blank..</b></font><br>"
    }
    if(isBlank(SubcategoryId))
    {error=true
    msg+="<font color='#eb4d4b'><b>Subcategory should not be blank..</b></font><br>"
    } 
    msg+='</div>'
    if(error)
    {
      swalhtml(renderHTML(msg))
    }
    else{
    var body={"imageid":imageId, "categoryid":categoryId,"subcategoryid":SubcategoryId,}
   var result = await postData("subcategorypic/editsubcategory",body);
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
const handleCancelImage=()=>{
    setImageSaveCancel(false)
    setImage({bytes:"",file:`${ServerURL}/images/${getRowData.image}`})
  }
  const handleClickSaveImage=async()=>{
    var formData = new FormData()
    formData.append("imageid",imageId)
    formData.append("image",image.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage("subcategorypic/editimage",formData,config);
    if(result)
    {
      swal({
        title: "picture updated Successfully",
        icon: "success",
        dangerMode: true,
      });
      setImageSaveCancel(false)
    }
  }
const editFormsubcatgorypic=()=>{
return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.root}> 
            <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
            Subcategory Image Interface
            </div>
                </Grid>
                 
         <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label-category">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-category"
          id="demo-simple-select-outlined-category"
          value={categoryId}
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
          value={SubcategoryId}
          onChange={(event)=>setSubcategoryId(event.target.value)}
          label="Subcategory Id"
        >
        {FillSubcategory()}
          
      </Select>
      </FormControl>
            </Grid>         
              
             <Grid item xs={6}>
            <span style={{fontSize:16,fontWeight:'300'}}>Upload Subcategory image</span>
            <input accept="image/*" onChange={(event)=>handleImage(event)} className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> 
        </label> 
            </Grid>
          <Grid item xs={6} style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
          <Avatar  src={image.file} style={{width:60, height:60}} variant="rounded"/>
          {imageSaveCancel?<span><Button color='secondary' onClick={()=>handleClickSaveImage()}>Save</Button><Button color='secondary' onClick={()=>handleCancelImage()}>Cancel</Button></span>:<></>}    
          </Grid> 
             
                
        </Grid>
    </div>

</div>
    )
}
    
    

///////////////////////edit///////////////////////////
////////////////////edit dialog box////////////////////
const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setImageId(rowData.imageid)
    setCategoryId(rowData.categoryid)
    FillSubcategoryByCategoryId(rowData.categoryid) 
    setSubcategoryId(rowData.subcategoryid)
    setImage({bytes:'',file:`${ServerURL}/images/${rowData.image}`})
    
  };
const handleClose = () => {
    setOpen(false);
    FetchAllSubcategorypic()
  }; 
const showEditDialog=()=>{
  return (
    <div>
       <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Games
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleClick()} >
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={handleDelete}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {editFormsubcatgorypic()}
      </Dialog>
    </div>
  );
} 








//////////////////////end/////////////////////////////////////////////////////////////////////////////////////////////////////

const FetchAllSubcategorypic=async()=>{
    var result = await getData("subcategorypic/displaysubcategorypic")
        setList(result)
    }
    useEffect(function(){
        FetchAllSubcategorypic()
    },[])
    function displayAllSubcategorypic() {
        return (
          <div>
          <MaterialTable
            title="Game List"
            columns={[
              {title: 'Category Id', field: 'categoryid' },
              {title: 'Subcategory Id', field: 'subcategoryid' },
              {title: 'Picture', field: 'image',render:rowData=>(<div><img src={`${ServerURL}/images/${rowData.image}`} style={{borderRadius:5}} width='50' height='50'/></div>)},
              
               ]}
            data={list}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit games',
                onClick: (event, rowData) => handleClickOpen(rowData)
              },
            ]}
          />
           {showEditDialog()}
          </div>
        )
      }


 return(
     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:900,marginTop:10,padding:3, border:2}}>   
{displayAllSubcategorypic()}
     </div>
     </div>
 )   
 }