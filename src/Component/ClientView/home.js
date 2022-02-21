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
import QtySpinner from "./QtySpinner"
import {useDispatch} from "react-redux"
const useStyles = makeStyles((theme) => ({
    root:{
        padding:10,
        display:'flex',
        flexDirection:"column",
    },
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
export default function Home(props){
  var dispatch = useDispatch() 
    const classes = useStyles();
    const[listCategory,SetListCategory]=useState([]) 
    const[listSuboffer,SetListSuboffer]=useState([])
    const[listgameoffer,SetListGameoffer]=useState([])
    const[listAccessoryoffer,SetListAcessoryoffer]=useState([])
    const[pageRefresh,SetPageRefresh]=useState(false) 
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };

      var itemsettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000,
        arrows:false,
      };

    const FetchAllCategory=async()=>{
        var result = await getData("categories/displayall")
         SetListCategory(result)
        }
        useEffect(function(){
            FetchAllCategory()
            FetchAllSuboffer()
            FetchAllGameoffer()
            FetchAllAccessoryoffer()

        },[])
    const ShowCategory=()=>{
            return listCategory.map((item)=>{
              return(    
             <div  onClick={()=>handleConsoleList(item.categoryid)} style={{border:'1px solid #ecfof1', justifyContent:'center', alignItems:"center", display:'flex', flexDirection:'column' ,padding:10, margin:5}}>
             <img src={`${ServerURL}/images/${item.icon}`} width="50%"  />
             
             <div style={{fontSize:22,fontWeight:'bold',padding:10}}>
                 {item.categoryname}
                 </div>
                 </div>
              )
            })
          } 
  ///////////////////////Consolelist.js/////////////////////////////////////
const handleConsoleList=(categoryid)=>{
  props.history.push({'pathname':'/consolelist'},{"categoryid":categoryid})
}
 ///////////////////////end////////////////////////////////////////////////
 ////////////////////qty change/////////////////////////////////////////////////////////
 const handleQtyChange=(value,item)=>{
  if(value==0)
  {
    dispatch({type:'Remove Cart', payload:[item.subcategoryid]})
  }
  else{
  item["qtydemand"]=value
  dispatch({type:"Add Cart",payload:[item.subcategoryid,item]})
}
SetPageRefresh(!pageRefresh)
}
 /////////////////////////end////////////////////////////////////////////////////////
////////////////////slider of category////////////////////////////////////
const ShowSlider=()=>{
    return listCategory.map((item)=>{
      return(    
     <div >
     <img src={`${ServerURL}/images/${item.ad}`} width="100%" />
     
    
         </div>
      )
    })
  } 


////////////////////end///////////////////////////////////////////////////
/////////////////subcategory offer////////////////// 
    const FetchAllSuboffer=async()=>{
        var result = await getData("subcategories/subcategoryoffer")
         SetListSuboffer(result)
        }  
    
    
    const ShowOffer=()=>{
            return listSuboffer.map((item)=>{
              return(    
             <div>
               <div style={{width:215, display:'flex',flexDirection:'column',justifyContent:'center', alignItems:"center",padding:10, margin:5,}}>
            <Paper elevation={3} className={classes.paperStyle}>
              <div  className={classes.imageView}>
            <img src={`${ServerURL}/images/${item.subicon}`} width="150"  />
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
               {/*<QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)}/>*/}
              </div>
                 </Paper>
                 </div>
            </div>
              )
            })
          } 
//////////////////end//////////////////////////////////////////////     
///////////////////Game////////////////////////////////////////////
const FetchAllGameoffer=async()=>{
  var result = await getData("game/gameoffer")
   SetListGameoffer(result)
  }
  const ShowGame=()=>{
    return listgameoffer.map((item)=>{
      return(    
     <div>
     <div style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:"center",padding:10, margin:5,}}>
     <Paper elevation={3} className={classes.paperStyle} >
              <div  className={classes.imageView} >
     <img src={`${ServerURL}/images/${item.picture}`} width="150"  /> 
     </div>
     <div style={{fontSize:15,fontWeight:'bold',padding:10}}>
         {item.gamename.toUpperCase()}
         </div>
        <div style={{fontSize:15,padding:10}}>
          Day Price:<s>&#8377;{item.rentamt}</s> <span><b>&#8377;{item.offer}</b></span>  
        </div>
        <div style={{fontSize:15,padding:10}}>
      <span style={{color:'green'}}><b>You Save</b></span><b> &#8377;{item.rentamt-item.offer}    </b>
       </div>
       {/*<div style={{display:'flex',justifyContent:'center' ,alignItems:"center"}}>
               <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)}/>
      </div>*/}
         </Paper>
         </div>
         </div>
      )
    })
  }  
///////////////////end///////////////////////////////////////////////
///////////////////Accessories///////////////////////////////////////
const FetchAllAccessoryoffer=async()=>{
  var result = await getData("accessory/acessoryoffer")
   SetListAcessoryoffer(result)
  }
  const ShowAccessory1=()=>{
    return listAccessoryoffer.map((item)=>{
      return(    
     <div>
     <div style={{ display:'flex',flexDirection:'column',justifyContent:'center', alignItems:"center",padding:10, margin:5}}>
     <Paper elevation={3} className={classes.paperStyle} >
              <div  className={classes.imageView}>
     <img src={`${ServerURL}/images/${item.picture}`} width="150"/>
     </div> 
     <div style={{fontSize:15,fontWeight:'bold',padding:10}}>
         {item.accessoryname.toUpperCase()}
         </div>
        <div style={{fontSize:15,padding:10}}>
          Day Price:<s>&#8377;{item.rentamt}</s> <span><b>&#8377;{item.offer}</b></span>  
        </div>
        <div style={{fontSize:15,padding:10}}>
      <span style={{color:'green'}}><b>You Save</b></span><b> &#8377;{item.rentamt-item.offer}    </b>
       </div>
      {/* <div style={{display:'flex',justifyContent:'center' ,alignItems:"center"}}>
         <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)}/>
      </div> */}
        </Paper>
         </div>
         </div>
      )
    })
  }  




//////////////////end////////////////////////////////////////////////



return(
           <div>
        <Header history={props.history}/>
        <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
         <div style={{width:'100%' }}>
         <Slider {...settings}>{ShowSlider()}</Slider> 
             </div>  

        </div>

        <div className={classes.root}>
            <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:30,fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif ', justifyContent:"center",padding:10,color:'#636e72',display:'flex'}}>
                TOP CATEGORIES
            </div>
            <Divider style={{marginTop:5,marginBottom:5}}/>
    <div style={{justifyContent:'center', alignItems:"center",display:'flex', flexDirection:'row', marginTop:5}}>
         {ShowCategory()}
         </div>
         </div>
         <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:30,fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif ', justifyContent:"center",padding:10,color:'#636e72',display:'flex'}}>
                TOP OFFER CONSOLES
            </div>
            <Divider style={{marginTop:5,marginBottom:5}}/>
           <div style={{display:'flex', justifyContent:'center',alignContent:'center',justifyContent:'center',marginTop:5 }}>
           <IconButton className={classes.arrowStyle} style={{background:"#1e6b7b", position:'absolute',zIndex:1 ,left:5, opacity:0.8, marginTop:150}}>
             <ArrowBackIosIcon style={{color:"#fff",fontSize:'large'}}/>
           </IconButton>
                <div style={{width:'98%'}}>
            <Slider {...itemsettings}>{ShowOffer()}</Slider>
                </div> 
            <IconButton className={classes.arrowStyle}  style={{background:"#1e6b7b", position:'absolute',zIndex:1 ,right:5, opacity:0.8, marginTop:150}}>
            <ArrowForwardIosIcon style={{color:"#fff",fontSize:'large'}}/>
          </IconButton> 
             
             

            </div>





   {/*<div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',alignContent:'center', justifyContent:'center',marginTop:5}}>
         {//ShowOffer()//}
        </div>*/}
         </div>
         <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:30,fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif ', justifyContent:"center",padding:10,color:'#636e72',display:'flex'}}>
            TOP OFFERS GAMES
            </div>
            <Divider style={{marginTop:5,marginBottom:5}}/>
            <div style={{ width:'100%', display:'flex', justifyContent:'center',alignContent:'center',justifyContent:'center', marginTop:5 }}>
            <IconButton className={classes.arrowStyle} style={{background:"#1e6b7b", position:'absolute',zIndex:1 ,left:5, opacity:0.8, marginTop:150}}>
             <ArrowBackIosIcon style={{color:"#fff",fontSize:'large'}}/>
           </IconButton>
            <div style={{width:'98%'}}>
            <Slider {...itemsettings}>{ShowGame()}</Slider>
            </div>
            <IconButton className={classes.arrowStyle}  style={{background:"#1e6b7b", position:'absolute',zIndex:1 ,right:5, opacity:0.8, marginTop:150}}>
             <ArrowForwardIosIcon style={{color:"#fff",fontSize:'large'}}/>
           </IconButton> 
            </div>
   {/*<div style={{justifyContent:'center',flexWrap:'wrap', alignItems:"center",display:'flex', flexDirection:'row', marginTop:5}}>
         {//ShowGame()//}
      </div>*/}
         </div>  
         <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:30,fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif ', justifyContent:"center",padding:10,color:'#636e72',display:'flex'}}>
            TOP OFFERS ACCESSORIES
            </div>
            <Divider style={{marginTop:5,marginBottom:5}}/>
           <div style={{ width:'100%', display:'flex', justifyContent:'center',alignContent:'center',justifyContent:'center', marginTop:5 }}>
           <IconButton className={classes.arrowStyle} style={{background:"#1e6b7b", position:'absolute',zIndex:1 ,left:5, opacity:0.8, marginTop:150 }}>
             <ArrowBackIosIcon style={{color:"#fff",fontSize:'large'}}/>
           </IconButton>
            <div style={{width:'98%'}}>
            <Slider {...itemsettings}>{ShowAccessory1()}</Slider>
            </div>
            <IconButton className={classes.arrowStyle}  style={{background:"#1e6b7b", position:'absolute',zIndex:1 ,right:5, opacity:0.8 , marginTop:150}}>
             <ArrowForwardIosIcon style={{color:"#fff",fontSize:'large'}}/>
           </IconButton>  
    </div>
    {/*<div style={{justifyContent:'center',flexWrap:'wrap', alignItems:"center",display:'flex', flexDirection:'row', marginTop:5}}>
         
    </div>*/}
    </div>  
</div>
         <div style={{marginTop:80}}>
         <Footer history={props.history}/>
     </div>
        </div>
         
        
        
        
    )
}