import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { db } from "@/libs/db";
import { getCurrentUser } from "@/tools/CurrentUser"

const UprgadeToProPage = async () => {
  const currentUser = await getCurrentUser();
  
  const userInformation = await db.personalInformation.findUnique({
    where: {
      userId: currentUser?.id
    }
  });

  type CreditCardNumberSlices = {
    sliceOne: any;
    sliceTwo: any;
    sliceThree: any;
    sliceFour: any;
  };

  const {
    sliceOne,
    sliceTwo,
    sliceFour,
    sliceThree
  }: CreditCardNumberSlices = {
    sliceOne: userInformation?.creditCardNumber.slice(0,4),
    sliceTwo: userInformation?.creditCardNumber.slice(5,8),
    sliceThree: userInformation?.creditCardNumber.slice(9,12),
    sliceFour: userInformation?.creditCardNumber.slice(13,16),
  }

  const ccn=`${sliceOne}-${sliceTwo}-${sliceThree}-${sliceFour}`.replace('-', ' ');

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div 
        className="
          flex 
          items-center 
          flex-col
          fixed p-4 
          bg-secondary h-auto rounded-lg border border-gray-400
          w-96 shadow-md hover:shadow-sm hover:shadow-slate-600 transition-all
        "
      >
        <div>
          <h1 className="text-2xl sm:font-bold font-medium space-y-4">
            Upgrade
          </h1>
        </div>
        <Separator className="w-full mt-4 mb-4" />
        <div className="mr-auto">
          <label className="sm:font-bold font-medium text-md">
            Credit Card Number
          </label>
          <Input 
            className="w-full s"
            placeholder={ccn}
          />
        </div>
      </div>
    </div>
  );
};

export default UprgadeToProPage;