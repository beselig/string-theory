import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<HTMLAttributes<HTMLButtonElement>>>(
    ({ children, onClick }, ref) => {
        return (
            <button
                ref={ref}
                className="flex h-[35px] items-center justify-center gap-2 rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] shadow-black hover:bg-teal-100 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
                role="button"
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
