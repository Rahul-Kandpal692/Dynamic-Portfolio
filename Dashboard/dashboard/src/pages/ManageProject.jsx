import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clearAllProjectErrors, deleteProject, getAllprojects, resetProject } from "@/store/slices/projectSlice";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Eye, Pen, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { toast } from "react-toastify";

const ManageProject = () => {
  const { projects, message, error, loading } = useSelector(
    (state) => state.project
  );
  const dispatch= useDispatch();

  const [projectId,setProjectId] = useState("")

  const handleProjectDelete=(id)=>{
    setProjectId(id);
    dispatch(deleteProject(id));
  }
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetProject());
      dispatch(getAllprojects());
    }
  },[loading,error,message,dispatch])
  return (
    <>
      <div>
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card>
              <CardHeader className="flex-row justify-between">
                <CardTitle>Manage your Projects</CardTitle>
                <Link to="/">
                  <Button>Return To Dashboard</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Stack
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Deployed
                      </TableHead>
                      <TableHead className="md:table-cell">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects && projects.length > 0 ? (
                      projects.map((element) => {
                        return (
                          <TableRow key={element._id}>
                            <TableCell>
                              <img
                                className="w-16 h-16"
                                src={
                                  element.projectBanner &&
                                  element.projectBanner.url
                                }
                              ></img>
                            </TableCell>
                            <TableCell>{element.title}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.stack}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.deployed}
                            </TableCell>
                            <TableCell className="flex flex-row items-center gap-3 h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${element._id}`}>
                                    <div
                                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                        justify-center items-center text-green-600  hover:text-slate-950 
                                        hover:bg-green-600"
                                      >
                                        <Eye className="h-5 w-5" />
                                      </div>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Link
                                          to={`/update/project/${element._id}`}
                                        >
                                          <div className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400  hover:text-slate-950 hover:bg-yellow-400">
                                        <Pen className="h-5 w-5" />
                                      </div>
                                        </Link>
                                      </TooltipTrigger>
                                      <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger>
                                  {
                                   loading &&  projectId === element._id ? (
                                      <SpecialLoadingButton   content="Deleting"></SpecialLoadingButton>
                                    ):(
                                      <div
                                      className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                      onClick={() => handleProjectDelete(element._id)}
                                    >
                                      <Trash2 className="h-5 w-5"></Trash2>
                                    </div>
                                    )
                                  }
                                    
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-2xl">
                          You have not added any project.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageProject;
