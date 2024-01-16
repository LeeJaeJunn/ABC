import { useState } from "react";
import data from "../data/data.json";
import Spinner from "./spinner";

const AiImage = () => {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [selected3, setSelected3] = useState("");
  const [selected4, setSelected4] = useState("");
  const [selected5, setSelected5] = useState("");

  const [subjectIndex, setSubjectIndex] = useState(0);
  const [detailIndex, setDetailIndex] = useState(0);

  const handleOnPressButton = async () => {
    setSelected1("");
    setSelected2("");
    setSelected3("");
    setSelected4("");
    setSelected5("");
    setAnswer("");

    setIsLoading(true);
    let eng;
    // 영어로 변환
    if (selected5 === "") {
      eng = await translationEng(
        `${selected2}를 ${selected3} ${selected4}형식으로 그려줘`
      );
      console.log(
        "한국어:",
        `${selected2}를 ${selected3} ${selected4}형식으로 그려줘`
      );
    } else {
      eng = await translationEng(
        `${selected2}를 ${selected3} ${selected4}형식의 ${selected5} 화풍으로 그려줘`
      );
      console.log(
        `${selected2}를 ${selected3} ${selected4}형식의 ${selected5} 화풍으로 그려줘`
      );
    }

    console.log(eng);
    if (!eng) {
      return;
    }

    try {
      fetch(`http://localhost:4000/image?data=${encodeURIComponent(eng)}`)
        .then((res) => {
          return res.text();
        })
        .then((item) => {
          console.log("next 데이터 처리 완료", item);
          setAnswer(item);
          setIsLoading(false);
        });
    } catch (e) {
      setAnswer("오류가 발생했습니다.");
      console.log("데이터 보내는 중 오류", e);
      setIsLoading(false);
    }
  };

  const handleOnPressadvancedOption = (item: string) => {
    if (selected5 === item) {
      setSelected5("");
    } else {
      setSelected5(item);
    }
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setText("");
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

  return (
    <div className="w-full h-full space-y-10 flex flex-col items-center">
      <div className="text-3xl">
        {selected5 === "" ? (
          <h1 className="flex flex-row items-end text-gray-800">
            {selected2 === "" ? (
              <a className="underline font-semibold text-4lg text-gray-300">
                주제
              </a>
            ) : (
              <a className="underline font-semibold text-4lg text-black">
                {selected2}
              </a>
            )}
            를&nbsp;
            {selected3 === "" ? (
              <a className="underline font-semibold text-4lg text-gray-300">
                느낌
              </a>
            ) : (
              <a className="underline font-semibold text-4lg text-black">
                {selected3}
              </a>
            )}
            &nbsp;
            {selected4 === "" ? (
              <a className="underline font-semibold text-4lg text-gray-300">
                그림체
              </a>
            ) : (
              <a className="underline font-semibold text-4lg text-black">
                {selected4}
              </a>
            )}
            형식으로 그려주세요!!
          </h1>
        ) : (
          <h1 className="flex flex-row items-end">
            {selected2 === "" ? (
              <a className="underline font-semibold text-4lg text-gray-300">
                주제
              </a>
            ) : (
              <a className="underline font-semibold text-4lg text-black">
                {selected2}
              </a>
            )}
            를&nbsp;
            {selected3 === "" ? (
              <a className="underline font-semibold text-4lg text-gray-300">
                느낌
              </a>
            ) : (
              <a className="underline font-semibold text-4lg text-black">
                {selected3}
              </a>
            )}
            &nbsp;
            {selected4 === "" ? (
              <a className="underline font-semibold text-4lg text-gray-300">
                그림체
              </a>
            ) : (
              <a className="underline font-semibold text-4lg text-black">
                {selected4}
              </a>
            )}
            형식의&nbsp;
            <a className="underline font-semibold text-4lg">{selected5}</a>
            &nbsp;화풍으로 그려주세요!!
          </h1>
        )}
      </div>

      <div className="w-full space-y-10">
        {/* -----------------selected1------------------ */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-xl font-semibold">주제</h1>
          <div className="flex flex-row space-x-6">
            {data.subject.map((item, index) => (
              <div className="flex items-center gap-x-3" key={index}>
                <input
                  name="2"
                  type="radio"
                  checked={selected1 === item.option}
                  onChange={() => {
                    setSelected1(item.option);
                    setSubjectIndex(index);
                    setSelected2("");
                    setSelected3("");
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label>{item.option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------selected2,3------------------ */}
        {selected1 === "" ? (
          <></>
        ) : (
          <div className=" space-y-10">
            <div className="flex flex-col items-center space-y-3">
              <h1 className="text-xl font-semibold">종류</h1>
              <div className="flex flex-row space-x-6">
                {data.subject[subjectIndex].detail.map((item, index) => (
                  <div
                    className="flex items-center gap-x-3"
                    key={`${index}, ${item.secOption}`}
                  >
                    <input
                      name="3"
                      type="radio"
                      checked={selected2 === item.secOption}
                      onChange={() => {
                        setSelected2(item.secOption);
                        setDetailIndex(index);
                        setSelected3("");
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label>{item.secOption}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h1 className="text-xl font-semibold">느낌</h1>
              <div>
                <div className="flex flex-row space-x-6">
                  {data.subject[subjectIndex].detail[detailIndex].secDetail.map(
                    (item, index) => (
                      <div
                        className="flex items-center gap-x-3"
                        key={`${index}, ${item}, ${selected3}`}
                      >
                        <input
                          name="4"
                          type="radio"
                          onChange={() => setSelected3(item)}
                          checked={selected3 === item}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label>{item}</label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -----------------selected4------------------ */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-xl font-semibold">그림체</h1>
          <div className="flex flex-row space-x-6">
            {data.style.map((item, index) => (
              <div className="flex items-center gap-x-3" key={index}>
                <input
                  name="1"
                  type="radio"
                  checked={selected4 === item}
                  onChange={() => setSelected4(item)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label>{item}</label>
              </div>
            ))}
          </div>
        </div>
        {/* -----------------selected5------------------ */}
        <div className="flex flex-col items-center space-y-3">
          <div>
            <h1 className="text-xl font-semibold">고급옵션</h1>
            <button onClick={() => setSelected5("")}>
              <h1 className="text-gray-500">(선택취소)</h1>
            </button>
          </div>
          <div className="flex flex-row space-x-6">
            {data.advancedOption.map((item, index) => (
              <div
                className="flex items-center gap-x-3"
                key={`${index}, ${item}`}
              >
                <input
                  name="5"
                  type="radio"
                  onChange={() => setSelected5(item)}
                  checked={selected5 === item}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!(selected1 === "") &&
      !(selected2 === "") &&
      !(selected3 === "") &&
      !(selected4 === "") ? (
        <button
          onClick={handleOnPressButton}
          className="rounded-lg bg-gradient-to-r from-blue-300 to-green-300 h-10 items-center justify-center px-5"
        >
          <h1>이미지 생성</h1>
        </button>
      ) : (
        <button
          className="text-gray-500 rounded-lg bg-gradient-to-r from-blue-300 to-green-300 h-10 items-center justify-center px-5"
          disabled
        >
          <h1>선택을 완료해주세요</h1>
        </button>
      )}
      <div className="w-full flex flex-row justify-center">
        {isloading && (
          <div className="flex flex-col items-center">
            <h1>그림을 멋지게 그리는중...</h1>
            <Spinner />
          </div>
        )}
        {!(answer === "") && !(answer === "로딩중") && (
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

        {/* <Image alt="image" src={answer} /> */}
      </div>

      {/* <form onSubmit={handleOnSubmit} className="flex flex-row">
        <h1>질문 : </h1>
        <input
          className="bg-gray-300"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div>
        <h1>답변 : </h1>
        {answer.length < 22 ? (
          <h1>{answer}</h1>
        ) : (
          <a href={answer}>
            <h1>사진으로 이동</h1>
          </a>
        )}
      </div> */}
    </div>
  );
};

export default AiImage;
