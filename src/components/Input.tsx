import { TextInputType } from "@/types"

`use client`

const Input = ({name, value, type, onchange}: TextInputType) => {
  return (
    <div>
        <input type={type} name={name} placeholder={value} onChange={onchange}
            className="bg-inputColor rounded-md border-none outline-none text-white text-regular p-3" 
        />
    </div>
  )
}

export default Input 