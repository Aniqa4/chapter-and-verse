import React from 'react'
import Title from '../Components/Title';
import gallery from '../assets/Gallery/gallery.jpg'
import gallery3 from '../assets/Gallery/gallery3.jpg'
import gallery4 from '../assets/Gallery/gallery4.jpg'
import gallery5 from '../assets/Gallery/gallery5.jpg'
import gallery6 from '../assets/Gallery/gallery6.jpg'
import gallery7 from '../assets/Gallery/gallery7.jpg'
import gallery8 from '../assets/Gallery/gallery8.jpg'
import gallery9 from '../assets/Gallery/gallery9.jpg'
import gallery10 from '../assets/Gallery/gallery10.jpg'


function Gallery() {
  return (
    <div className=' container mx-auto'>
        <Title title={`Bookworm's Haven: A Visual Journey Through Our Library`}></Title>
        <div className=' grid grid-cols-3 gap-2 md:gap-5 px-2 md:px-5'>
            <img src={gallery} className=' rounded'/>
            <img src={gallery3} className=' rounded'/>
            <img src={gallery4} className=' rounded'/>
            <img src={gallery5} className=' rounded'/>
            <img src={gallery6} className=' rounded'/>
            <img src={gallery7} className=' rounded'/>
            <img src={gallery8} className=' rounded'/>
            <img src={gallery9} className=' rounded'/>
            <img src={gallery10} className=' rounded'/>
        </div>
    </div>
  )
}

export default Gallery