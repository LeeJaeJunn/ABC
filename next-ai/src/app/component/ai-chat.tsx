import { useState } from "react";
import Spinner from "./spinner";

interface DataType {
  role: string;
  content: string;
}

const exampleText = [
  "수채화 형식의 아름다운 들판. 큰 나무가 있고 주변에는 사슴과 토끼가 뛰어놀고있어.",
  "배경은 빈센트 반 고흐의 별의 빛나는 밤 이고 앞에 도도한 고양이가 그루밍하고있어.",
  "사진 형식의 도시 야경. 위에서 아래로 내려다보고있고 차가 별로 없고 가로등이 매우 밝아.",
  "만화 형식의 멋진 강아지를 그려줘. 털은 갈색이고 두 발로 서있어.",
];

const AiChat = () => {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const handleOnChangeTextarea = (e: any) => {
    setText(e.target.value);
  };

  const handleOnPressButton = async () => {
    setText("");
    setIsLoading(true);
    // 영어로 변환
    const eng = await translationEng(text);
    if (!eng) {
      // console.log("데이터 ㄴㄴ", eng);
      return;
    }
    console.log("영어", eng);

    try {
      fetch(`http://localhost:4000/image?data=${encodeURIComponent(eng)}`)
        .then((res) => {
          return res.text();
        })
        .then((item) => {
          console.log("next 데이터 처리 완료", item);
          setAnswer(item);
          setText("");
          setIsLoading(false);
        });
    } catch (e) {
      setAnswer("오류가 발생했습니다.");
      console.log("데이터 보내는 중 오류", e);
    }
  };

  // 한국어를 영어로 번역
  const translationEng = async (data: string) => {
    let eng;
    try {
      eng = await fetch(
        `http://localhost:4000/translation?data=${encodeURIComponent(data)}`
      )
        .then((res) => {
          return res.text();
        })
        .then((item) => {
          // console.log("영어 번역 완료", item);
          return item;
        });
    } catch (e) {
      console.log("영어 번역 중 에러");
      eng = null;
    }
    return eng;
  };

  const handleOnPressExampleTextButton = () => {
    const randomIndex = Math.floor(Math.random() * exampleText.length);

    setText(exampleText[randomIndex]);
  };

  return (
    <div className="w-full space-y-10 flex flex-col items-center">
      <div className=" w-full space-y-5 flex flex-col items-center">
        <div className="flex flex-col items-center ">
          <h1 className="text-xl">원하는 이미지를 입력하세요!</h1>
          <h1 className="text-sm text-gray-500">
            자세히 입력할수록 그림이 정확하게 나옵니다.
          </h1>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-2/3">
            <button onClick={handleOnPressExampleTextButton}>
              <h1 className="text-sm text-gray-500">텍스트 예시</h1>
            </button>
          </div>
          <textarea
            className="rounded-lg border-2 border-blue-800 w-2/3 px-3"
            value={text}
            onChange={handleOnChangeTextarea}
          />
        </div>
      </div>
      {text === "" ? (
        <button
          className="text-gray-500 rounded-lg bg-gradient-to-r from-green-300 to-blue-300 h-10 items-center justify-center px-5"
          disabled
        >
          <h1>입력해주세요</h1>
        </button>
      ) : (
        <button
          onClick={handleOnPressButton}
          className="rounded-lg bg-gradient-to-r from-green-300 to-blue-300 h-10 items-center justify-center px-5"
        >
          <h1>이미지 생성</h1>
        </button>
      )}
      {isloading && (
        <div className="flex flex-col items-center">
          <h1>그림을 멋지게 그리는중...</h1>
          <Spinner />
        </div>
      )}
      {!(answer === "") && (
        <div className="w-full grid grid-cols-5">
          <div className="grid col-span-1" />
          <div className="grid col-span-3">
            <div className="flex flex-col">
              <a href={answer} className="w-20">
                <h1 className="text-blue-500 underline text-sm">
                  이미지로 이동
                </h1>
              </a>
              <img src={answer} alt="image" className="rounded-lg" />
            </div>
          </div>
          <div className="grid col-span-1" />
        </div>
      )}
      <h1>{answer}</h1>
    </div>
  );
};

export default AiChat;
