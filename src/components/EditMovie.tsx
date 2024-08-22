'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
const image_url = process.env.NEXT_PUBLIC_IMAGE_URL

const EditMovie = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [publishingYear, setPublishingYear] = useState<string>("");
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");


    const { id } = useParams()

    const router = useRouter()
    const [fetchingMovie, setFetchingMovie] = useState<boolean>(true)
    const [submitting, setSubmitting] = useState<boolean>(false)

    useEffect(() => {
        const token: string = localStorage.getItem('token') || "";

        if (!token) {
            toast.error("Unauthorized!")
            router.push("/login")
        }

        getMovie(token)
    }, [])

    const getMovie = async (token: string) => {
        setFetchingMovie(true)
        try {
            const response = await fetch(`/api/movies/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const resp = await response.json();

            if (resp.success) {
                const movie = resp.movie
                setTitle(movie.title)
                setPublishingYear(movie.publishingYear)
                setThumbnailUrl(movie.thumbnailUrl)
            } else {
                toast.error(resp.message)
            }
        } catch (err: any) {
            toast.error(err)
        } finally {
            setFetchingMovie(false)
        }
    };

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
        setThumbnailUrl("")
    };

    const handleCancelForm = () => {
        router.push("/movies")
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        if (!title || !publishingYear) {
            toast.error("All fields are required, including the thumbnail.");
            return;
        }
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('publishingYear', publishingYear);
        if (!file || !previewUrl) {
            formData.append('thumbnailUrl', thumbnailUrl);
        } else {
            formData.append('thumbnailUrl', file);
        }

        try {
            const response = await fetch(`/api/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const resp = await response.json();
            if (resp.success) {
                toast.success(resp.message);
                router.push("/movies")
            } else {
                toast.error(resp.message);
            }
        } catch (err) {
            console.error("Error: ", err);
            toast.error("An error occurred while uploading the movie.");
        } finally {
            setSubmitting(false)
        }

    }

    const handleMovieFetching = () => {
        return (
            <div role="status" className='absolute top-1/2 '>
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col items-center justify-center md:p-12 p-4'>
            <ToastContainer />
            <h1 className={`text-regular md:text-h2 text-white pb-6 ${fetchingMovie ? 'absolute -top-40' : ''}`}>Edit</h1>

            {fetchingMovie && handleMovieFetching()}

            {
                !fetchingMovie &&
                <>
                    <div className='flex md:gap-16 gap-8 p-5 flex-col-reverse md:flex-row'>
                        <div
                            className="flex bg-inputColor flex-col items-center justify-center w-full md:w-60 h-64 p-4 border-[1px] border-dashed border-white rounded-md cursor-pointer hover:bg-inputColor"
                            onDrop={handleDrop}
                            onDragOver={(event) => event.preventDefault()}
                        >
                            {previewUrl || thumbnailUrl ? (
                                <>
                                    <img src={previewUrl || `${image_url}${thumbnailUrl}`} alt="Preview" className="max-h-48 mb-2" />
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
                                className="text-primary underline cursor-pointer"
                            >
                                {file ? file.name : 'Choose a file'}
                            </label>
                        </div>

                        <div className='md:w-72 w-full flex flex-col items-center gap-6'>
                            <div className='w-full flex flex-col gap-8'>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    placeholder='Title'
                                    className="bg-inputColor w-full rounded-md border-none outline-none text-white text-regular p-2.5"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setTitle(event.target.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    name="year"
                                    id="publishingYear"
                                    value={publishingYear}
                                    placeholder='Publishing year'
                                    className="bg-inputColor md:w-2/3 rounded-md border-none outline-none text-white text-regular p-2.5"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPublishingYear(event.target.value)
                                    }}
                                />
                            </div>
                            <div className='hidden w-full md:flex items-center gap-4 p-2'>
                                <button
                                    type="button"
                                    className='bg-background w-full text-white rounded-md border-[1px] border-white p-3 text-h6'
                                    onClick={handleCancelForm}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className={`bg-primary w-full text-white rounded-md border-none outline-none p-3 flex items-center justify-center relative`}
                                    onClick={handleSubmit}
                                >
                                    <span className='text-h6'>
                                        Update
                                    </span>
                                    {submitting && (
                                        <div role="status" className='absolute right-1 '>
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex items-center md:gap-16 gap-8 p-5 md:hidden'>
                        <button
                            type="button"
                            className='bg-background w-full text-white rounded-md border-[1px] border-white p-3 text-h6'
                            onClick={handleCancelForm}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={`bg-primary w-full text-white rounded-md border-none outline-none p-3 flex items-center justify-center relative`}
                            onClick={handleSubmit}
                        >
                            <span className='text-h6'>
                                Update
                            </span>
                            {submitting && (
                                <div role="status" className='absolute right-1 '>
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default EditMovie