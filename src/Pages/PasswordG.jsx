/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./PasswordG.css";
import CheckBox from "../Components/CheckBox";
import { message } from "antd";

function PasswordG() {
  const [password, setPassword] = useState({
    length: 10,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handelChangeLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };
  const handelChangeUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };
  const handelChangeNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  };
  const handelChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  };

  const setPasswordLength = (value) => {
    setPassword({
      ...password,
      length: value,
    });
  };

  function generatePassword() {
    const { length, uppercase, lowercase, numbers, symbols } = password;

    if (
      uppercase == true ||
      lowercase == true ||
      numbers == true ||
      symbols == true
    ) {
      if (length > 5) {
        const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

        // const charactersCodes = Array.from(Array(26).map((_,i)=>i+97))
        // const lowerCaseLetters = charactersCodes.map(letter => String.fromCharCode(letter))

        // const upperCaseLetters = lowerCaseLetters.map(letter=>letter.toUpperCase())
        const lowerCaseLetters = Array.from({ length: 26 }, (_, i) =>
          String.fromCharCode(i + 97)
        );
        const upperCaseLetters = lowerCaseLetters.map((letter) =>
          letter.toUpperCase()
        );

        const availableCharacters = [
          ...(uppercase ? upperCaseLetters : []),
          ...(lowercase ? lowerCaseLetters : []),
          ...(numbers ? numberArray : []),
          ...(symbols ? symbolsArray : []),
        ];
        const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
        const characters = shuffleArray(availableCharacters).slice(0, length);
        console.log(characters);
        setHandleText(characters.join(""));
        console.log(handleText);
        // return characters
      } else {
        setHandleText("");
        message.warning("Minimum 6 characters required");
      }
    } else {
      setHandleText("");
      message.warning("Please select any one");
    }
  }

  return (
    <div className="flex justify-center items-center p-3 sm:pt-24">
      <div className="flex flex-col p-6 items-center bg-gradient-to-tr to-teal-900 from-blue-950  ">
        <h1 className="text-4xl font-bold text-white p-8">
          Password Generator
        </h1>
        <div className="flex">
          <input
            className="sm:h-9 sm:w-52 bg-white"
            type="text"
            value={handleText}
            placeholder=""
            disabled
            onChange={(e) => {
              setHandleText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                message.success("Successfully Copied");
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
            className="bg-amber-600 text-white font-medium sm:h-9 px-1 sm:px-2"
          >
            {copied ? "copied" : "Copy Text"}
          </button>
        </div>
        <div className="text-white font-semibold text-xl">
          <div className="pt-6 w-full space-x-4 flex justify-between">
            <label>Number of Characters</label>
            <input
              type="number"
              min={1}
              max={50}
              value={password.length}
              id="charAmNumber"
              className="text-black text-center"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className=" pt-6 w-full flex justify-between">
            <label>Include UpperCase Letter</label>
            <CheckBox
              value={password.uppercase}
              onChange={handelChangeUppercase}
            />
          </div>
          <div className="pt-6 w-full flex justify-between">
            <label>Include LowerCase Letter</label>
            <CheckBox
              value={password.lowercase}
              onChange={handelChangeLowercase}
            />
          </div>
          <div className="pt-6 w-full flex justify-between">
            <label>Include Numbers</label>
            <CheckBox value={password.numbers} onChange={handelChangeNumbers} />
          </div>
          <div className="pt-6 w-full flex justify-between">
            <label>Include Symbols</label>
            <CheckBox value={password.symbols} onChange={handelChangeSymbols} />
          </div>
        </div>
        <div className="pt-6 ">
          <button
            className=" bg-amber-600 px-6 text-white font-medium py-1 rounded-md"
            onClick={generatePassword}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordG;
