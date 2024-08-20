'use client';

import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/movies");
    };

    return (
        <div className='w-box flex flex-col items-center gap-5'>
            <form className='w-full flex flex-col items-center p-2 gap-5' onSubmit={handleSubmit}>
                <h1 className='text-h1 text-white my-4'>Sign in</h1>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='johndoe@gmail.com'
                    className="bg-inputColor w-full rounded-md border-none outline-none text-white text-regular p-2.5" 
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='password'
                    className="bg-inputColor w-full rounded-md border-none outline-none text-white text-regular p-2.5" 
                />
                <div className='flex items-center gap-3'>
                    <input 
                        type="checkbox" 
                        name="rememberme" 
                        id="rememberme" 
                        className='accent-inputColor text-inputColor bg-inputColor focus:accent-inputColor' 
                    />
                    <label htmlFor="rememberme" className='text-white'>Remember me</label>
                </div>

                <button 
                    type="submit" 
                    className='bg-primary w-full text-white rounded-md border-none outline-none p-3 text-h6'
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
