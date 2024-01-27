import React, { useState } from 'react'

export const SwithTeme = () => {
    const [theme, setTheme] = useState('light')
    
    const toggle = () =>{
      if (!localStorage.getItem('theme') ) {
        localStorage.setItem('theme', 'light')
      }
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme === "light") {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
        document.getElementById('theme').classList.remove('light')
        document.getElementById('theme').classList.add('dark')
      }
      if (storedTheme === "dark") {
        setTheme('light')
        localStorage.setItem('theme', 'light')
        document.getElementById('theme').classList.remove('dark')
        document.getElementById('theme').classList.add('light')
      }
    } 
    toggle
  return (
    <div className='relative flex  z-10'>
    <div className="absolute bottom-[10px] z-50 left-2 transition duration-1000 flex gap-1 p-1 rounded-xl  ">
    <button onClick={toggle} className={`rounded-xl bg-slate-900 px-6 py-1 transition duration-1000 font-bold dark:bg-slate-200 text-white dark:text-slate-800`}>
      {
        theme === 'dark' ? "light" : "dark"
      }
    </button>
    {/* <button onClick={toggle} className={`rounded-xl text-slate-200 px-6 py-1 transition duration-1000 font-bold dark:bg-slate-800`}>dark </button> */}
      </div>
    </div>
  )
}
