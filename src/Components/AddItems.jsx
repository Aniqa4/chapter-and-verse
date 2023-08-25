import React from 'react';
import { Link } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg';

function AddItems({text,route}) {
    return (
        <div className='relative text-green-500 pt-5'>
            <p className=' absolute bottom-2 right-5'><Link to={route}
                className='flex items-center shadow px-2 py-1 border'>{text}&nbsp;<CgAdd /></Link></p>
        </div>
    )
}

export default AddItems