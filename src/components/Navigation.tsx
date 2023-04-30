import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import GithubMark from "../../public/images/github-mark-white.svg";
import { HomeIcon } from "@radix-ui/react-icons";

export const Navigation = () => {
    return (
        <nav className="box-content min-h-[60px] w-full bg-slate-800 dark:border-b dark:border-slate-800 dark:bg-black">
            <div className="container m-auto flex h-full items-center gap-4 px-4">
                <NavItem href="/">
                    <HomeIcon width={25} height={25} />
                </NavItem>
                <div className="ml-auto">
                    <NavItem href="https://github.com/beselig/string-theory" target="_blank">
                        <Image
                            src={GithubMark}
                            alt="Github"
                            width={32}
                            height={32}
                            className="fill-black"
                        />
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
            className="text-lg font-bold uppercase text-slate-300 transition-colors hover:text-slate-50"
        />
    );
};
