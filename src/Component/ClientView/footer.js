import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from "@material-ui/core/Divider";
import {ServerURL, postDataAndImage,getData,postData} from "../FetchNodeServices";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    
   },
   root1: {
    width: 400,
    height:300,
  
    flexGrow: 10,
 
  },

}));

export default function Footer(props) {
  const classes = useStyles();
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
              <div style={{fontSize:15,fontWeight:'plain text',padding:2}}>
                {item.categoryname} 
                 
                 </div>
                 
              )
            })
          }

  return (
    <div className={classes.root} >
     
      <Toolbar style={{vertical: 'bottom', horizontal: 'center', background:"#1e6b7b",height:350,}}>
        <grid>
      <grid container spacing={1} style={{display:"flex", justifyContent:'left',alignItems:'left',color:"white" }} > 
      <grid item xs={12} sm={4}>
      <div style={{justifyContent:'left', alignItems:"left",display:'flex',fontSize:20,fontWeight:'plain text',position:'absolute' ,top:"1px", }}>
      Most Popular Categories
       </div>
      <div style={{justifyContent:'left', alignItems:"left",display:'flex',flexDirection:"column",position:'absolute' ,top:"40px", }} >
      {ShowCategory()}
      
      </div>
    </grid>
    </grid>
          <grid container spacing={1}  style={{display:"flex", justifyContent:'center',alignItems:'center', marginLeft:500,}} >
            <grid item xs={12} sm={4} >
            <grid style={{fontSize:20,fontWeight:'plain text',position:'absolute' ,top:"1px",color:"white"}} >
            CUSTOMER SERVICES
            <div  style={{ justifyContent:'center',alignItems:'center',display:"flex"}}>
            <Button color="inherit">Term & Condition</Button>
            </div>
            
            <div style={{ justifyContent:'center',alignItems:'center',display:"flex"}}>
            <Button color="inherit">FAQ</Button>
            </div>
            <div style={{ justifyContent:'center',alignItems:'center',display:"flex"}} >
            <Button color="inherit"> Contact Us</Button>
            </div>
           </grid> 
          </grid>
          </grid>
          <grid container spacing={1}>
            <Divider style={{ borderRight:"2px solid white" ,height:350 ,display:"flex", justifyContent:'right',alignItems:'right', marginLeft:900 ,position:'absolute' ,top:"1px", }} />
</grid>
          <grid container spacing={1} style={{display:"flex", justifyContent:'right',alignItems:'right', marginLeft:1000 ,position:'absolute' ,top:"1px", color:"white"}} >
            <grid item xs={12} sm={4}>
           <div style={{fontSize:20,fontWeight:'plain text',padding:4}} > CONTACT US</div>
           <div>
           <Typography>
             Call Us: 0751-4001453
             </Typography>
             </div>
             <div>
           <Typography>
             Address:Ravi Nagar Gwalior , M.P India
             </Typography>
             </div>
             <div style={{fontSize:15,fontWeight:'plain text',marginTop:'5'}} >
             GameZone is your destination for new and used video games.
                  Rent video games online for your favorite systems including
                  PS4, Xbox One, Switch, PS3, Xbox 360, Wii U, 3DS, and more.
                </div>
                <div style={{justifyContent:'center', alignItems:"center", textAlign:"left",fontsize:"14px",color:"#fff",marginTop:"20px",fontWeight:'bold', padding:5}}>
                Download APP
                </div>
                <div style={{ justifyContent:'center', alignItems:"center", }}>
                  <img src={`/playstore.jpeg`} alt={""} style={{ margin: 5 }}  width="90" height='50'/>
                  <img src={`/googlepay.jpeg`} alt={""} style={{ margin: 5 }}  width="90" height='50'/>
                </div>
          

              </grid>
            </grid>
           
            </grid>
            <div>
           <Divider style={{borderBottom:"2px solid white" , Width:'100%', marginTop:"60%", marginBottom:"40px",}} />
           </div>  
        </Toolbar>
      
    </div>
  );
}  