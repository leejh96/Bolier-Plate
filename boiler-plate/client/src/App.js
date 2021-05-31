import LandingPage from './components/views/LandingPage/landingPage';
import LoginPage from './components/views/loginPage/loginPage';
import RegisterPage from './components/views/registerPage/registerPage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Auth from './hoc/auth'
function App() {
  return(
    <BrowserRouter>
      <div>
        
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
