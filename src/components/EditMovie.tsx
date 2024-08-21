'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
const EditMovie = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [publishingYear, setPublishingYear] = useState<string | null>(null);
    const router = useRouter()


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };



    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleCancel = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    const handleCancelForm = () => {
        router.push("/movies")
    }

    const handleSubmit = () => {
        if (!title || !publishingYear){
            return;
        }
        const data = {
            title,
            year: publishingYear,
        }

        console.log("data submitting========== ", data)
    }

    return (
        <div className='w-full flex flex-col items-center justify-center p-12'>
            <h1 className='text-h2 text-white pb-6'>Edit</h1>
            <div className='flex gap-16 p-5'>
                <div
                    className="flex bg-inputColor flex-col items-center justify-center w-60 h-64 p-4 border-[1px] border-dashed border-white rounded-md cursor-pointer hover:bg-inputColor"
                    onDrop={handleDrop}
                    onDragOver={(event) => event.preventDefault()}
                >
                    {previewUrl ? (
                        <>
                            <img src={previewUrl} alt="Preview" className="max-h-48 mb-2" />
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="text-red-500 underline cursor-pointer"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className="text-blue-500 underline cursor-pointer"
                    >
                        {file ? file.name : 'Choose a file'}
                    </label>
                </div>

                <div className='w-60 flex flex-col items-center gap-6'>
                    <div className='w-full flex flex-col gap-8'>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Title'
                            className="bg-inputColor w-full rounded-md border-none outline-none text-white text-regular p-2.5"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                                setTitle(event.target.value)
                            }}
                        />
                        <input
                            type="text"
                            name="year"
                            id="publishingYear"
                            placeholder='Publishing year'
                            className="bg-inputColor w-2/3 rounded-md border-none outline-none text-white text-regular p-2.5"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                                setPublishingYear(event.target.value)
                            }}
                        />
                    </div>
                    <div className='w-full flex items-center gap-5'>
                        <button
                            type="button"
                            className='bg-background w-full text-white rounded-md border-[1px] border-white p-3 text-h6'
                            onClick={handleCancelForm}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className='bg-primary w-full text-white rounded-md border-none outline-none p-3 text-h6'
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditMovie