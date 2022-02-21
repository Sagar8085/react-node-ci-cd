import React ,{useState,useEffect} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Divider from "@material-ui/core/Divider"
import Footer from "./footer"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from "@material-ui/core/IconButton"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {ServerURL, postDataAndImage,getData,postData} from "../FetchNodeServices";
import Paper from '@material-ui/core/Paper';
import QtySpinner from './QtySpinner';
import {useDispatch} from "react-redux"
const useStyles = makeStyles((theme) => ({
   
    paperStyle:{
      justifyContent:'flex-start',
      display:'flex',
      padding:10,
      height:310,
      width:215,
      margin:10,
      borderRadius:10,
      flexDirection:'column'

    }, 

  imageView:{
    width:160,
    height:160,
    justifyContent:'center',
    alignItems:"center",
    padding:10,
    margin:2,
    cursor:'pointer',
    "&:hover":{
      transform:'scale(1.25)',
      transition:"all 0.5s ease 0s",
    }

  },
  arrowStyle:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }

}))
export default function ConsoleList(props){
  var dispatch = useDispatch()
    const classes = useStyles();
    const[listConsole,SetListconsole]=useState([]) 
   const[pageRefresh,SetPageRefresh]=useState(false)  
    //console.log(props.history.location.state.categoryid);
   var categoryid=props.history.location.state.categoryid;
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };

     
    
        useEffect(function(){
            FetchAllSubcategories()
           

        },[])
  
////////////////////Qty change////////////////////////////////////
const handleQtyChange=(value,item)=>{
  if(value==0)
  {
    dispatch({type:'Remove Cart', payload:[item.subcategoryid]})
    window.location.reload();
  }
  else{
  item["qtydemand"]=value
  item['duration']=1;
  var cd = getCurrentDate()
  //alert(cd)
  item['startdate']= cd;
  var ed = addDays(1,cd)
 // alert(ed)
  item['enddate']= ed;
  item['time']='Day'
  dispatch({type:"Add Cart",payload:[item.subcategoryid,item]})
}
SetPageRefresh(!pageRefresh)
}

////////////////////end////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////date managment///////////////////////////////////////////////////////////////////////////////////////////
function getCurrentDate()
{
  var d = new Date()
  var dd = d.getDate()
  if(dd<=9)
  {
    dd ='0'+dd;
  }
  var mm = d.getMonth()+1
  if(mm<=9)
  {
    mm ='0'+mm;
  } 
  var cd = d.getFullYear()+"-"+mm+"-"+dd
  return cd 
}
 function addDays(days,dt)
{
  var d = new Date(dt)
d.setDate(d.getDate()+days)
var dd = d.getDate()
  if(dd<=9)
  {
    dd ='0'+dd;
  }
  var mm = d.getMonth()+1
  if(mm<=9)
  {
    mm ='0'+mm;
  } 
  var cd = d.getFullYear()+"-"+mm+"-"+dd
  return cd 
}



//////////////////////end////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////subcategory item display///////////////////////////////////////////////////////////////////////////////////////////////////// 
    const FetchAllSubcategories=async()=>{
       var body={"categoryid":categoryid}
         var result = await postData("subcategories/displaysubcategorybycategoryid",body)
         SetListconsole(result)
        }  
    
    
    const ShowConsole=()=>{
            return listConsole.map((item)=>{
              return(    
             <div>
               <div style={{width:215, display:'flex',flexDirection:'column',justifyContent:'center', alignItems:"center",padding:10, margin:15,}}>
            <Paper elevation={3} className={classes.paperStyle}>
              <div className={classes.imageView}>
            <img src={`${ServerURL}/images/${item.subicon}`} width="150" onClick={()=>props.history.push({'pathname':'/productview'},{"product":item})
          } />
            </div> 
             <div style={{fontSize:15,fontWeight:'bold',padding:10}}>
             
                 {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+"..."}
                 </div>
                <div style={{fontSize:16,padding:10}}>
                  Day Price:<s>&#8377;{item.rentamt}</s> <span><b>&#8377;{item.offer}</b></span>  
                </div>
                <div style={{fontSize:15,padding:10}}>
              <span style={{color:'green'}}><b>You Save</b></span><b> &#8377;{item.rentamt-item.offer}    </b>
            </div>
            <div style={{display:'flex',justifyContent:'center' ,alignItems:"center"}}> 
                <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)}/>
            </div>
                 </Paper>
                 </div>
            </div>
              )
            })
          } 
//////////////////end//////////////////////////////////////////////     
///////////////////Game////////////////////////////////////////////

///////////////////end///////////////////////////////////////////////
///////////////////Accessories///////////////////////////////////////





//////////////////end////////////////////////////////////////////////



return(
           <div>
        <Header history={props.history}/>
        <div>
        <div style={{flexDirection:"row",justifyContent:'left', padding:8, display:'flex',flexWrap:"wrap"}}>
            {ShowConsole()}
            </div>
    </div>

       
         <div style={{marginTop:80}}>
         <Footer history={props.history}/>
     </div>

        </div>
         
        
        
        
    )
}