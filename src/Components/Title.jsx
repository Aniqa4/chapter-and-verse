import React from 'react'

function Title({title}) {
  return (
    <div className=' md:my-10 my-5 text-center md:text-2xl font-semibold text-slate-700 uppercase'>
        {title}
    </div>
  )
}

export default Title