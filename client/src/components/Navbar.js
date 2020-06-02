import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App';

 
const NavBar = ()=>{

    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();

    const renderList = ()=>{
        if(state)
        {
            return [
                <li><Link to="/create">Post</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/myfollowingpost">Explore</Link></li>,
                <li>
                    <button className="btn waves-effect waves-light #2196f3 blue"
                onClick={()=>{
                    localStorage.clear();
                    dispatch({type:"CLEAR"})
                    history.push('signin');
                }}
                >
                    Logout
                    </button>
                </li>
            ]
        }
        else
        {
            return [
                <li><Link to="/signup">Sign Up</Link></li>,
                <li><Link to="/signin">Login</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
            <Link to={state?"/":"/signin"} className="brand-logo left">SocialApp</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
            </div>
        </nav>
    )
    
}

export default NavBar;