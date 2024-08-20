'use client';

import { ImageType, MovieType } from '@/types';
import Image from 'next/image'


const MovieCard = ({thumbnail, title, year}: MovieType) => {
  return (
    <div className="flex w-[23.5%] flex-col items-start text-white bg-cardColor px-[8px] pt-[8px] pb-[16px]">
        <Image
         src={thumbnail}
         alt={"Movie thumbinail"}
         width="266"
         height="400"
         className='rounded-md w-full h-[400px]'
        />
        <p className='text-large'>{title}</p>
        <p className='text-small'>{year}</p>
    </div>
  )
}

export default MovieCard