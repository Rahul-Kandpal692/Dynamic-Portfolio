import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { clearAllSkillErrors, deleteSkill, getAllSkill, resetSkill, updateSkill } from '@/store/slices/skillSlice'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'
import { toast } from 'react-toastify'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'

const ManageSkills = () => {
  const {skills,loading,error,message} = useSelector((state)=>state.skill);
  const dispatch=useDispatch();
  const handleDeleteSkill = (id)=>{
    dispatch(deleteSkill(id));
  }


  const [newProficiency,setNewProficiency] = useState("");
  const handleUpdateSkill =(id,newProficiency)=>{
    dispatch(updateSkill(id,newProficiency))
  }
  const [update,setUpdate] = useState(false);

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetSkill());
      dispatch(getAllSkill());
    }

  },[dispatch,error,message,loading])
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to="/">
              <Button className="w-fit" >
                Return to Dashboard
              </Button>
              </Link>
            </CardHeader>
            {
              skills && skills.length>0?(
                <CardContent className="grid sm:grid-cols-2 gap-4">
              
                {skills.map((element) => {
                  return (
                    <Card key={element._id}>
                      <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                        {element.title}
                        <img src={element.svg&&element.svg.url} className='h-9 w-9'></img>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Trash2
                                onClick={() => handleDeleteSkill(element._id)}
                                className="h-5 w-5 hover:text-red-500"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" style={{ color: "red" }}>
                              Delete
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardHeader>
                      <CardFooter className="flex-col gap-4">
                       
                        <Label className="text-2xl mr-2 flex w-full justify-center items-center gap-3">Proficiency:
                        <Input
                          type="number"
                          defaultValue={element.proficiency}
                          onChange={(e) => setNewProficiency(e.target.value)}
                          className="h-12"
                        />
                        </Label>
                       
                     
                        <Button onClick={() => handleUpdateSkill(element._id,newProficiency)}>Submit Change</Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </CardContent>
              ):(
                <CardContent>No Skill added !</CardContent>
              )
            }
            
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManageSkills
