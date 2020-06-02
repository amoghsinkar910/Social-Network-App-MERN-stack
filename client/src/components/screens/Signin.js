import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App';
import M from 'materialize-css';

const Signin = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const postData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email address",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user});
                
                M.toast({html:"Login successful",classes:"#4caf50 green"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
    <div className="mycard">
        <div className="card auth-card input-field">
            <h2>SocialApp</h2>
            <input 
                type="text" placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                type="password" placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="btn waves-effect waves-light #2196f3 blue"
                onClick={()=>postData()}
            >
                Sign In
            </button>
            <h5>
                <Link to="/signin">Forgot password</Link>
            </h5>

        </div>
    </div>
    )
}

export default Signin;