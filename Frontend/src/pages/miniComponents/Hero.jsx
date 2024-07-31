import { Button } from '@/components/ui/button';
import axios from 'axios'
import { Brain, ExternalLink, Github, Linkedin } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { MotionAnimate } from 'react-motion-animate';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
    const [user,setUser]  = useState({});
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const {data} = await axios.get("http://localhost:4000/api/v1/user/me/portfolio",{withCredentials:true});
                setUser(data.user);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[])

    const [greetingIndex, setGreetingIndex] = useState(0);
    const greetings = ["{ Hello World 👋} ;", "{ Namaste World 🙏} ;", "{ Holla World ✌️} ;", "{Ciao World 👍} ;"];

    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingIndex(prevIndex => (prevIndex + 1) % greetings.length);
        }, 2000); // Change greeting every 2 seconds

        return () => clearInterval(interval);
    }, []);
  return (
    <div className="w-full">
       <div className="flex items-center gap-2 mb-2">
        <span className='bg-green-600 rounded-full h-2 w-2'></span>
        <p>Online</p>
       </div>
       {/* <h1 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4'>Hey I am {user.fullName} </h1> */}
       <div className=" mt-[20px] relative  overflow-hidden h-20 sm:h-20 md:h-20 lg:h-12 text-[25px]">
                <h1 className='absolute w-full text-start transition-all duration-1000 transform animate-fade-slide'>
                    {greetings[greetingIndex]}
                </h1>
            </div>
       <h1 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]'>
                    I am {user.fullName}
            </h1>
       <h1 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] '>
        <Typewriter words={["FULLSTACK DEVELOPER","CODER","SOFTWARE DEVELOPER"]} loop={50} cursor typeSpeed={70} deleteSpeed={70} ></Typewriter>
       </h1>
       <div className='w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10'>
            
            <Link to={user.linkedInURL} target='_blank'>
                <Linkedin className='text-sky-500 w-7 h-7'></Linkedin>
            </Link>
            <Link to={user.DSAURL} target='_blank'>
                <Brain className='text-orange-500 w-7 h-7'></Brain>
            </Link>
       </div>
            <div className='mt-4 md:mt-8 lg:mt-10 flex gap-3'> 
                <Link to={user.githubURL} target='_blank'>
                    <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                        <span>
                            <Github></Github>
                        </span>
                        <span>
                            Github
                        </span>
                    </Button>
                </Link>
                <Link to={user.resume && user.resume.url} target='_blank'>
                    <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                        <span>
                            <ExternalLink></ExternalLink>
                        </span>
                        <span>
                            Resume
                        </span>
                    </Button>
                </Link>
            </div>
            <p className='mt-8 text-xl tracking-[2px] mb-[100px]' >{user.aboutMe}</p>
            <hr className="my-8 md::my-10 border-gray-700" />
    </div>

  )
}

export default Hero
