import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://dynamic-portfolio-backend-essm.onrender.com/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          // style={{
          //   background: "hsl(222.2 84% 4.9%)",
          // }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORTFOLIO
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          // style={{
          //   background: "hsl(222.2 84% 4.9%)",
          // }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-[100px]">
        {viewAll
          ? projects &&
            projects.map((element) => {
              return (
                <Link
                  to={`/project/${element._id}`}
                  key={element._id}
                  className="relative group"
                >
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt="Project Banner"
                    className="transition-transform transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg">{element.title}</span>
                  </div>
                </Link>
              );
            })
          : projects &&
            projects.slice(0, 3).map((element) => {
              return (
                <Link
                  to={`/project/${element._id}`}
                  key={element._id}
                  className="relative group"
                >
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt="Project Banner"
                    className="transition-transform transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-extrabold">{element.title} : </span>
                    <span className="text-white text-lg ">   Click for more</span>
                  </div>
                </Link>
              );
            })}
      </div>
      {projects && projects.length > 3 && (
        <div className="w-full text-center my-9 ">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "View Less" : "View All"}
          </Button>
        </div>
      )}
       <hr className="my-8 md::my-10 border-gray-700" />
    </div>
  );
};

export default Portfolio;
