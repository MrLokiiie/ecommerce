import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/tools/CurrentUser"

export default async function Auth() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}