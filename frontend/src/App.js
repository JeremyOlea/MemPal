import './App.css'
import Home from './pages/Home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { v4 as uuidV4} from 'uuid'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={`/document/${uuidV4()}`}/>}/>
        <Route path='/document/:id' render={({ match }) => <Home id={match.params.id}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
