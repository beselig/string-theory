import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import GithubMark from "../../public/images/github-mark-white.svg";

export const Navigation = () => {
    return (
        <nav className="h-14 w-full border-b border-teal-950 bg-teal-950 bg-opacity-30">
            <div className="container m-auto flex h-full items-center gap-4">
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
            className=" text-teal-300 transition-colors hover:text-teal-100 hover:underline"
        />
    );
};
