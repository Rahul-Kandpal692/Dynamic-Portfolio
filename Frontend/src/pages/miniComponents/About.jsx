import axios from 'axios';
import React, { useEffect, useState } from 'react'


const About = () => {
  const [user,setUser]  = useState({});
  useEffect(()=>{
      const fetchUser=async()=>{
          try {
              const {data} = await axios.get("https://dynamic-portfolio-backend-essm.onrender.com/api/v1/user/me/portfolio",{withCredentials:true});
              setUser(data.user);
          } catch (error) {
              console.log(error);
          }
      }
      fetchUser();
  },[])

  return (
    <div className='w-full flex flex-col overflow-x-hidden'>
      <div className='relative mb-[90px]'>
        <h1 className='flex gap-7 items-center overflow-x-hidden text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] mb-5 font-extrabold '>About <span className='text-tubeLight-effect'>Me</span></h1>
        <div>
          <div className='grid md:grid-cols-2 my-8 sm:my-20 gap-10'>
            <div>
              <img src={user.avatar&&user.avatar.url} alt={user.fullName} className='bg-gray-500 p-2 sm:p-1 h-[300px] sm:rounded-lg sm:h-[340px] rounded-lg md:h-[450px] lg:h-[450px]'></img>
            </div>
            <div className='flex flex-col justify-center tracking-[1px] text-xl gap-5'>
              <p>Presently I am pursing my Degree in Computer Science and Engineering. Throughout my academic journey I have built strong foundation in programming, problem solving and software development.</p>
              <p>I am actively seeking exciting new hiring opportunities where I can leverage my skills and experiences to contribute meaningfully to an organization. I am eager to explore roles that align with my professional goals. I would be thrilled to connect and discuss how I can bring value to your team.</p>
            </div>
          </div>
          <p className='tracking-[1px] text-xl'>I excel in time management, effectively prioritizing tasks and meeting deadlines while maintaining high-quality work. My ability to organize and allocate time efficiently ensures productivity and success in any project.</p>
        </div>
      </div>
      <hr className="my-8 md::my-10 border-gray-700" />
    </div>
  )
}

export default About
