import React, { useState } from "react";
import './PasswordG.css'
import CheckBox from "../Components/CheckBox";

function PasswordG() {
    const [password,setPassword] = useState({
        length : 10,
        uppercase : false,
        lowercase : false,
        numbers : false,
        symbols : false
    })
    const [handleText,setHandleText]= useState("")
    const [copied,setCopied] = useState(false)

    const handelChangeLowercase = ()=>{
        setPassword({
            ...password,
            lowercase:!password.lowercase
        })
    }
    const handelChangeUppercase = ()=>{
        setPassword({

            ...password,
            uppercase:!password.uppercase
        })
    }
    const handelChangeNumbers = ()=>{
        setPassword({
            ...password,
            numbers:!password.numbers
        })
    }
    const handelChangeSymbols = ()=>{
        setPassword({
            ...password,
            symbols:!password.symbols
        })
    }

    const setPasswordLength = (value)=>{
        setPassword({
            ...password,
            length:value
        })
    }

    function generatePassword() {
        console.log('hello');
        console.log(password);
        const numberArray = [0,1,2,3,4,5,6,7,8,9]
        const symbolsArray = ["!","@","#","$","%","^","&","*","(",")"]

        // const charactersCodes = Array.from(Array(26).map((_,i)=>i+97))
        // const lowerCaseLetters = charactersCodes.map(letter => String.fromCharCode(letter))

        // const upperCaseLetters = lowerCaseLetters.map(letter=>letter.toUpperCase())
        const lowerCaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97));
        const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());


        const {length,uppercase,lowercase,numbers,symbols} = password

            console.log(length,uppercase,lowercase,numbers,symbols,'jjjjjjjjjjjjjjjjjjjjjjj');
            const availableCharacters = [
                ...(uppercase ? upperCaseLetters : []),
                ...(lowercase ? lowerCaseLetters : []),
                ...(numbers ? numberArray : []),
                ...(symbols ? symbolsArray : [])
            ]
            const shuffleArray = (array)=>array.sort(()=>Math.random() - 0.5)
            const characters = shuffleArray(availableCharacters).slice(0,length)
            console.log(characters);
            setHandleText(characters.join(''))
            console.log(handleText);
            // return characters  
        
    }

  return (
    <div className="flex justify-center">
    <div className="flex flex-col p-6 items-center bg-cyan-400 w-1/2">
      <h1 className="text-3xl font-bold underline p-4">Password Generator</h1>
      <div>
        <input type="text" value={handleText} placeholder="" onChange={(e)=>{setHandleText(e.target.value)}} />
        <button onClick={()=>{
            if(handleText.length>0){
                navigator.clipboard.writeText(handleText)
                setCopied(true)
                setInterval(()=>{
                    setCopied(false)
                },2000)
            }
        }}>{copied ? 'copied' : 'copy Text'}</button>
      </div>
      <div className="pt-6">
        <label>Number of Characters</label>
        <input type="number" min={1} max={50} value={password.length} id="charAmNumber" onChange={(e)=>setPasswordLength(e.target.value)} />
      </div>
      <div className=" pt-6">
        <label>Include UpperCase Letter</label>
        <CheckBox value={password.uppercase} onChange={handelChangeUppercase} />
      </div>
      <div className="pt-6">
        <label>Include LowerCase Letter</label>
        <CheckBox value={password.lowercase} onChange={handelChangeLowercase} />
      </div>
      <div className="pt-6">
        <label>Include Numbers</label>
        <CheckBox value={password.numbers} onChange={handelChangeNumbers} />
      </div>
      <div className="pt-6">
        <label>Include Symbols</label>
        <CheckBox value={password.symbols} onChange={handelChangeSymbols} />
      </div>
      <div className="pt-6 ">
        <button className="rounded-none bg-red-400" onClick={generatePassword}>Generate Password</button>
      </div>
    </div>
    </div>
  );
}

export default PasswordG;
