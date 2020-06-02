import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App';

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext);
    const [image,setImage] = useState("");
    
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setPics(result.myPost);
            })
        .catch((err)=>{
            console.log(err);
            })
        },[])
    
        useEffect(()=>{
            if(image)
            {
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
                    
                    console.log(data);
                    fetch('/updatepic',{
                        method:"put",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({pic:data.url})
                    }).then(res=>res.json())
                    .then(result=>{
                        console.log(result);
                        localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                        dispatch({type:"UPDATE_PIC",payload:result.pic})
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        },[image])


    const updatePhoto = (file)=>{
        setImage(file);
    }

    return (
        <div className="profile">
        <div style={{
        margin:"18px 0px",
        borderBottom:"1px solid grey"
        }}>
            <div style={{display:"flex",
            justifyContent:"space-around",
            }}>
            
                <div>
                    <img style={{width:"190px",
                    height:"190px",borderRadius:"95px",}}
                    src={state?state.pic:""}
                    />
                    <div className="file-field input-field" style={{margin:"10px"}}>
                    <div className="btn waves-effect waves-light #2196f3 blue">
                        <span>Change picture</span>
                        <input type="file" 
                            onChange={(e)=>updatePhoto(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

                </div>
                <div>
                    <h4>Username: {state?state.name:"Loading"}</h4>
                    <h5>Email: {state?state.email:"Loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"111%"}}>
                        <h5>{mypics.length} posts</h5>
                        <h5>{state?state.followers.length:"Loading"} followers</h5>
                        <h5>{state?state.following.length:"Loading"} following</h5>
                    </div>
                </div>
            </div>
            </div>
            <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                    
                       )
                   })
                   
               }
            </div>
        </div
        >
    )
}

export default Profile;