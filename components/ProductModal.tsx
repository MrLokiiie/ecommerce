"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { Product } from "@prisma/client";

import { useProductModal } from "@/hooks/useProductModal";

import {
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface ProductModalProps {
  initalData: Product;
};

export const ProductModal: React.FC<ProductModalProps> = ({
  initalData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const productModal = useProductModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      productName: '',
      productPrice: 0,
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      console.log(initalData.storeId);

      const transportData = JSON.parse(JSON.stringify({
        productName: values.productName as string,
        productPrice: parseInt(values.productPrice) as number,
        fileName,
        productId: initalData.id,
        fileContent,
        storeId: initalData.storeId
      }));

      const updateProduct = await axios.post(`/api/product/${initalData.id}`, {
        ...transportData
      });


    } catch (error: any) {
      console.log(`There was an error updating the Product. Error: ${error}`);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /// @ts-ignore
    const file = event.target.files[0];
    const reader = new FileReader();

    const fileReader = reader.onload = (e) => {
      const fileContent = e.target?.result;
      const fileName = file.name;
      
      setFileContent(`${fileContent}`);
      setFileName(fileName)
    }

    const text = reader.readAsText(file);
  };

  return (
    <Dialog open={productModal.isOpen} onOpenChange={productModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Product Settings
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-4">
              <label htmlFor="productName" className="text-center text-primary font-bold">Product Name</label>
              <Input
                id="productName"
                disabled={isLoading}
                {...register("productName", { required: true })}
                className="p-4"
                placeholder={initalData.productName}
              />
            </div>
            <div className="mb-4 space-y-4">
              <label htmlFor="productName" className="text-center text-primary font-bold">Product Name</label>
              <Input
                id="productPrice"
                disabled={isLoading}
                {...register("productPrice", { required: true })}
                className="p-4"
                placeholder={initalData.productName}
              />
            </div>
            <div className="mb-4 space-y-4">
              <label htmlFor="downloadContent" className="text-center text-primary font-bold">Download Content</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
              <Button type="button" className="w-full" onClick={handleButtonClick}>
                Select File
              </Button>
            </div>
            <div className="w-full py-[0.0750px] rounded-full bg-black mt-6 mb-6" />
            <div className="mt-6">
              <Button disabled={isLoading} className="w-full">
                Update Product
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}