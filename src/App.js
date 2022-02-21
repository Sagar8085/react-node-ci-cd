import {BrowserRouter as Router,Route} from "react-router-dom"
import DisplayAllCategory from "./Component/DisplayAllCategories"
import DisplayAllSubcategory from "./Component/displayAllSubcategories"
import CategoryInterface from "./Component/CategoryInterface"
import SubcategoryInterface from "./Component/SubcategoryInterface"
import AdminLogin from "./Component/AdminLogin"
import AdminDashboard from "./Component/AdminDashboard"
import AccessoriesInterface from "./Component/Accessories"
import DisplayAllAccessory from "./Component/DisplayAllAccessories"
import DisplayAllGame from "./Component/Displaygame"
import GameInterface from "./Component/games"
import Header from "./Component/ClientView/header"
import Home from "./Component/ClientView/home"
import Footer from "./Component/ClientView/footer"
import Consolelist from "./Component/ClientView/consoleList"
import QtySpinner from "./Component/ClientView/QtySpinner"
import Productview from "./Component/ClientView/ProductView"
import TermCondition from "./Component/term"
import Document from "./Component/document"
import Displayterm from "./Component/displayterm"
import DisplayDocument from "./Component/displaydocument"
import SubcategoryPicture from "./Component/subcategorypicture"
import DisplaySubcategorypic from "./Component/displaysubcategorypic"
import GamePicture from "./Component/gamepic"
import DisplayGamepic from "./Component/displaygamepic"
import Accessorypic from "./Component/accessorypic"
import DisplayAccessorypic  from "./Component/displayaccessorypic"
import MobileRegistration from "./Component/ClientView/MobileRegistration"
import SignUp from "./Component/ClientView/SignUpForm"
import ShowCart from "./Component/ClientView/showCart"
import PaymentGateway from "./Component/ClientView/paymentgateway"

function App(props) 
    {return(
  <div>
      <Router>
          <Route 
          strict
          exact 
          component={CategoryInterface}
          path="/categoryinterface"
          history={props.history}>
</Route>
<Route 
strict
exact
 component={DisplayAllCategory}
          path="/displaycategory"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={SubcategoryInterface}
          path="/subcategoryinterface"
          history={props.history}>
</Route>

<Route 
          strict
          exact 
          component={DisplayAllSubcategory}
          path="/displaysubcategories"
          history={props.history}>
</Route>
       <Route 
          strict
          exact 
          component={AdminLogin}
          path="/adminlogin"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={AdminDashboard}
          path="/admindashboard"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={AccessoriesInterface}
          path="/accessories"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={DisplayAllAccessory}
          path="/displayaccessory"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={GameInterface}
          path="/gameinterface"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={DisplayAllGame}
          path="/displaygame"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Header}
          path="/header"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Home}
          path="/"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Footer}
          path="/footer"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Consolelist}
          path="/consolelist"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={QtySpinner}
          path="/qty"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Productview}
          path="/productview"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={TermCondition}
          path="/terms"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Document}
          path="/document"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={Displayterm}
          path="/displayterm"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={DisplayDocument}
          path="/displaydocument"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={SubcategoryPicture}
          path="/subcategorypic"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={DisplaySubcategorypic}
          path="/displaysubcategorypic"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component={GamePicture}
          path="/gamepic"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {DisplayGamepic}
          path="/displaygamepic"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {Accessorypic}
          path="/accessorypic"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {DisplayAccessorypic}
          path="/displayaccessorypic"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {MobileRegistration}
          path="/mobilereg"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {SignUp}
          path="/signup"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {ShowCart}
          path="/showcart"
          history={props.history}>
</Route>
<Route 
          strict
          exact 
          component= {PaymentGateway}
          path="/payment"
          history={props.history}>
</Route>

</Router>
  </div>
      );
  } 

export default App;
