import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const[showFollow,setshowFollow] = useState(state?!state.following.includes(userid):true)
    
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setProfile(result)
       })
    },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setshowFollow(false)
        })
    }


    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item!==data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setshowFollow(true)
        })
    }


    return (
        <>{userProfile ?
        
        <div className="profile">
            <div style={{display:"flex",

            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"190px",
                    height:"190px",borderRadius:"95px",}}
                        src={userProfile.user.pic}
                        
                    />
                </div>
                <div>
                    <h4>Username: {userProfile.user.name}</h4>
                    <h5>mail: {userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"111%"}}>
                        <h5>{userProfile.posts.length} posts</h5>
                        <h5>{userProfile.user.followers.length} followers</h5>
                        <h5>{userProfile.user.following.length} following</h5>
                    </div>
                    {showFollow?
                    <button style={{margin:"10px"}} className="btn waves-effect waves-light #2196f3 blue"
                    onClick={()=>followUser()}>
                    Follow
                    </button>:
                    <button style={{margin:"10px"}} className="btn waves-effect waves-light #2196f3 blue"
                    onClick={()=>unfollowUser()}>
                    UnFollow
                    </button>
                    }
                    
                    
                </div>
            </div>
            <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                    
                       )
                   })
                   
               }
            </div>
        </div>
        :<h2>Loading...</h2>}
        </>
    )
}

export default Profile;