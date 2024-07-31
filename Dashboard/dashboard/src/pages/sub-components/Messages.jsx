import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import moment from 'moment';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllMessageErrors, deleteMessage, resetMessagesSlice,getAllMessage } from "@/store/slices/messageSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const { messages, loading,error,message } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [messageId, setMessageId] = useState("");
  const navigateTo=useNavigate();
  const handleReturnToDashboard = ()=>{
    navigateTo("/");
  }
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }

    if (message) {

      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessage());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      {/* <Button  onClick={handleReturnToDashboard}>Navigate to DashBoard</Button> */}
      <div className="w-full h-full">
        <div className="grid w-[100%] gap-6 ">
          <h1 className="text-3xl font-bold mb-8 mx-auto">Messages</h1>
        </div>
        <div className="w-[80%] mx-auto flex-col gap-2 sm:grid sm:grid-cols-2">
          {messages && messages.length > 0 ? (
            messages.map((element) => {
              const createdAtDate = new Date(element.createdAt);
            const formattedDate = moment(createdAtDate).format('YYYY-MM-DD');
            const formattedTime = moment(createdAtDate).format('HH:mm:ss');
              return (
                <Card key={element._id} className="max-w-[100%]">
                  <CardHeader>
                    <CardTitle>{element.senderName}</CardTitle>
                    <CardDescription>{element.senderEmail}</CardDescription>
                    <CardDescription>{element.subject}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex">
                    
                    <p>Message-</p>
                    <p>{element.message}</p>
                    
                  </CardContent>
                  <CardDescription className="flex mx-6">
                  
                    <p>Date-</p>
                    <p>{formattedDate}</p>
                  
                  </CardDescription>
                  <CardDescription className="flex mx-6">
                
                    <p>Time-</p>
                   
                    <p>{formattedTime}</p>
                  </CardDescription>
                  <CardFooter className="flex justify-end">
                    {loading && messageId === element._id ? (
                      <SpecialLoadingButton
                        content={"Deleting"}
                        width={"w-32"}
                      />
                    ) : (
                      <Trash2
                        className="w-5 h-5"
                        onClick={() => handleMessageDelete(element._id)}
                      />
                    )}
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <h1 className="text-2xl font-bold mb-8 ">No message Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
