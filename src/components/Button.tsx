import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, onClick, className, disabled }, ref) => {
        return (
            <button
                disabled={disabled}
                ref={ref}
                className={twMerge(
                    "flex h-[35px] items-center justify-center gap-2 rounded-[4px] bg-slate-100 px-[15px] font-medium leading-none text-black outline-none transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400",
                    className
                )}
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
