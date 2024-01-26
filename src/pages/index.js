import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';


export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
       <EmojiPicker />
       <input type="text" />
    </main>
  );
}
