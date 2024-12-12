import CategoryChart from "@/components/CategoryChart";
import FinancialChart from "@/components/FinancialChart";
import UserCard from "@/components/UserCard";
import VendorChart from "@/components/VendorChart";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/*LEFT*/}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Sales" bgColor="bg-lime-400" />
          <UserCard type="Income" bgColor="bg-blue-300" />
          <UserCard type="Visitor" bgColor="bg-gray-300" />
          <UserCard type="Profit" bgColor="bg-red-500" />
        </div>
        {/* MIDDLE CHART */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* VENDOR CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <VendorChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            {/* SALE CHART */}
            <CategoryChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinancialChart />
        </div>
      </div>
      {/*RIGHT*/}
      <div className="w-full lg:w-1/3"></div>
    </div>
  );
};

export default AdminPage;
