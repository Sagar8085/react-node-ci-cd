import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DisplayAllCategory from "./DisplayAllCategories"
import DisplayAllSubcategory from "./displayAllSubcategories"
import CategoryInterface from "./CategoryInterface"
import SubcategoryInterface from "./SubcategoryInterface"
import AccessoriesInterface from "./Accessories"
import DisplayAllAccessory from "./DisplayAllAccessories"
import DisplayAllGame from "./Displaygame"
import GameInterface from "./games"
export default function ListItems(props) {
    const handleClick=(v)=>{
      props.setDashboard(v)  
    }

return(
    <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<CategoryInterface/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" onClick={()=>handleClick(<DisplayAllCategory/>)}  />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Subcategories" onClick={()=>handleClick(<SubcategoryInterface/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List Subcategories" onClick={()=>handleClick(<DisplayAllSubcategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessories"   onClick={()=>handleClick(<AccessoriesInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessories"   onClick={()=>handleClick(<DisplayAllAccessory/>)} />
    </ListItem> 
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Games"   onClick={()=>handleClick(<GameInterface />)} />
    </ListItem> 
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Games"   onClick={()=>handleClick(<DisplayAllGame/>)} />
    </ListItem> 
  </div>




  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
)
}
