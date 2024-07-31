import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {user} = useSelector((state)=>state.user)
  return (
    <>
      <div className='w-full h-full'>
        <div>
          <div className='grid w-[100%] gap-6'>
            <h1 className='text-3xl font-bold'>
              Profile
            </h1>
            <p className='mb-5'>Full Profile Preview</p>
          </div>
          <div className='grid gap-6'>
            <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5 sm:flex'>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Profile Image</Label>
                <img src={user && user.avatar && user.avatar.url} alt='avatar' className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'></img>
              </div>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Resume</Label>
                <Link to={user && user.resume && user.resume.url}>
                <img src={user && user.resume && user.resume.url} alt='resume' className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'></img>
                </Link>
              </div>
              </div>
              <div className='grid gap-2'>
                <Label>Full Name</Label>
                <Input type="text" defaultValue={user.fullName} disabled></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Email</Label>
                <Input type="text" defaultValue={user.email} disabled></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Phone</Label>
                <Input type="text" defaultValue={user.phone} disabled></Input>
              </div>
              <div className='grid gap-2'>
                <Label>About Me</Label>
                <Textarea  defaultValue={user.aboutMe} disabled></Textarea>
              </div>
              <div className='grid gap-2'>
                <Label>Portfolio URL</Label>
                <Input type="text"  defaultValue={user.portfolioURL} disabled></Input>
              </div>
              <div className='grid gap-2'>
                <Label>github URL</Label>
                <Input type="text"  defaultValue={user.githubURL} disabled></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Linkedin URL</Label>
                <Input type="text"  defaultValue={user.linkedInURL} disabled></Input>
              </div>
              <div className='grid gap-2'>
                <Label>DSA URL</Label>
                <Input type="text"  defaultValue={user.DSAURL} disabled></Input>
              </div>
              
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile


