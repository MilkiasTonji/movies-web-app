'use client';

import { MovieType } from '@/types';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';

const image_url = process.env.NEXT_PUBLIC_IMAGE_URL

const MovieCard = ({thumbnailUrl, title, publishingYear, _id}: MovieType) => {

    const router = useRouter()

    const handleEdit = () => {
        router.push(`movies/${_id}`)
    }

  return (
    <div className="flex w-full md:w-80 flex-col items-start text-white bg-cardColor px-[8px] pt-[8px] pb-[16px] transition ease-in-out delay-100 hover:-translate-y-2 hover:scale-110 duration-500 ">
        <Image
         src={`${image_url}${thumbnailUrl}`}
         alt={"Movie thumbinail"}
         width="266"
         height="400"
         className='rounded-md w-full md:h-[300px] h-[200px]'
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