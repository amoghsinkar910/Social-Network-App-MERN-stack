import React,{useState,useContext} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import M from 'materialize-css';

const Signin = ()=>{
    const history = useHistory();
    const [password,setPassword] = useState("");
    const {token} = useParams();

    const postData = ()=>{
        fetch("/newpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:data.message,classes:"#4caf50 green"})
                history.push("/signin")
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
                type="password" placeholder="Enter new password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="btn waves-effect waves-light #2196f3 blue"
                onClick={()=>postData()}
            >
                Update password
            </button>
            
        </div>
    </div>
    )
}

export default Signin;