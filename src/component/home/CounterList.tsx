import { ProductCountType } from "./DashBoard";

const CounterList = ({ productCount }: ProductCountType) => {
  return (
    <>
      <ul>
        <li>
          <p>아이콘</p>
          <div>
            <p>등록된 상품 갯수</p>
            <p>{productCount}개</p>
          </div>
        </li>
        <li>
          <p>아이콘</p>
          <div>
            <p>가입한 회원 수</p>
            <p></p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default CounterList;
