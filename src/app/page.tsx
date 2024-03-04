import GlovalTop from "@/component/common/GlovalTop";
import DashBoard from "@/component/home/DashBoard";

export default function Home() {
  return (
    <div className="gloval-content-wrap">
      <GlovalTop pagename={"대시보드"} />
      <div className="gloval-content">
        <DashBoard />
      </div>
    </div>
  );
}
