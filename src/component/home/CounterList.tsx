import { WidgetCounterType } from "./DashBoard";
import { FaWineBottle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import CounterCard from "@/ui/CounterCard";

const CounterList = ({ productCount, memberList }: WidgetCounterType) => {
  return (
    <div className="CounterList flex justify-between">
      <CounterCard
        icons={<FaWineBottle />}
        descText={"등록된 상품 갯수"}
        counterNumber={productCount}
      />
      <CounterCard
        icons={<FaUserGroup />}
        descText={"회원 수"}
        counterNumber={memberList?.length}
      />
    </div>
  );
};

export default CounterList;
