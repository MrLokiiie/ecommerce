"use client";

interface CreateInformation {
  initalData: PersonalInformation,
  currentUser: Account;
}

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import toast from "react-hot-toast";
import { Account, PersonalInformation } from "@prisma/client";

import { useCreateInformation } from "@/hooks/use-create-information";
import {
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { serverActions } from "@/tools/server-actions";

export const CreateInformation: React.FC<CreateInformation> = ({ initalData, currentUser }) => {
  const createInformation = useCreateInformation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      initalData: initalData || {
        firstName: '',
        lastName: '',
        creditCardNumber: '',
        creditCardCode: '',
      }
    }
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      type CreateInformationData = {
        firstName: string;
        lastName: string;
        creditCardNumber: string;
        creditCardCode: string;
      }

      const data: CreateInformationData = {
        firstName: values.firstName,
        lastName: values.lastName,
        creditCardNumber: values.creditCardNumber,
        creditCardCode: values.creditCardCode
      };

      const createInformationAction = await serverActions.createInformation(data, currentUser.id);

      console.log(createInformationAction);
      toast.success("Success!");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  const shouldBeOpen = createInformation.isOpen ? true : false;

  return (
    <Dialog open={createInformation.isOpen} onOpenChange={createInformation.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Personal Information
          </DialogTitle>
          <DialogDescription className="text-center">
            So we can transact purchases.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-4">
              <label className="font-bold sm:text-md text-lg">
                First Name
              </label>
              <Input
                id="firstName"
                disabled={isLoading}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="mb-4 space-y-4">
              <label className="font-bold sm:text-md text-lg">
                Last Name
              </label>
              <Input 
                id="lastName"
                disabled={isLoading}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="mb-4 space-y-4">
              <label className="font-bold sm:text-md text-lg">
                Credit Card Number
              </label>
              <Input 
                id="creditCardNumber"
                disabled={isLoading}
                {...register("creditCardNumber", { required: true })}
              />
              <span className="text-muted-foreground text-sm tex-neutral-350">
                We use AES256 to hash your number.
              </span>
            </div>
            <div className="mb-4 space-y-4">
              <label className="font-bold sm:text-md text-lg">
                Credit Card Code
              </label>
              <Input 
                id="creditCardCode"
                disabled={isLoading}
                {...register("creditCardCode", { required: true })}
              />
              <span className="text-muted-foreground text-sm text-neutral-350">
                We use AES256 to hash your code.
              </span>
            </div>
            <Separator />
            <div className="flex items-center mt-6">
              <Button className="w-full">Create Information</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}