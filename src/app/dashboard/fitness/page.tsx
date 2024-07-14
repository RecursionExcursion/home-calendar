import FitnessParent from "@/components/fitness/FitnessParent";
import VerticalGrid from "@/components/ui/VerticalGrid";
import { getUserIdFromCookie } from "@/lib/cookieManager";
import { getFitnessData } from "@/service/fitnessService";

const FitnessPage = async () => {
  const userId = await getUserIdFromCookie();

  if (!userId) {
    return <div>No User</div>;
  }

  const fitnessData = await getFitnessData(userId);
  
  if(!fitnessData){
    return <div>No User</div>;
  }

  return (
    <VerticalGrid>
      <FitnessParent fitnessData={fitnessData} />
    </VerticalGrid>
  );
};
export default FitnessPage;
