"use client";

import axios from "axios";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Store } from "@prisma/client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useCreateStore } from "@/hooks/useCreateStoreModal";
import { Button } from "@/components/ui/button";

export const CreateStoreModal = ({
  stores
}: {
  stores: Store;
}) => {
  const storeModal = useCreateStore();
  const [isMounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!stores || !stores.id) {
    storeModal.isOpen = true;
  }

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      storeName: '',
      storeDescription: ''
    }
  });

  useEffect(() => {
    setMounted(true);
  }, [isMounted, setMounted]);

  if (!isMounted) {
    return "";
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      
      const TransportValues = JSON.parse(JSON.stringify({
        storeName: values.storeName,
        storeDescription: values.storeDescription
      }));

      const createStore = await axios.post(`/api/stores`, {
        ...TransportValues
      });
      
      console.log(createStore.data);
    } catch (error) {
      console.log(`[CREATE_STORE_MODAL] # ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={storeModal.isOpen}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Create a Store
          </DialogTitle>
          <DialogDescription className="text-center">
            {stores && <Button className="" onClick={storeModal.onClose}>Close</Button>}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary/100 px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <div className="mb-4 space-y-4">
              <label htmlFor="storeName" className="text-center text-primary font-bold">Store Name</label>
              <input 
                id="storeName"
                disabled={isLoading}
                {...register("storeName", { required: true })}
                className="w-full px-8 py-[9px] rounded-lg border hover:border-black duration-300 hover:border-gray-900 hover:border-bold"
              />
            </div>
            <div className="mb-4 space-y-4">
              <label htmlFor="storeName" className="text-center text-primary font-bold">Store Description</label>
                <input
                  id="storeDescription"
                  disabled={isLoading}
                  {...register("storeDescription", { required: true })}
                  className="w-full px-8 py-[9px] rounded-lg border hover:border-black duration-300 hover:border-gray-900 hover:border-bold"
              />
            </div>
            <div className="w-full py-[0.0750px] rounded-full bg-black mt-6 mb-6" />
            <div className="mt-6">
              <Button disabled={isLoading} className="w-full bg-gray-900">
                Create Store
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}