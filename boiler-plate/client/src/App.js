import LandingPage from './components/views/LandingPage/landingPage';
import LoginPage from './components/views/loginPage/loginPage';
import RegisterPage from './components/views/registerPage/registerPage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return(
    <BrowserRouter>
      <div>
        
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
