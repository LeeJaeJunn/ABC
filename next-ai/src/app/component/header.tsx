import Image from "next/image";

const Header = ({ onPressMenu }: { onPressMenu: (e: number) => void }) => {
  return (
    <div className="px-2 bg-gray-800">
      <div className="flex h-16 justify-between px-8 text-white">
        <div className="flex flex-1 items-center justify-start space-x-8">
          <button onClick={() => onPressMenu(1)}>
            <h1>메인페이지</h1>
          </button>
          <button onClick={() => onPressMenu(2)}>
            <h1>선택해서 그리기</h1>
          </button>
          <button onClick={() => onPressMenu(3)}>
            <h1>텍스트로 그리기</h1>
          </button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-8">
          {/* <img src="/icon.png" alt="icon" className="w-15" /> */}
          <Image src={"/icon.png"} alt="icon" width={100} height={50} />
        </div>
      </div>
    </div>
  );
};

export default Header;
