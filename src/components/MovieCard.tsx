'use client';

import { MovieType } from '@/types';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';


const MovieCard = ({thumbnailUrl, title, publishingYear, id}: MovieType) => {

    const router = useRouter()

    const handleEdit = () => {
        router.push(`movies/${id}`)
    }

  return (
    <div className="flex w-[23.5%] flex-col items-start text-white bg-cardColor px-[8px] pt-[8px] pb-[16px]">
        <Image
         src={`http://localhost:5000${thumbnailUrl}`}
         alt={"Movie thumbinail"}
         width="266"
         height="400"
         className='rounded-md w-full h-[400px]'
        />
        <div className='w-full flex items-center justify-between'>
            <div>
            <p className='text-large'>{title}</p>
            <p className='text-small'>{publishingYear}</p>
            </div>
            <div className='hover:cursor-pointer' onClick={handleEdit}>
                <FaEdit />
            </div>
        </div>
    </div>
  )
}

export default MovieCard