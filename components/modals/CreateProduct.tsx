"use client";

import axios from "axios";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useCreateProduct } from "@/hooks/useCreateProduct";

import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ModalProps {
  storeId: string;
}

export const CreateProductModal = ({
  storeId
}: ModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const createProduct = useCreateProduct();

  const [isMounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    router.refresh();
  }

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

      const newProductPrice = values.productPrice as number;

      // console.log(fileName, fileContent);
      
      const TransportData = JSON.parse(JSON.stringify({
        storeId,
        fileName,
        fileContent,
        productName: values.productName,
        productPrice: newProductPrice,
      }));

      const createProduct = await axios.post('/api/product', {
        ...TransportData
      });
      
      if (createProduct.status === 200) {
        toast.success('Product created!');
      }
    } catch (error: any) {
      toast.error('Something went wrong!');
      console.log(error);
    } finally {
      // setIsLoading(false);
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
    <Dialog open={createProduct.isOpen} onOpenChange={createProduct.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Create a Product
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-4">
              <label htmlFor="productName" className="text-center text-primary font-bold">Product Name</label>
              <input
                id="productName"
                disabled={isLoading}
                {...register("productName", { required: true })}
                className="w-full px-8 py-[9px] rounded-lg border hover:border-black duration-300 hover:border-gray-900 hover:border-bold"
              />
            </div>
            <div className="mb-4 space-y-4">
              <label htmlFor="productPrice" className="text-center text-primary font-bold">Product Price</label>
              <input
                id="productPrice"
                disabled={isLoading}
                {...register("productPrice", { required: true })}
                className="w-full px-8 py-[9px] rounded-lg border hover:border-black duration-300 hover:border-gray-900 hover:border-bold"
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
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}