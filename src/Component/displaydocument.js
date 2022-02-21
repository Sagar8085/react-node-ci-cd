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
import {ServerURL, postDataAndImage, getData,postData} from "./FetchNodeServices";
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
    width:500,
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
export default function DisplayDocument(props)
{const classes = useStyles();
const[list,setList]=useState()
const[doc,setDoc]=useState(" ")
 const[docid,setDocid]=useState(" ")
 const[getRowData,setRowData]=useState([])
///////////////Edit form//////////////////////////////

const handleDelete=async()=>{
var body={"docid" :docid}
var result = await postData("document/deletedoc",body);
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
var body={"docid" :docid , "docname": doc}
var result = await postData("document/editdoc",body);
if(result)
{
  swal({
    title: "Term & Condition Updated Successfully",
    icon: "success",
    dangerMode: true,
  })
}
}


const editFormView=()=>{
return(
<div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.root}> 
            <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
            Document Required
            </div>
                </Grid>
            <Grid item xs={12}>
                <TextField label="Document" variant="outlined" fullWidth onChange={(event)=>setDoc(event.target.value)} value={doc}/>
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
    setDocid(rowData.docid)
    setDoc(rowData.docname)
    
  };

  const handleClose = () => {
    setOpen(false);
    FetchAllDocument()
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
              Edit/Delete Terms
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick }>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={handleDelete}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {editFormView()}
      </Dialog>
    </div>
  );
} 



//////////////end///////////////////////////////////////////




 const FetchAllDocument=async()=>{
    var result = await getData("document/displaydoc")
        setList(result)
    }
    useEffect(function(){
        FetchAllDocument()
    },[])
    function displayAll() {
        return (
          <div>
          <MaterialTable
            title="Document Required List"
            columns={[
              { title: 'Id', field: 'docid' },
              { title: 'Document', field: 'docname' },
              
               ]}
            data={list}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Document',
                onClick: (event, rowData) => handleClickOpen(rowData),
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
{displayAll()}
     </div>
     </div>
 )   
 }