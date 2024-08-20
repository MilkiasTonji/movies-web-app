`use client`;

import Input from "@/components/Input";
import Login from "@/components/Login";


export default function Home() {

  const onChange = (value: string) => {
    console.log(value)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
        <Login />
        {/* <div className="flex flex-col items-center justify-center h-44 w-full bg-primary gap-10">
            <Input name="First Name" value="First Name" type="text" onchange={onChange} />
        </div> */}
    </main>
  );
}
