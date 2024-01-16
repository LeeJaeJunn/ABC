"use client";

import { useState } from "react";
import Header from "./component/header";
import AiChat from "./component/ai-chat";
import AiImage from "./component/ai-image";
import MainPage from "./component/main-page";

export default function Home() {
  const [selected, setSelected] = useState(1);

  const handleOnPressMenu = (e: number) => {
    setSelected(e);
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-800 space-y-8">
      <Header onPressMenu={handleOnPressMenu} />
      {selected === 1 && <MainPage />}
      {selected === 2 && <AiImage />}
      {selected === 3 && <AiChat />}
    </main>
  );
}
