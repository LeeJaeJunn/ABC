import Image from "next/image";

const MainPage = () => {
  return (
    <div className="w-full h-full space-y-10 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-3xl">AI Art Brush Canvas</h1>
        <h1>
          간단하게 선택해서 그리거나 직접 텍스트를 입력해서 AI로 그림을
          그려보세요.
        </h1>
      </div>

      <div className="grid grid-cols-3">
        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-cat.png"
              alt="cat"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">수채화 형식의 귀여운 고양이</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center max-w-full relative group">
          <img
            src="/image/ai-car.png"
            alt="car"
            className="group-hover:brightness-50 transition duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <h1 className="text-white">만화 형식의 피카소풍 멋있는 스포츠카</h1>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-bunny.png"
              alt="bunny"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">수채화 형식의 귀여운 토끼와 꽃</h1>
            </div>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-human.png"
              alt="human"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">사진 형식의 잘생긴 남자</h1>
            </div>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-car-2.png"
              alt="car"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">수묵화 형식의 멋있는 트럭</h1>
            </div>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-nightsky.png"
              alt="nature"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">
                산이 있으며 하늘에는 별똥별에 떨어지는 아름다운 밤하늘
              </h1>
            </div>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-city.png"
              alt="city"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">
                건물과 자동차가 많은 멋진 도시 야경
              </h1>
            </div>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-nature.png"
              alt="nature"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">
                수채화 형식이며 큰 나무가 있고 사숨이 쉬고있는 아름다운 들판
              </h1>
            </div>
          </div>
        </div>

        <div className="grid col-span-1">
          <div className="flex flex-col items-center max-w-full relative group">
            <img
              src="/image/ai-dog.png"
              alt="dog"
              className="group-hover:brightness-50 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h1 className="text-white">
                빈센트 반 고흐의 별이 빛나는 밤 배경의 귀여운 강아지
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
