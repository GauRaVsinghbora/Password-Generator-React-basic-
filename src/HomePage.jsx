import { useState, useCallback, useEffect, useRef } from 'react'
import style from  './HomePage.module.css'

function Page1() {
  const [length , setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const selectPass = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed){
      str += "1234567890";
    } 
    if (charAllowed){
      str += "!@#$%^&*()~`<>,.:;'";
    }

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length) + 1;
      pass += str.charAt(char);
    }
    
    setPassword(pass);

  }, [length,numberAllowed,charAllowed]);

  const copyPassword = useCallback(()=>{
    selectPass.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed]);

  return (
    <>
      <div className={style.container}>
        <span style={{color:'white'}}>password generator</span>
        <div className={style.displayPass}>
            <input type='text' placeholder='Password' value={password} ref={selectPass} readOnly className={style.password}></input>
            <button className={style.copy} onClick={copyPassword}>copy</button>
        </div>
        <div className={style.filter}>
          <div>
            <input 
            type='range'
            min={6}
            max={100}
            value={length}
            onChange={(e)=>{
              setLength(e.target.value) 
            }}
            >
            </input>
            <label  className={style.range}>Length: {length}</label>
          </div>
          
          <div className={style.numberbox}>
            <input 
            type='checkbox'
            defaultChecked = {numberAllowed} 
            id='numbercheck'
            onChange={()=>{
              setNumberAllowed((prev)=> !prev);
            }} 
            />
            <label  htmlFor='numbercheck' className={style.number}>number</label>
          </div>
          
          <div className={style.charbox}>
            <input 
            type='checkbox'
            defaultChecked = {charAllowed} 
            id='charcheck'
            onChange={()=>{
              setCharAllowed((prev)=> !prev);
            }} 
            />
            <label  htmlFor='charcheck' className={style.number}>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page1
