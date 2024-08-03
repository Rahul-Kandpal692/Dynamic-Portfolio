import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '@/store/slices/userSlice';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Link } from 'react-router-dom';
// import "../../App.css"

const UpdateProfile = () => {
    const {user,loading,error,isUpdated,message} = useSelector((state)=>state.user);
    
    const [fullName, setFullName] = useState(user && user.fullName);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
    const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
    const [linkedInURL, setLinkedInURL] = useState(user && user.linkedInURL === "undefined"?"":user.linkedInURL);
    const [githubURL, setgithubURL] = useState(user && user.githubURL === "undefined"?"":user.githubURL);
    const [DSAURL, setDSAURL] = useState(user && user.DSAURL === "undefined"?"":user.DSAURL);
    const [avatar,setAvatar]=useState(user && user.avatar && user.avatar.url);
    const [avatarPreview,setAvatarPreview]=useState(user && user.avatar && user.avatar.url);
    const [resume,setResume]=useState(user && user.resume && user.resume.url);
    const [resumePreview,setResumePreview]=useState(user && user.resume && user.resume.url);

    const dispatch = useDispatch();

    const avatarHandler=(e)=>{
        const file = e.target.files[0];
        const reader =new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setAvatarPreview(reader.result);
            setAvatar(file);
        }
    }
    const resumeHandler=(e)=>{
        const file = e.target.files[0];
        const reader =new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setResumePreview(reader.result);
            setResume(file);
        }
    }

    const handleUpdateProfile=()=>{
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("aboutMe", aboutMe);
        formData.append("portfolioURL", portfolioURL);
        formData.append("linkedInURL", linkedInURL);
        formData.append("githubURL", githubURL);
        formData.append("DSAURL",DSAURL);
        formData.append("avatar", avatar);
        formData.append("resume", resume);
        dispatch(updateProfile(formData));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (isUpdated) {
            dispatch(getUser());
            dispatch(resetProfile());
          }
        if (message) {
            toast.success(message);
        }
    },[dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className='w-full h-full'>
        <div>
          <div className='grid w-[100%] gap-6'>
            <h1 className='text-3xl font-bold mb-8'>
              Update Profile
            </h1>
          </div>
          <div className='grid gap-6'>
            <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5 sm:flex'>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Update Profile Image</Label>
                <img src={avatarPreview? `${avatarPreview}`:`./vite.svg`} alt='avatar' className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'></img>

                <Input type='file' className='cursor-pointer hover:text-white hover:bg-black pointer' onChange={avatarHandler}></Input>
          
              </div>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Resume</Label>
                <Link to={user && user.resume && user.resume.url}>
                <img src={resumePreview? `${resumePreview}`:`./vite.svg`} alt='resume' className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'></img>
                </Link>
                <Input type='file' className='cursor-pointer hover:text-white hover:bg-black pointer' onChange={resumeHandler}></Input>
              
              </div>
              </div>
              <div className='grid gap-2'>
                <Label>Full Name</Label>
                <Input type="text"  value={fullName} onChange={(e)=>setFullName(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Email</Label>
                <Input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Phone</Label>
                <Input type="text"  value={phone} onChange={(e)=>setPhone(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>About Me</Label>
                <Textarea  value={aboutMe} onChange={(e)=>setAboutMe(e.target.value)}></Textarea>
              </div>
              <div className='grid gap-2'>
                <Label>Portfolio URL</Label>
                <Input type="text" value={portfolioURL} onChange={(e)=>setPortfolioURL(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>github URL</Label>
                <Input type="text" value={githubURL} onChange={(e)=>setgithubURL(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Linkedin URL</Label>
                <Input type="text"  value={linkedInURL} onChange={(e)=>setLinkedInURL(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>DSA URL</Label>
                <Input type="text" value={DSAURL} onChange={(e)=>setDSAURL(e.target.value)}></Input>
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full"
                >
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
          </div>
          
        </div>
      </div>
    </>
  )
}


export default UpdateProfile
