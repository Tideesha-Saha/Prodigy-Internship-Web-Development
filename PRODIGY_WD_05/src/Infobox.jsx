import React from 'react'

function Infobox({icon, info, data}) {
  return (

  <div className="flex-1 flex flex-col justify-between p-4 bg-transparent rounded-sm text-white shadow-[0_0_20px_4px_rgba(0,0,0,0.25)] backdrop-blur-xs">
      <div className=" items-baseline gap-3">
        {icon}
        <h2 className='text-2xl font-bold mb-10'>{info}</h2>
        </div>
        <p className='text-lg'>{data}</p>
    </div>
    
  )
}

export default Infobox