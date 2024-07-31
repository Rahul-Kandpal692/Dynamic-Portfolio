import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import resetImg from "../../public/reset.png"
import { clearAllForgotPasswordErrors, resetPassword } from '@/store/slices/forgotResetPasswordSlice';
import { toast } from 'react-toastify';
import { getUser } from '@/store/slices/userSlice';

const ResetPassword = () => {
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const { token } = useParams();

  const {loading,error,message} = useSelector((state)=>state.forgotPassword);
  const {isAuhtenticated} = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const handleResetPassword = (password,confirmPassword)=>{
    dispatch(resetPassword(token,password,confirmPassword));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors())
    }
    if(isAuhtenticated){
      navigateTo("/")
    }
    if(message!==null){
      toast.success(message);
      dispatch(getUser());
    }

  },[dispatch,isAuhtenticated,error,loading])



  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your New password below to reset Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="*****"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                placeholder="*****"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to={"/login"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember your password?
                </Link>
              </div>
              
            </div> */}
            {
                loading ? 
                (<SpecialLoadingButton content={"Changing Password"}/> )
                :
                (<Button type="submit" className="w-full" onClick={() => handleResetPassword(password,confirmPassword)}>
                Reset Password
                </Button>)
            }
            
          </div>
    
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={resetImg}
          alt="Image"
        //   width="1920"
        //   height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </>
  )
}

export default ResetPassword
