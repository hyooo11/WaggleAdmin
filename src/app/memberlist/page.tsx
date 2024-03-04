import GlovalTop from "@/component/common/GlovalTop";
import MemberList from "@/component/memberList/MemberList";

const ProductListPage = () => {
  return (
    <div className="gloval-content-wrap">
      <GlovalTop pagename={"회원리스트"} />
      <div className="gloval-content">
        <MemberList />
      </div>
    </div>
  );
};

export default ProductListPage;
