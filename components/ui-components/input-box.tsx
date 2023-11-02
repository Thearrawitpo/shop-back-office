import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setState?: (state: any) => void;
}

const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, setState, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-2 w-full justify-end ' ref={ref}>
        <label className='text-xs font-light'>{label}</label>
        <Input
          className={cn(`h-12`, className)}
          onChange={!!setState ? (e) => setState(e.target.value) : () => {}}
          {...props}
        />
      </div>
    );
  }
);
InputBox.displayName = "InputBox";
export default InputBox;
