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
import {ServerURL, postDataAndImage , postData} from "./FetchNodeServices";
import swal from "sweetalert"
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"
import swalhtml from "@sweetalert/with-react"
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
const useStyles = makeStyles((theme) => ({
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
export default function Document(props){
const classes = useStyles();
const[doc,setDoc]=useState(" ")
Document.modules={
  toolbar:[
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }], 
    
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block'],
 [{ 'color': [] }, { 'background': [] }],         
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         
],clipboard:{
  matchVisual:false,
}
}
Document.formats=[
  'header','font','size',
  'bold','italic','underline','strike','blockquote',
  'list','bullet','indent','link',
  'image','video'
]
const handleClick=async()=>{
    var error= false
    var msg='<div>'
    if(isBlank(doc))
    {error=true
    msg+="<font color='#eb4d4b'><b> document should not be blank..</b></font><br>"
    }   
    msg+='</div>'
    if(error)
    {
      swalhtml(renderHTML(msg))
    }
    else{
        var body={"docname":doc}
        var result = await postData("document/addnewdoc",body);
        if(result)
        {
          swal({
            title: "Document Required Updated Successfully",
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
            Document Required
            </div>
                </Grid>
            <Grid item xs={12}>
            <ReactQuill value={doc}
            modules={Document.modules}
            formats={Document.formats}
                  onChange={(value)=>setDoc(value)} />
              </Grid>   
            <Grid item xs={12} className={classes.root} >

              <Button variant="contained" color="primary" onClick={()=>handleClick()} fullWidth>Submit</Button>
                </Grid>  
            </Grid>
            </div>
            </div>
)
}