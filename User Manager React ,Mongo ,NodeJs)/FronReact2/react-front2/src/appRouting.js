import { BrowserRouter, Switch, Route ,Redirect} from 'react-router-dom';
import About from './components/About';
import Edit from './components/Edit';
import Home from './components/Home';
import Register from './components/Register';
import Nav from './shared/components/Nav/Nav'
import UserDetails from './containers/userDetails'
import Error from './components/Error'
const AppRouting = () => (
  
    <BrowserRouter>
      <Nav />

      <Switch>
      <Route path="/" exact><Home/></Route>
      <Route path="/Home" exact><Home/></Route>
      <Route path="/About" exact><About/></Route>
      <Route path="/UserDetails/:username"><UserDetails/> </Route>
      <Route path="/Register"><Register/> </Route>
      <Route path="/Edit/:username"><Edit/></Route>
      <Route path="*"><Error/></Route>

      <Redirect to="/"/>
      </Switch>

    </BrowserRouter>
)
export default AppRouting;