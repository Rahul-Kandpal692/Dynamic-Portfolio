import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyApps = () => {
  const[apps,setApps] = useState([]);
  useEffect(()=>{
    const fetchApps=async()=>{
        try {
            const {data} = await axios.get("https://dynamic-portfolio-backend-essm.onrender.com/api/v1/softwareApplication/getall",{withCredentials:true});
            setApps(data.applications);
            // console.log(data)
        } catch (error) {
            console.log(error);
        }
    }
    fetchApps();
},[])
  return (
    <div>
      <h1 className='flex gap-7 items-center overflow-x-hidden text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] mb-[50px] font-extrabold'>Apps</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-[90px]">
        {apps &&
          apps.map((element) => {
            return (
              <Card 
  className="h-fit p-7 flex flex-col justify-center items-center gap-3 
             transition-transform transform hover:scale-105 
             hover:shadow-lg 
             rounded-lg border border-gray-200 
             hover:border-blue-500 
             
             ease-in-out duration-300
             relative overflow-hidden"
  key={element._id}
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-900 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-500 "></div>
  <img
    src={element.svg && element.svg.url}
    alt="skill"
    className="h-12 sm:h-24 w-auto transition-transform transform hover:scale-110"
  />
  <p className="text-muted-foreground text-center relative z-10 text-gray-500 font-extrabold  tracking-[6px]">
    {element.title}
  </p>
</Card>

            );
          })}
      </div>
      <hr className="my-8 md::my-10 border-gray-700" />
    </div>
  )
}

export default MyApps

