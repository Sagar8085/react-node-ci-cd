import React,{useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  
  orange: {
    color: theme.palette.getContrastText('#1e6b7b'),
    backgroundColor:'#1e6b7b ',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
 
}));

export default function QtySpinner(props) {
  const classes = useStyles();
  const[value,setValue]=useState(props.value)
  const handleIncrement=()=>{
    var c=value+1
      setValue(c)
      props.onChange(c)
      
  }
  const handleDecrement=()=>{
      var c=value-1;
      if(c>=0)
      setValue(c)
      props.onChange(c)
  }
  return (<div>
    {value==0?(<div style={{display:"flex", flexDirection:'row' ,alignItems:"center"}}><Button variant="contained" style={{color:"#fff",fontSize:'14',width:"180",background:"#1e6b7b"}} onClick={()=>handleIncrement()}>ADD TO CART</Button></div>):(<div style={{display:"flex", flexDirection:'row' ,alignItems:"center"}}><Avatar  onClick={()=>handleDecrement()} style={{marginRight:15,}} className={classes.orange}>-</Avatar>
    <div style={{fontSize:16,fontWeight:'bold',width:12,display:'flex',justifyContent:'center'}}>{value}</div>
    <Avatar  onClick={()=>handleIncrement()} style={{marginLeft:15,}} className={classes.orange}>+</Avatar></div>)}
     </div>
   )
}