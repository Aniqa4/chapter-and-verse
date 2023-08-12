import React from 'react'

function Title({title}) {
  return (
    <div className=' md:my-10 my-5 text-center text-xs md:text-base font-semibold text-slate-700 uppercase'>
        {title}
    </div>
  )
}

export default Title