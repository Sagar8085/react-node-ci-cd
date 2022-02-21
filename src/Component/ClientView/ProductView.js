import React ,{useState,useEffect ,createRef} from 'react'
import Header from "./header"
import Footer from "./footer"
import {ServerURL, postDataAndImage,getData,postData} from "../FetchNodeServices";
import Grid from "@material-ui/core/Grid"
import TodayIcon from "@material-ui/icons/Today";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import QtySpinner from "./QtySpinner"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CheckIcon from "@material-ui/icons/Check";
import renderHTML from "react-render-html"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch , useSelector} from "react-redux"
const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));   
export default function Productview(props){
    const classes = useStyles(); 
    const[startDate,setStartDate]=useState(getCurrentDate())
    const[endDate,setEndDate]=useState(addDays(1,getCurrentDate()))
    const[totalAmt,setTotalamt]=useState(" ")
    const[days,setDays]=useState(" ")
    const[msg,setMsg]=useState(" ")
    const[document,setDocument]=useState("")
    const[terms,setTerms]=useState("")
    const[consolepicture,setConsolepicture]=useState([])
    const[pageRefresh,SetPageRefresh]=useState(false) 
    const[getImage,setImage]=useState('item.subicon');
    var dispatch = useDispatch()
    var cart = useSelector(state=>state.cart)
    var item= props.history.location.state.product
    //alert(JSON.stringify(item))
    var settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow:4,
      slidesToScroll: 1,
      //autoplay:true,
      autoplaySpeed:2000,
      arrows:false,
    };
var consoleSlider = createRef()
//////////////////////handle qty spinner///////////////////////////////////////////////////
const handleQtyChange=(value,item)=>{
  if(value==0)
  {
    dispatch({type:'Remove Cart', payload:[item.subcategoryid]})
  }
  else{
  item["qtydemand"]=value
  item['duration']=1;
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



////////////////////////end////////////////////////////////////////////////////////////////
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
////////////////handle date difference/////////////////////////////////////////////////////
const handleDateDifference=(event,rentamt)=>{
    setEndDate(event.target.value)
    //alert("start date"+startDate)
    //alert("end date"+endDate)
    var sd = new Date(startDate)
    var ed =  new Date(event.target.value)
    const diffTime = Math.abs(ed-sd);
    const diffDays = Math.ceil(diffTime/(1000*60*60*24));
   // alert(diffDays)
    var totalamt = rentamt*diffDays
    setTotalamt(totalamt)
    setDays(diffDays)
    item['duration']=diffDays;
    item['time']='Day'
  dispatch({type:"Add Cart",payload:[item.subcategoryid,item]})
  SetPageRefresh(!pageRefresh)
  setMsg(`Rent for ${diffDays} Days is Rs.${totalamt}`)
}



/////////////////////end///////////////////////////////////////////////////////////////////
///////////////Get Price//////////////////////////////////////////////////////////////////
const getPrice=(state,Price)=>{
    var days=0
    var cd= startDate 
    var ed= endDate
    if(state=='Day Price')
    {
     days=1
     ed=addDays(days,cd)
    }
    else if(state=='Week Price')
    {
    days=7
    ed=addDays(days,cd) 
    }
    else if(state=='Month Price')
    {
    days=30
    ed=addDays(days,cd)
    }
    setEndDate(ed)
    item['duration']=days;
    item['startdate']=cd
    item["enddate"]=ed
    item['time']='Day'
    dispatch({type:"Add Cart",payload:[item.subcategoryid,item]}) 
    SetPageRefresh(!pageRefresh)
    setMsg(`Rent for ${state} Days is Rs.${Price}`)
  }

//////////////////end//////////////////////////////////////////////////////////////////////
////////////////React Tabs/////////////////////////////////////////////////////////////////////
const Showtabs=(Description) => (
    <Tabs style={{padding:20}}>
      <TabList>
        <Tab style={{fontSize:20, fontWeight:"bold",letterSpacing:1}}>Description</Tab>
        <Tab style={{fontSize:20, fontWeight:"bold",letterSpacing:1}}>Terms & Condition</Tab>
        <Tab style={{fontSize:20, fontWeight:"bold",letterSpacing:1}}>Documents Required</Tab>
      </TabList>
  
      <TabPanel>
        <h2>{Description}</h2>
      </TabPanel>
      <TabPanel>
    <div>
      {renderHTML(terms)}
    </div>
      </TabPanel>
      <TabPanel>
<div>
  {renderHTML(document)}
</div>
      </TabPanel>
    </Tabs>
  );



////////////////////end///////////////////////////////////////////////////////////////////////
/////////////////////console multiple picture///////////////////////////////////////////////////
const fetchConsole=async()=>{
  var body={"subcategoryid":item.subcategoryid}
  var result= await postData('subcategorypic/displayproductpicture',body)
  setConsolepicture(result)
}
const showConsolePicture=()=>{
  return consolepicture.map(function(citem,index){
    return(
      <div style={{display:"flex" ,justifyContent:"center", alignItems:"center",outline:"none"}}>
      <div style={{display:"flex" , justifyContent:"center", alignItems:"center",outline:"none", width:70,height:70,border:'2px solid #dcdde1' , borderRadius:5, margin:2, cursor:"pointer"}} onMouseEnter={()=>setImage(citem.image)} >
      <img src={`${ServerURL}/images/${citem.image}`} width={56} height={56} />
      </div>
      </div>

    )
  })
}
 const handleNext=()=>{
   consoleSlider.current.slickNext();
 }
 const handleBack=()=>{
  consoleSlider.current.slickPrev();
}

///////////////////////end/////////////////////////////////////////////////////////////////////
/////////////////product detail//////////////////////////////////////////////////////////
const ProductD=()=>{
    var rentamt = item.offer>0?item.offer:item.rentamt
    var v=cart[item.subcategoryid]||0
    var qty=0
    if(v!=0)
    {
      qty=cart[item.subcategoryid].qtydemand
    }
    return(<div>
        <div style={{padding:10,fontSize:18,fontWeight:"bold" ,letterSpacing:1}}>
            {item.subcategoryname}
        </div>
        <div style={{fontSize:16,padding:10}}>
        Price:<s>&#8377;{item.rentamt}</s>{""} 
        <span style={{color:"green"}}><b>&#8377;{item.offer}</b></span>  
                </div>  
        <div style={{padding:10}}>
     {(item.stock-item.rented)>0?<div>Availability:{(item.stock-item.rented)}In Stock</div>:<div>Not Available This Time</div>}
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
            <div onClick={()=>getPrice("Day Price",rentamt)} style={{cursor:"Pointer",display:"flex", justifyContent:"center", alignContent:"center",width:120, margin:10, flexDirection:"column", padding:10,background:"#1289A7" , color:"#fff"}}>
             <div>Day Price:</div>
             <div>&#8377;:{rentamt}</div>
            </div>
            <div onClick={()=>getPrice("Week Price",rentamt*7)}  style={{cursor:"Pointer",display:"flex", justifyContent:"center", alignContent:"center",width:120, margin:10, flexDirection:"column", padding:10 ,background:"#12CBC4" , color:"#fff"}}>
             <div>Week Price:</div>
             <div>&#8377;:{rentamt*7}</div>
            </div>  
            <div onClick={()=>getPrice("Month Price",rentamt*30)}  style={{cursor:"Pointer", display:"flex", justifyContent:"center", alignContent:"center",width:120, margin:10, flexDirection:"column", padding:10,background:"#6083bc" , color:"#fff" }}>
             <div>Month Price:</div>
             <div>&#8377;:{rentamt*30}</div>
            </div>   
        </div>
<div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:10, width:400}}>
<span><TodayIcon/>{" "}</span>
<span>Select Rent Duration</span>
</div>
<div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:10, width:400}}>
<span><TextField
        id="date"
        label="Start Date"
        onChange={(event)=>setStartDate(event.target.value)}
        variant="outlined"
        type="date"
        value={startDate}
       // defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      /></span>
<span><TextField
        id="date"
        label="End Date"
        onChange={(event)=>handleDateDifference(event,rentamt)}
        variant="outlined"
        type="date"
        value={endDate}
        //defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      /></span>
</div>
<div style={{padding:10}}>
    {msg}
</div>
<div style={{padding:10}}>
    <QtySpinner value={qty} onChange={(value)=>handleQtyChange(value,item)}/>
</div>
    </div>

    )
}
////////////////////////end////////////////////////////////////////////////////////////////
/////////////////////terms and description////////////////////////////////////////////////
const fetchTerm=async()=>{
  var result= await getData('term/displayterm')
  setTerms(result[0].termdes)
}
const fetchDocument=async()=>{
  var result= await getData('document/displaydoc')
  setDocument(result[0].docname)
}
useEffect(function(){
  fetchTerm()
  fetchDocument()
  fetchConsole()
},[])
//////////////////////////////////////////////////////////////////////////
    return(<div>
         <Header history={props.history}/>
         <div style={{padding:20}}>
        <Grid container spacing ={1}>
            <Grid item xs={6}>
                <div style={{padding:30,display:'flex',justifyContent:"center",alignItems:"center",}}>
            <img src={`${ServerURL}/images/${item.subicon}`} width="300" height="300" /> 
            </div>
            
           {consolepicture.length>=1 && consolepicture.length<=4?(
           <div style={{padding:'30 px 10px' ,display:"flex" , justifyContent:"center",alignItems:"center",flexDirection:'row' }}>
<div style={{width:325}}>
<Slider {...settings}>{showConsolePicture()}</Slider>  
 
 </div>
           
 
</div>):(<div style={{display:"flex", flexDirection:'row', justifyContent:"center",alignItems:"center"}}>
<div style={{padding:'30 px 10px' ,display:"flex" , justifyContent:"center",alignItems:"center",flexDirection:"row" }}>
<div style={{marginLeft:20,fontSize:"small"}}>
<ArrowBackIosIcon onClick={()=>handleBack()}/>
</div>
<div style={{width:325}}>
<Slider {...settings} ref={consoleSlider}>{showConsolePicture()}</Slider>  
 </div>
 <div style={{marginRight:20,fontSize:"small"}}>
<ArrowForwardIosIcon onClick={()=>handleNext()} />
</div>
 </div>         
</div>)}
</Grid>
            <Grid item xs={6}>
            {ProductD()} 
            </Grid>
        </Grid>
        <div>
    {Showtabs(item.subdescription)}
        </div>
        <div>
        <Footer/>
        </div>
</div>

</div>
    )
}