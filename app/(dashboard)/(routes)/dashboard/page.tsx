import { getCurrentUser } from "@/tools/CurrentUser";
import { GetStores } from "@/tools/GetStores";


const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  
  return (
    <div>
      {currentUser?.account_cookie}
    </div>
  )
}

export default DashboardPage;
