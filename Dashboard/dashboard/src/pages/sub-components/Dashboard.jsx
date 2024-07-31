import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from "@/store/slices/softwareApplicationSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { 
    loading:appLoading,
    error:appError,
    message:appMessage,
    softwareApplications 
  } = useSelector(
    (state) => state.softwareApplication
  );
  const { 
    loading:timelineLoading,
    error:timelineError,
    message:timelineMessage,
    timeline
  } = useSelector(
    (state) => state.timeline
  );


  const[appId,setAppId] = useState("");

  const handleDeleteSoftwareApp=(id)=>{
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  }


  useEffect(()=>{
    if(appError){
      toast.error(appErrorrror);
      dispatch(clearAllSoftwareAppErrors());
    }
    if(appMessage){
      toast.success(appMessage);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }


  },[appLoading,appError,appMessage,dispatch])
  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="text-balance leading-relaxed ">
                  {user.aboutMe}
                </CardHeader>
                <CardFooter className="text-start">
                  <Link to={user.portfolioUTL && user.portfolioUTL}>
                    <Button>Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex-row gap-4 items-center">
                  Projects Completed :
                  <CardDescription>
                    {projects && projects.length}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="text-start">
                  <Link to="/manage/projects">
                    <Button>Manage Projects</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex-row gap-4 items-center">
                  Skills :
                  <CardDescription>{skills && skills.length}</CardDescription>
                </CardHeader>
                <CardFooter className="text-start">
                  <Link to="/manage/skills">
                    <Button>Manage Skills</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>



            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>{element.title}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.deployed}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    to={
                                      element.projectLink
                                        ? `${element.projectLink}`
                                        : ``
                                    }
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell>
                              You Have not added any project yet !
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-col-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter className="flex gap-4">
                              {element.proficiency}
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl overflow-hidden">
                        You Have not added any Skills yet !
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs>
            <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Software Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="md:table-cell">Name</TableHead>
                        <TableHead className="md:table-cell">Icon</TableHead>
                        <TableHead className="md:table-cell text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        softwareApplications && softwareApplications.length>0 ? (
                          softwareApplications.map((element)=>{
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-9 h-9"
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {appLoading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftwareApp(element._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ):(
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any Software.
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              
              
              
              
              <Card>
                <CardHeader className="px-7 flex-row items-center justify-between">
                  <CardTitle>Timeline</CardTitle>
                  <Link to={"/manage/timeline"}>
                      <Button>
                        Manage Timeline
                      </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Table>
                  <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">Description</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {element.description}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element.timeline.to}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )
                        :(
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
