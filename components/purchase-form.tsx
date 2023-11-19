"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeft, CreditCard, KeyRoundIcon, Pin, Wallet } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PurchaseForm {
  productId: string;
}

export const PurchaseForm: React.FC<PurchaseForm> = ({ productId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
 
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      creditCardNumber: '',
      creditCardCode: '',
      firstLastName: '',
      address: '',
      countryState: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);
      
      toast.success('Success!');
    } catch (error: any) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 space-y-4">
          <label className="text-md font-bold">First and Last name</label>
          <div className="flex items-center">
           <Input
              className="w-80 rounded-lg border placeholder:font-bold required:ring-0"
              required
              disabled={loading}
              placeholder="John Doe"
              {...register("firstLastName", { required: true })}
            />
            <PersonIcon className="ml-3" />
          </div>
        </div>
        <div className="mb-2 space-y-4">
          <label className="text-md font-bold">Credit Card Number</label>
          <div className="flex items-center">
            <Input 
              className="w-full rounded-lg border placeholder:font-bold required:ring-0"
              required
              disabled={loading}
              {...register("creditCardNumber", { required: true })}
              placeholder="4242 4242 4242 4242"         
            />
            <CreditCard className="ml-3" />
          </div>
        </div>
        <div className="mb-2 space-y-4">
          <label className="text-md font-bold">Credit Card Code</label>
          <div className="flex items-center">
            <Input 
              className="w-full rounded-lg border placeholder:font-bold required:ring-0"
              required
              disabled={loading}
              {...register("creditCardCode", { required: true })}
              placeholder="000"
            /> 
            <KeyRoundIcon className="ml-3" />
          </div>
        </div>
        <div className="mb-2 space-y-4">
          <label className="text-md font-bold">Country</label>
          <div className="flex items-center">
            <Input 
              className="w-80 rounded-lg border placeholder:font-bold required:ring-0"
              required
              disabled={loading}
              {...register("countryState",{ required: true })}
              placeholder="United States, New York"
            /> 
            <Pin className="ml-3" />
          </div>
        </div>
        <div className="mb-2 space-y-4">
          <label className="text-md font-bold">Address</label>
          <div className="flex items-center">
            <Input 
              className="w-80 rounded-lg border placeholder:font-bold required:ring-0"
              required
              disabled={loading}
              {...register("address", { required: true })}
              placeholder="New York City, 555 Wall St."
            /> <Pin className="ml-3" />
          </div>
        </div>
        <Separator className="mt-3 mb-3" />
        <div className="flex items-center justify-between">
          <Button disabled={loading} type="button" variant="outline" onClick={() => router.push(`/shop/product/${productId}'`)} >
            Go Back <ArrowLeft className="ml-2 h-4 w-4" />
          </Button>
          <Button disabled={loading}>
            Purchase <Wallet className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}