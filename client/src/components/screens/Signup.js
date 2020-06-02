import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = ()=>{
    const history = useHistory();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState(undefined);

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url]);

    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email address",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Sign up successful",classes:"#4caf50 green"})
                history.push("/signin")
            }
        }).catch(err=>{
            console.log(err);
            
        })
    }

    const uploadPic = ()=>{
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","insta-mern")
        data.append("cloud_name","mycloudspace")
        fetch("https://api.cloudinary.com/v1_1/mycloudspace/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url);
        })
        .catch(err=>{
            console.log(err);
        })

    }

    const postData = ()=>{
        if(image)
        {
            uploadPic()
        }
        else
        {
            uploadFields()
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>SocialApp</h2>
                <input 
                    type="text" placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
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
                <div className="file-field input-field">
                    <div className="btn waves-effect waves-light #2196f3 blue">
                        <span>Upload Profile picture</span>
                        <input type="file" 
                            onChange={(e)=>setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                
                <button className="btn waves-effect waves-light #2196f3 blue" 
                onClick={()=>postData()}
                >
                    Sign Up
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
                
            </div>
        </div>
        )
}

export default Signup;