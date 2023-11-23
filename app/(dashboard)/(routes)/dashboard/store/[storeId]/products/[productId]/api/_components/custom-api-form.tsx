"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { ArrowDown, BrainCircuit } from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

type RequestMethod = "POST" | "PATCH" | "GET" | "DELETE"

export const CustomApiForm = ({ productId, storeId }: {
  productId: string,
  storeId: string
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestMethod, setRequestMethod] = useState<RequestMethod>();
  const [hydration, setHydration] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setHydration(true);
  }, [hydration, setHydration]);

  if (!hydration) {
    router.refresh();
  }

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      allowedIps: '',
      apiName: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!requestMethod) {
        return toast.error("Missing Request Method.");
      }

      toast.success("Success!");
      console.log(values, requestMethod);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-start fixed space-x-4 gap-x-2 space-y-4 sm:p-2 p-4 flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:pb-2 space-y-4 space-x-2">
          <label htmlFor="apiName" className="gap-x-2 pl-2 mb-6 text-lg font-bold sm:font-medium">Api Name</label>
          <Input 
            id="apiName" 
            className="w-96 hover:ring-2 hover:ring-sky-600 duration-300 transition-all" 
            {...register("apiName", { required: true })}
            required
            disabled={isLoading}
          />
          <span id="description" className="text-muted-foreground font-medium text-center">The Api's name.</span>
          <span id="errors" className="text-rose-600 text-md font-medium">{errors.root?.message}</span>
        </div>
        <div className="sm:pb-2 space-y-4 space-x-2">
          <label htmlFor="allowedIps" className="gap-x-2 pl-2 mb-6 text-lg font-bold sm:font-medium">Allowed IP's</label>
          <Input 
            id="allowedIps"
            className="w-96 hover:ring-2 hover:ring-sky-600 duration-300 transition-all"
            {...register("allowedIps", { required: true })}
            disabled={isLoading}
          />
          <span id="description" className="text-muted-foreground font-medium text-center">The only allowed IP address allowed to use this Api.</span>
          <span id="errors" className="text-rose-600 text-md font-medium">{errors.root?.message}</span>
        </div>
        <div className="sm:pb-2 space-y-4 space-x-2">
          <label htmlFor="requestMethod" className="gap-x-2 pl-2 mb-6 text-lg font-bold sm:font-medium">Request Method</label>
          <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading}>
              <Button variant="outline" size="icon">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Methods</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRequestMethod("PATCH")}>Patch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRequestMethod("POST")}>Post</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRequestMethod("DELETE")}>Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRequestMethod("GET")}>Get</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4 space-x-2">
          <Button disabled={isLoading} className="ml-2 text-center">
            <BrainCircuit className="h-4 w-4 mr-2" /> Create API
          </Button>
        </div>
      </form>
    </div>
  )
};