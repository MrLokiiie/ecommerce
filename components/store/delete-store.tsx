"use client";

import axios from "axios";

import '@/app/globals.css';

import { useRouter } from "next/navigation";

import { useState } from 'react';
import toast from "react-hot-toast";

import { useDeleteStore } from "@/hooks/use-delete-store";

import { Button } from "@/components/ui/button";

interface DeleteProductProps {
  storeId: string;
  storeName: string;
};

export const DeleteStore: React.FC<DeleteProductProps> = ({ storeId, storeName }) => {
  const router = useRouter();
  const deleteProduct = useDeleteStore();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const isHidden = deleteProduct.isOpen ? false : true;

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      
      const deleteProduct = await axios.delete(`/api/stores/${storeId}`);

      toast.success('Success!')
    } catch (error: any) {
      console.log(error);
      deleteProduct.onClose();
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
      router.push('/dashboard');
    }
  }

  return (
    <div hidden={isHidden}>
      <div className="flex items-center justify-end fixed bottom-0">
        <div className="m-12 gap-x-2 space-y-4 h-[60px] sticky w-min bg-secondary border rounded-lg shadow-lg bottom-0">
          <div className="ml-2 mt-1 flex mx-auto">
            <div id="text-holder" className="block items-center justify-between fixed">
              <span className="font-bold text-md block">Are you sure?</span>
              <span className="text-muted-foreground text-sm">{storeName}</span>
            </div>
            <div className="ml-[120px] flex items-center justify-center mr-2">
              <Button 
                variant="destructive" 
                className="mr-3 w-[160px]"
                onClick={onSubmit}
              >
                Delete
              </Button>
              <Button 
                onClick={deleteProduct.onClose} 
                variant="outline" 
                className="w-[160px]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
