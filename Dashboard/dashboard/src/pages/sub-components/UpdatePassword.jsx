import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllUserErrors, updatePassword } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const {isUpdated,loading,error,message} = useSelector((state)=>state.user);
    const [currnetPassword, setCurrentPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("");
    const dispatch = useDispatch();

    const handleUpdatePassword=()=>{
        dispatch(updatePassword(currnetPassword,newPassword,confirmNewPassword));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if(message){
            toast.success(message)
        }
    },[loading,error,message,isUpdated])
  return (
    <>
      <div className='w-full h-full'>
        <div>
          <div className='grid w-[100%] gap-6'>
            <h1 className='text-3xl font-bold mb-8'>
              Update Password
            </h1>
          </div>
          <div className='grid gap-6'>
            
              <div className='grid gap-2'>
                <Label>Current Password</Label>
                <Input type="pasword"  value={currnetPassword} onChange={(e)=>setCurrentPassword(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>New Password</Label>
                <Input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Confirm New Password</Label>
                <Input type="text"  value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)}></Input>
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
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

export default UpdatePassword
