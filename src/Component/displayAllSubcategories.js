import React ,{useEffect, useState}from 'react'
import MaterialTable from 'material-table'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {ServerURL, postDataAndImage, getData, postData} from "./FetchNodeServices";
import swal from "sweetalert"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
    minWidth: 690,
  }, 

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DisplayAllSubcategory(props)
{const[list,setList]=useState()
  const classes = useStyles();
///////////////Edit form/////////////////////////////
const[subcategoryId,setSubcategoryId]=useState("")
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
const[subiconSaveCancel,setSubIconSaveCancel]=useState(false)
const[subadSaveCancel,setSubAdSaveCancel]=useState(false)
const[getRowData,setRowData]=useState([])
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
  setSubIconSaveCancel(true)
} 
  const handleAd=(event)=>{
    setAd({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    setSubAdSaveCancel(true)
  } 
  const handleDelete=async()=>{
    var body={"subcategoryid":subcategoryId}
    var result = await postData("subcategories/deletesubcategory",body);
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
  var body={"subcategoryid":subcategoryId,"categoryid":categoryId,
  "subcategoryname":SubcategoryName,
  "subdescription":SubcategoryDescription,"stock":stock,
  "rented":rented,"rentamt":rentamt,"offer":offer,"price":price,"subadstatus":adStatus }
  var result = await postData("subcategories/editsubcategory",body);
if(result)
{
  swal({

    title: "Subcategory Submitted Successfully",
    icon: "success",
    dangerMode: true,
  })
}
}
const handleCancelSubIcon=()=>{
  setSubIconSaveCancel(false)
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.subicon}`})
}
const handleCancelSubAd=()=>{
  setSubAdSaveCancel(false)
  setAd({bytes:"",file:`${ServerURL}/images/${getRowData.subad}`})
}
const handleClickSaveSubIcon=async()=>{
  var formData = new FormData()
  formData.append("subcategoryid",subcategoryId)
  formData.append("subicon",icon.bytes)
  var config={headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage("subcategories/editicon",formData,config);
  if(result)
  {
    swal({
      title: "Icon updated Successfully",
      icon: "success",
      dangerMode: true,
    })
    setSubIconSaveCancel(false)
  }
}
const handleClickSaveSubAd=async()=>{
  var formData = new FormData()
  formData.append("subcategoryid",subcategoryId)
  formData.append("subad",ad.bytes)
  var config={headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage("subcategories/editad",formData,config);
  if(result)
  {
    swal({
      title: "Ad updated Successfully",
      icon: "success",
      dangerMode: true,
    });
    setSubAdSaveCancel(false)
  }
}
const editFormViewSubcategory=()=>{
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
          value={categoryId}
          onChange={(event)=>setCategoryId(event.target.value)}
          label="Category Id"
        >
          {ShowCategory()}
          
      </Select>
      </FormControl>
            </Grid>   
                 <Grid item xs={12}>
                <TextField label="Subcategory name" variant="outlined" fullWidth onChange={(event)=>setSubcategoryName(event.target.value)} value={SubcategoryName}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Description" variant="outlined" fullWidth onChange={(event)=>setSubcategoryDescription(event.target.value)} value={SubcategoryDescription} />
            </Grid>
            <Grid item xs={6}>
            <span style={{fontSize:16,fontWeight:'300'}}> Edit Upload Category icon</span>
            <input accept="image/*" onChange={(event)=>handleIcon(event)} className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> 
        </label> 
            </Grid>
          <Grid item xs={6} style={{display:"flex", justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
          <Avatar  src={icon.file} style={{width:60, height:60}} variant="rounded"/>
          {subiconSaveCancel?<span><Button color='secondary' onClick={()=>handleClickSaveSubIcon()}>Save</Button><Button color='secondary' onClick={()=>handleCancelSubIcon()}>Cancel</Button></span>:<></>}    </Grid> 
              <Grid item xs={6}>
            <span style={{fontSize:16,fontWeight:'300'}}> Edit Upload Category Ad</span>
            <input accept="image/*"onChange={(event)=>handleAd(event)}   className={classes.input} id="icon-button-ad" type="file" />
      <label htmlFor="icon-button-ad">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> 
        </label> 
        </Grid>
        <Grid item xs={6} style={{display:"flex", justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
        <Avatar  src={ad.file} style={{width:60, height:60}} variant="rounded"/>
        {subadSaveCancel?<span><Button color='secondary' onClick={()=>handleClickSaveSubAd()}>Save</Button><Button color='secondary' onClick={()=>handleCancelSubAd()}>Cancel</Button></span>:<></>}
        </Grid>
        <Grid item xs={12}>
              <TextField label="Stock" variant="outlined" fullWidth onChange={(event)=>SetStock(event.target.value)} value={stock} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Rented" variant="outlined" fullWidth onChange={(event)=>SetRented(event.target.value)} value={rented} />
            </Grid>  
            <Grid item xs={12}>
                <TextField label="Rent Amount" variant="outlined" fullWidth onChange={(event)=>SetRentamt(event.target.value)} value={rentamt}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Offer" variant="outlined" fullWidth onChange={(event)=>SetOffer(event.target.value)} value={offer}/>
            </Grid>    
            <Grid item xs={12}>
                <TextField label="Price" variant="outlined" fullWidth onChange={(event)=>SetPrice(event.target.value)} value={price}/>
            </Grid> 
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={adStatus}
          onChange={(event)=>setAdStatus(event.target.value)}
          //label="Ad Status"
        >
          <MenuItem value={"Activate"}>Activate</MenuItem>
          <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
           </Select>
      </FormControl>
            </Grid> 
                
        </Grid>
    </div>

</div>
    )
}
///////////////end///////////////////////////////////
////////////edit dialog//////////////////////////////////////
const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setSubcategoryId(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setSubcategoryName(rowData.subcategoryname)
    setSubcategoryDescription(rowData.subdescription)
    setIcon({bytes:'',file:`${ServerURL}/images/${rowData.subicon}`})
    setAd({bytes:'',file:`${ServerURL}/images/${rowData.subad}`})
    SetStock(rowData.stock)
    SetRented(rowData.rented)
    SetRentamt(rowData.rentamt)
    SetOffer(rowData.offer)
    SetPrice(rowData.price)
    setAdStatus(rowData.subadstatus)
  };


  const handleClose = () => {
    setOpen(false);
    FetchAllSubCategory()
  }; 
const showEditDialogSubcategory=()=>{
  return (
    <div>
       <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Subcategories
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={handleDelete}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {editFormViewSubcategory()}
      </Dialog>
    </div>
  );
} 



//////////////end///////////////////////////////////////////




 const FetchAllSubCategory=async()=>{
    var result = await getData("subcategories/displayallsubcategory")
        setList(result)
    }
    useEffect(function(){
        FetchAllSubCategory()
    },[])
    function displayAll() {
        return (
          <div>
          <MaterialTable
            title="Subcategory List"
            columns={[
              { title: 'Id', field: 'subcategoryid' },
              { title: 'Category ID', field: 'categoryid' },
              { title: 'Name', field: 'subcategoryname' },
              { title: 'Description', field:'subdescription' } ,
              { title: 'Icon', field: 'subicon',render:rowData=>(<div><img src={`${ServerURL}/images/${rowData.subicon}`} style={{borderRadius:5}} width='50' height='50'/></div>)},
              { title: 'Ad', field: 'subad' ,render:rowData=>(<div><img src={`${ServerURL}/images/${rowData.subad}`} style={{borderRadius:5}} width='50' height='50'/></div>)},
             
              { title: 'Stock', field: 'stock' },
              { title: 'Rented', field: 'rented' },
              { title: 'Rent Amount', field: 'rentamt' },
              { title: 'Offer', field: 'offer' },
              { title: 'Price', field: 'price' },
              { title: 'Adstatus', field: 'subadstatus' },
            ]}
            data={list}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit subcategories',
                onClick: (event, rowData) => handleClickOpen(rowData),
              },
            ]}
          />
          {showEditDialogSubcategory()}
          </div>
        )
      }


 return(
     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:900,marginTop:10,padding:3, border:2}}>   
{displayAll()}
     </div>
     </div>
 )   
 }