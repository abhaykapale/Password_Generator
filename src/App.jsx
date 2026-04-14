import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);

  const [numberAllowed,setnumberAllowed] = useState(false);
  
  const [charAllowed,setcharAllowed] = useState(false);

  const [password,setpassword]=useState("");

  const copyref= useRef(null);
  
  const passwordGen = useCallback( ()=>{

    let pass= "";
    let str="ASHKSDSHJGDsehglfkhggh";

    if (numberAllowed) str+= "012332" ;
    if (charAllowed) str+= "!@#%$" ;

    for (let i = 1; i <= length; i++) {
      let char= Math.floor(Math.random() * str.length + 1)  
      pass += str.charAt(char);
    }
      setpassword(pass)

  } , [length,charAllowed,numberAllowed,setpassword])
  

  useEffect(()=>{
    passwordGen()
  }, [length,charAllowed,numberAllowed,setpassword])
  
    const[copied,Setcopied]= useState(false)

    const CopyToClipboard = ()=>
    {
      

      Setcopied(true)
      navigator.clipboard.writeText(copyref.current.value)

      setTimeout(() => Setcopied(false), 1500)
    }

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-6">

  <h1 className="text-4xl font-semibold text-white">
    Password Generator
  </h1>


      <div className="grid grid-cols-8 gap-2 w-full max-w-sm">
  
  <input
    id="text"
    type="text"
          readOnly
          value={password}
          ref={copyref}
          className="col-span-6 bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-amber-100 focus:border-amber-400 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
  />

  <button
    type="button"
    onClick={CopyToClipboard}
    className="col-span-2 flex items-center justify-center 
  bg-gray-800 border border-transparent text-gray-200 
  hover:bg-gray-700 
  hover:scale-105 active:scale-95 
  transition-transform duration-200 
  text-sm font-medium rounded-lg px-3 py-2.5"
  >
    <span
    className={`transition-all duration-200 ${
      copied ? "opacity-0 scale-90" : "opacity-100 scale-100"
    }`}
  >
    Copy
  </span>

  <span
    className={`absolute transition-all duration-200 ${
      copied ? "opacity-100 scale-100" : "opacity-0 scale-90"
    }`}
  >
    Copied
  </span>
  </button>

</div>

    

      <div className="w-full max-w-md bg-gray-800 p-4 rounded-xl shadow-md flex flex-col gap-3">
        
        <div className="flex justify-between text-sm text-gray-300">
          <span>Password Length</span>
          <span>{length}</span>
        </div>

        <input
          type="range"
          min={6}
          max={100}
          onChange={(e) => setLength(e.target.value)}
          className="w-full accent-zinc-400 cursor-pointer"
        />

        <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
          <input type="checkbox"
           onClick={()=>{setnumberAllowed (prev => !prev)} }
           className="accent-zinc-400 cursor-pointer" />
          Numbers
        </label>

        <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
          <input type="checkbox" 
           onClick={()=>{setcharAllowed (prev => !prev)} }
          className="accent-zinc-400 cursor-pointer" />
          Special Characters
        </label>

      </div>

</div>

    </>
  )
}

export default App
