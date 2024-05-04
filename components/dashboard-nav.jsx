"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Cookie from 'js-cookie'
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "@/store/GlobalState";

export function DashboardNav({ items, setOpen }) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state

  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: '/api/auth/refreshToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    router.push('/')
  }
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>

            </Link>

          )
        );
      })}
      <span onClick={handleLogoutClick} className={cn(
        "group flex cursor-pointer items-center rounded-md px-3 py-2 dark:bg-red-500 gap-2 text-sm font-medium hover:bg-red-500  hover:text-white bg-red-200 transparent  ",
      )}>
       <LogOut /> Logout
      </span>
    </nav >
  );
}
