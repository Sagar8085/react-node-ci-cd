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
export default function DisplayAllGame(props)
{const[list,setList]=useState()
    const classes = useStyles();

//////////////////////edit form////////////////////////
const[gameId,setGameId]=useState("")
const[categoryId,setCategoryId]=useState("")
const[subcategoryId,setSubcategoryId]=useState("")
const[gameName,setGameName]=useState("")
const[description,setDescription]=useState("")
const[picture,setPicture]=useState({bytes:"",file:"/noimage.webp"})
const[stock,setStock]=useState("")
const[rented,setRented]=useState("")
const[rentamt,setRentamt]=useState("")
const[offer,SetOffer]=useState("")
const[price,setPrice]=useState("")
const[pictureSaveCancel,setPictureSaveCancel]=useState(false)
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


const handlePicture=(event)=>{
    setPicture({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
   setPictureSaveCancel(true)
}
const handleDelete=async()=>{
    var body={"gameid":gameId}
    var result = await postData("game/deletegame",body);
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
    var body={ "gameid":gameId ,"categoryid":categoryId,"subcategoryid":subcategoryId, "gamename":gameName, "description":description,"stock":stock, "rented":rented,
    "rentamt":rentamt,"offer":offer, "price":price}
    var result = await postData("game/editgame",body);
    if(result)
    {
      swal({
        title: "Category Updated Successfully",
        icon: "success",
        dangerMode: true,
      })
    }
    } 
const handleCancelPicture=()=>{
    setPictureSaveCancel(false)
    setPicture({bytes:"",file:`${ServerURL}/images/${getRowData.picture}`})
  }
  const handleClickSavePicture=async()=>{
    var formData = new FormData()
    formData.append("gameid",gameId)
    formData.append("picture",picture.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage("game/editpicture",formData,config);
    if(result)
    {
      swal({
        title: "picture updated Successfully",
        icon: "success",
        dangerMode: true,
      });
      setPictureSaveCancel(false)
    }
  }
const editFormViewGame=()=>{
return(
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.root}> 
                <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
                    Game Interface
                </div>
                    </Grid>
                    <Grid item xs={6}>
        <FormControl variant="outlined"  className={classes.formControl} >
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
            <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label-subcategory">Subcategory Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label-subcategory"
          id="demo-simple-select-outlined-subcategory"
          value={subcategoryId}
          onChange={(event)=>setSubcategoryId(event.target.value)}
          label="Subcategory Id"
        >
        {FillSubcategory()}
          
      </Select>
      </FormControl>
            </Grid>     
                
                <Grid item xs={12}>
                    <TextField label="Game Name" variant="outlined" fullWidth onChange={(event)=>setGameName(event.target.value)} value={gameName}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Description" variant="outlined" fullWidth onChange={(event)=>setDescription(event.target.value)}  value={description}/>
                </Grid>
                <Grid item xs={4} style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:16,fontWeight:'300'}}>Picture</span>
                <input accept="image/*" onChange={(event)=>handlePicture(event)}    className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span" style={{flexDirection:"column"}}>
              <PhotoCamera />
            </IconButton> 
            </label>
            <Avatar  src={picture.file} style={{width:45, height:45, }} variant="rounded"/>
            {pictureSaveCancel?<span><Button color='secondary' onClick={()=>handleClickSavePicture()}>Save</Button><Button color='secondary' onClick={()=>handleCancelPicture()}>Cancel</Button></span>:<></>} 
                </Grid>
              <Grid item xs={12} >
              <TextField label="Stock" variant="outlined" fullWidth  onChange={(event)=>setStock(event.target.value)} value={stock} />
                  </Grid>
                  <Grid item xs={6} >
              <TextField label="Rented" variant="outlined" fullWidth  onChange={(event)=>setRented(event.target.value)}  value={rented}/>
                  </Grid>   
                  <Grid item xs={6} >
              <TextField label="Rent Amount" variant="outlined" fullWidth  onChange={(event)=>setRentamt(event.target.value)} value={rentamt}/>
                  </Grid>
                  <Grid item xs={12}>
                <TextField label="Offer" variant="outlined" fullWidth onChange={(event)=>SetOffer(event.target.value)} value={offer}/>
            </Grid>      
                  <Grid item xs={12} >
              <TextField label="Price" variant="outlined" fullWidth  onChange={(event)=>setPrice(event.target.value)} value={price} />
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
    setGameId(rowData.gameid)
    setCategoryId(rowData.categoryid)
    FillSubcategoryByCategoryId(rowData.categoryid) 
    setSubcategoryId(rowData.subcategoryid)
    setGameName(rowData.gamename)
    setDescription(rowData.description)
    setPicture({bytes:'',file:`${ServerURL}/images/${rowData.picture}`})
    setStock(rowData.stock)
    setRented(rowData.rented)
    setRentamt(rowData.rentamt)
    SetOffer(rowData.offer)
    setPrice(rowData.price)
  };
const handleClose = () => {
    setOpen(false);
    FetchAllGame()
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
        {editFormViewGame()}
      </Dialog>
    </div>
  );
} 








//////////////////////end/////////////////////////////////////////////////////////////////////////////////////////////////////

const FetchAllGame=async()=>{
    var result = await getData("game/displaygame")
        setList(result)
    }
    useEffect(function(){
        FetchAllGame()
    },[])
    function displayAllGame() {
        return (
          <div>
          <MaterialTable
            title="Game List"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Subcategory Id', field: 'subcategoryid' },
              { title: 'Name', field:'gamename' } ,
              { title: 'Description', field:'description' } ,
              { title: 'Picture', field: 'picture',render:rowData=>(<div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width='50' height='50'/></div>)},
              { title: 'Stock', field: 'stock' },
              { title: 'Rented', field: 'rented' },
              { title: 'Rent Amount', field: 'rentamt' },
              { title: 'Offer', field: 'offer' },
              { title: 'Price', field: 'price' }
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
{displayAllGame()}
     </div>
     </div>
 )   
 }