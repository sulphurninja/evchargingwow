import ThemeToggle from "../components/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";

export default function HeaderVendor() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className=" -white dark:bg-transparent rounded-md p-2 flex gap-4">
          <Link href='/vendor/dashboard'>
            <img src="/logo.png" className="h-8" />
          </Link>
          <h1 className='font-bold mt-2 text-md text-center text-black dark:text-white  '> Vendor Dashboard</h1>
        </div>


        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
