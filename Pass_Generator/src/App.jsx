import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, SetLength] = useState(8);
  const [numAllowed, SetNumAllowed] = useState(false);
  const [charAllowed, SetCharAllowed] = useState(false);
  const [password, SetPassword] = useState("");

  const generatePassWord = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if(numAllowed) str += "1234567890";
    if(charAllowed) str += "!@#$%^&*-_+={}[].~`";

    for(let i=1;i<=length;i++){
      let charIndex = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(charIndex);
    }
    SetPassword(pass);

  }, [length, numAllowed, charAllowed, SetPassword])


  const passwordRef = useRef(null);
  const copyPasswordToClipBoard = useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(password);
  }, [password])


  useEffect(()=>{
    generatePassWord();
  }, [length, numAllowed, charAllowed, generatePassWord])


  return (
    <>
      <div className='w-full max-w-lg h-48 mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-green-600'>
        <h1 className='text-black text-center my-3 font-bold'>Password Generator</h1>
         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input className='outline-none w-full py-1 px-3 text-black font-semibold'  type='text' value={password} placeholder='password' readOnly ref={passwordRef}></input>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ' onClick={copyPasswordToClipBoard}>Copy</button>
         </div>

         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input className='cursor-pointer' type='range' min={6} max={100} value={length} onChange={(e)=>{SetLength(e.target.value)}}/>
              <label className='text-black-400 font-semibold'>Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
              <input className='cursor-pointer' type='checkBox' defaultChecked={numAllowed} id="numberInput" onChange={()=>{
                 SetNumAllowed((prev) => !prev)
              }}/>
              <label className='text-black-400 font-semibold'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
              <input className='cursor-pointer' type='checkBox' defaultChecked={charAllowed} id="charInput" onChange={()=>{
                 SetCharAllowed((prev) => !prev)
              }}/>
              <label className='text-black-400 font-semibold'>Characters</label>
          </div>
         </div>
      </div>
    </>
  )
}

export default App
