import React ,{useState,useEffect} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import MoreIcon from '@material-ui/icons/MoreVert';
import {ServerURL, postDataAndImage,getData,postData} from "../FetchNodeServices";
import {useSelector ,useDispatch} from "react-redux"
/////drawer//////////////////////////
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { ShoppingBasketOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import Delete from "@material-ui/icons/Delete"
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Header(props) {
  var cart= useSelector((state)=>state.cart)
  var dispatch= useDispatch()
  var keys=Object.keys(cart)
  var values = Object.values(cart)
  var totalamt = values.reduce(calculation,0)
  var totalsaving= values.reduce(calculationsaving,0)
  var Actualamt= values.reduce(actualcalculation,0)
  function calculation(a,b){
    var price=b.offer>0?b.offer*b.qtydemand*b.duration:b.rentamt*b.qtydemand*b.duration;
    return a+price
  }
  function calculationsaving(a,b){
    var price=(b.rentamt-b.offer)*b.qtydemand*b.duration;
    return a+price
  }
  function actualcalculation(a,b){
    var price=b.rentamt*b.qtydemand*b.duration;
    return a+price
  } 
const handleDelete=(item)=>{
  dispatch({type:'Remove Cart',payload:[item.subcategoryid]})
}
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const[listCategory,SetListCategory]=useState([])
  const [anchorMEl, setAnchorMEl] = useState(null);
  const[sublistCategory,SetSubListCategory]=useState([])
const[search,setsearch]=useState("")
///////////////Menu Design/////////////////////////////////////////////////////////////////////////
const FetchAllCategory=async()=>{
  var result = await getData("categories/displayall")
 
   SetListCategory(result)
  }
  useEffect(function(){
      FetchAllCategory()
      
  },[])
  const FetchSubCategory=async(cid)=>{
    var body={categoryid:cid}
    var result = await  postData("subcategories/displaysubcategoryintocategory",body)
     SetSubListCategory(result)
  }
 
  const handleSearch=async()=>{
    await getData("subcategories/subcategoryoffer"+"?subcategoryname="+search)
       
        
  }
  const handleMenuClick=async(event)=>{
    //alert(event.currentTarget)

    setAnchorMEl(event.currentTarget);
    FetchSubCategory(event.currentTarget.value)
  }
  const MenuCategoryItems=()=>{
    return sublistCategory.map((item)=>{
      return(  <MenuItem onClick={handleClose}>{item.subcategoryname}</MenuItem>
        
    )})
      }
const MenuCategory=()=>{
  return listCategory.map((item)=>{
    return(
<Button style={{color:"#000", marginRight:15}}  value={item.categoryid} onClick={(event)=>handleMenuClick(event)}>{item.categoryname}</Button>
    )
  })
}


const handleClose =() => {
  setAnchorMEl(null);
};

////////////////////////////////end////////////////////////////////
///////////drawer////////////////////////////////////////////////////////////////////////////////////////
const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
  if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <div style={{display:"flex", flexDirection:"row", width:345, padding:2}}>
      <div style={{padding:5, display:"flex", alignItems:"center", width:50}}>
        <ShoppingCartOutlined/>
      </div>
      <div  style={{fontSize:16, fontWeight:"bold" , letterSpacing:1, padding:3, alignItems:"center" , display:"flex" , width:100}}>
        {keys.length} items
      </div>
      <div style={{fontSize:16, fontWeight:"bold" , letterSpacing:1, padding:3, display:"flex" , width:230, justifyContent:"flex-end", alignItems:"center" }}>
        Total Amount:<span>&#8377;</span>{totalamt}
      </div> 
      
   </div>
   <Divider/>
  {showCart()}
  <Divider/>
  {paymentDetail()}
  </div>
 
);
const paymentDetail=()=>{
 return(<div style={{ display:"flex", flexDirection:"column"}}>
   <div style={{fontSize:18,fontWeight:"bold", letterSpacing:2, display:"flex", padding:10, justifyContent:"center", alignItems:"center"}}>
     PAYMENT DETAILS
   </div>
   <Divider/>
   <div style={{ display:"flex", flexDirection:"row"}} >
     <div style={{fontSize:14,fontWeight:400,padding:5}} > 
    Total Amount:
     </div>
 <div style={{fontSize:14,fontWeight:"bold",padding:5 ,textAlign:"right" , marginLeft:"auto"}}>
 &#8377;{Actualamt}
 </div>
   </div>
   <div style={{ display:"flex", flexDirection:"row"}} >
     <div style={{fontSize:14,fontWeight:400,padding:5}} > 
    Total Savings:
     </div>
 <div  style={{fontSize:14,fontWeight:"bold",padding:5 , textAlign:"right" , marginLeft:"auto"}}>
 &#8377;{totalsaving}
 </div>
   </div>
   <div style={{ display:"flex", flexDirection:"row"}} >
     <div style={{fontSize:14,fontWeight:400,padding:5}} > 
    Delivery Charges:
     </div>
 <div  style={{fontSize:14,fontWeight:"bold",padding:5 ,textAlign:"right" , marginLeft:"auto"}}>
 &#8377;{0}
 </div>
   </div>
   <div style={{ display:"flex", flexDirection:"row"}} >
     <div style={{fontSize:14,fontWeight:400,padding:5}} > 
    Amount Pay:
     </div>
 <div  style={{fontSize:14,fontWeight:"bold",padding:5 , textAlign:"right" , marginLeft:"auto"}}>
 &#8377;{totalamt}
 </div>
 </div>  
 <Divider/> 
 <div style={{padding:10}}>
   <Button variant="contained" style={{background:"#1e6b7b", color:"#fff",width:330}} onClick={()=>props.history.push({'pathname':'/mobilereg'})}>
     PROCEED
     </Button>

  </div>
  </div>
 )

}
const showCart=()=>{
  return values.map((item)=>{
    return(
      <div style={{display:"flex", flexDirection:"row",width:345,padding:2}} >
        <div style={{padding:5, display:"flex", alignItems:"center"}}>
<img src={`${ServerURL}/images/${item.subicon}`} width="120" />
        </div>
        <div style={{ width:270,display:'flex',flexDirection:'column',justifyContent:"left",alignSelf:"center"}}>
        <div style={{fontSize:10,fontWeight:'bold',padding:2}}>
             
             {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+"..."}
             </div>
            <div style={{fontSize:10,padding:2}}>
              Day Price:<s>&#8377;{item.rentamt}</s> <span><b>&#8377;{item.offer}</b></span>  
            </div>
            <div style={{fontSize:10,padding:2}}>
          <span style={{color:'green'}}><b>You Save</b></span><b> &#8377;{item.rentamt-item.offer}    </b>
        </div>
        <div style={{fontSize:10,padding:2}}>
          <span style={{color:'green'}}><b>Qty:</b></span>
          <b>{item.qtydemand}x{item.offer>0?
      (<><span>&#8377;{item.offer}</span>x<span>{item.duration} Day(s)</span></>)
      :(<span>&#8377;{item.rent}</span>)}
      </b>
      <span><Delete style={{fontSize:18, marginLeft:28 , color:'darkgreen'}} onClick={()=>handleDelete(item)}/></span> 
        </div>
        
        </div>
      <div style={{fontSize:10, fontWeight:"bold" , letterSpacing:1, padding:3, display:"flex" , width:80, justifyContent:"flex-end" ,alignItems:"center"}}>
       {item.offer>0?
      (<div><span>&#8377;</span>{item.offer*item.qtydemand*item.duration}</div>):(<div> <span>&#8377;</span>{item.rent*item.qtydemand*item.duration}</div>)}
      </div> 
      </div>
    )
  })
}




///////////////End///////////////////////////////////////////////////////////////////////////////// 
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton  onClick={toggleDrawer('right', true)}  aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={keys.length} color="secondary">
            <ShoppingCart/>
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>
      <MenuItem onChange={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{background:"#1e6b7b"}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Gamezone
          </Typography>
          
         
         
         
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon onClick={handleSearch()} style={{cursor:"pointer"}} />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event)=>setsearch(event.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton  onClick={toggleDrawer("right", true)} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart/>
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" style={{background:"white"}}>
    <Toolbar variant="dense">
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
       </IconButton>
      <Typography variant="h6" color="inherit">
      
      </Typography>
      <div style={{display:'flex', flexDirection:'row', marginLeft:100}}>
            {MenuCategory()}
       
         <Menu
       id="simple-menu"
        anchorEl={anchorMEl}
        keepMounted
        open={Boolean(anchorMEl)}
        onClose={handleClose}
        getContentAnchorE1={null}
        anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical:'top', horizontal: 'center' }}
        >
       {MenuCategoryItems()}
      </Menu>
</div>
    </Toolbar>
  </AppBar>
  {renderMobileMenu}
      {renderMenu}

      <div>
        <React.Fragment key={'right'}>
         
          <Drawer anchor={'right'} open={state["right"]} onClose={toggleDrawer("right", false)}>
      {list('right')}
    </Drawer>

  
          
        </React.Fragment>
      
    </div>
    </div>
    
  );
}

