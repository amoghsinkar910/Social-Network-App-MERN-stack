import React,{useEffect,createContext,useReducer, useContext} from 'react';
import NavBar from './components/Navbar';
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Createpost from './components/screens/Createpost';
import {reducer,initialState} from './reducers/userReducer'; 
import UserProfile from './components/screens/UserProfile';
import FollowerPost from './components/screens/FollowerPost'

export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    
    console.log(user);
    if(user)
    {
      dispatch({type:"USER",payload:user});
    }
    else
    {
      history.push('/signin');
    }
    
  },[])
  return(
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/signin">
            <Signin />
        </Route>
        <Route exact path="/profile">
            <Profile />
        </Route>
        <Route path="/signup">
            <Signup />
        </Route>
        <Route path="/create">
            <Createpost />
        </Route>
        <Route path="/profile/:userid">
            <UserProfile />
        </Route>
        <Route path="/myfollowingpost">
            <FollowerPost />
        </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
