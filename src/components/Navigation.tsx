import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import GithubMark from "../../public/images/github-mark-white.svg";

export const Navigation = () => {
    return (
        <nav className="w-full h-14 bg-teal-950 bg-opacity-30 border-b border-teal-950">
            <div className="container m-auto flex items-center gap-4 h-full">
                <NavItem href="/">Home</NavItem>
                <div className="ml-auto">
                    <NavItem href="https://github.com/beselig/string-theory" target="_blank">
                        <Image src={GithubMark} alt="Github" width={32} height={32} />
                    </NavItem>
                </div>
            </div>
        </nav>
    );
};

const NavItem = (props: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps>) => {
    return (
        <Link
            {...props}
            className=" transition-colors text-teal-300 hover:text-teal-100 hover:underline"
        />
    );
};
