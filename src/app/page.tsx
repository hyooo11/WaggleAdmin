import GlovalTop from "@/component/common/GlovalTop";
import DashBoard from "@/component/home/DashBoard";

export default function Home() {
  return (
    <div className="gloval-content-wrap">
      <GlovalTop />
      <div className="gloval-content">
        <DashBoard />
      </div>
    </div>
  );
}
