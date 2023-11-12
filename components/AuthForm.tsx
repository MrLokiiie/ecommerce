"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

import { AuthInput } from "@/components/FormInputSetup";
import { CustomButton } from "@/components/ButtonLink";
import { Button } from "@/components/ui/button";

type AuthFormType = "LOGIN" | "SIGNUP";

export const AuthForm = () => {
  const router = useRouter();

  const [variant, setFormVariant] = useState<
    AuthFormType>("SIGNUP");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeVariantButtonText = variant === "LOGIN" ? "or signup..." : "or login...";

  const setVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setFormVariant("SIGNUP");
    } else if (variant === "SIGNUP") {
      setFormVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
    
      if (variant === "SIGNUP") {
        const emailProvider = values.email.split("@")[1];

        if (emailProvider !== "gmail.com") {
          console.log("Email provider must be gmail!");
        } else {
          const createAccount = await axios.post('/api/register', {
            name: values.name,
            password: values.password,
            email: values.email,
          });

          console.log(createAccount.data);

          if (createAccount.status === 200) {
            toast.success('Success!');
            setTimeout(() => {
              router.push('/dashboard');
            }, 3000);
          }
        }
      } else if (variant === "LOGIN") {
        const signIn = await axios.post(`/api/cookie`, {
          password: values.password,
          email: values.email
        });

        console.log(signIn.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === "SIGNUP" && (
            <AuthInput
              id="name"
              register={register}
              isRequired
              label="Username"
              disabled={isLoading}
              type="text"
            />
          )}
          <AuthInput 
            id="email"
            register={register}
            isRequired
            disabled={isLoading}
            label="Email"
            description="only gmail is able to be used"
            type="email"
          />
          <AuthInput
            id="password"
            register={register}
            label="Password"
            isRequired
            disabled={isLoading}
            description="make sure your password is written down somewhere & saved"
            type="password"
          />
          <div>
            <Button disabled={isLoading} className="w-full bg-sky-600" type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-2">
          <CustomButton
            label={changeVariantButtonText}
            type="button"
            onClick={setVariant}
          />
        </div>
      </div>
    </div>
  )
}
