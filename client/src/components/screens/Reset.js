import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App';
import M from 'materialize-css';

const Reset = ()=>{
    
    const history = useHistory();
    const [email,setEmail] = useState("");
    

    const postData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email address",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/resetpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email,
                
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
                type="text" placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            

            <button className="btn waves-effect waves-light #2196f3 blue"
                onClick={()=>postData()}
            >
                Reset
            </button>
        </div>
    </div>
    )
}

export default Reset;