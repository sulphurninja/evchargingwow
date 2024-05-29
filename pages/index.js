import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { DataContext } from '@/store/GlobalState';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import Cookie from 'js-cookie';
import { Input } from '@/components/ui/input';
import { postData } from '@/utils/fetchData';



export default function Login() {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState(false);
  const { email, password } = userData;
  const { state = {}, dispatch } = useContext(DataContext);
  const { auth = {} } = state;
  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


  const handleSubmit = async e => {
    e.preventDefault()

    const res = await postData('auth/login', userData)

    if (res.error) {
      window.location.reload();
      return;
    }

    dispatch({
      type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '/api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
    // check if user has admin privileges
    if (res.user ) {
      router.push("/dashboard"); // Redirect to admin page
      toast("🙏 Welcome Admin!");
    } else {
      toast("❌ Something went wrong, please check your username and password!");
    }
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 hidden font-bold top-4 md:right-8 md:top-8",
        )}
      >
        QuickSwap - Admin
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
        <img src='/logo.png' className='h-10' />

          {/* QuickSwap - Admin */}
          <Toaster />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {/* <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p> */}
            <footer className="text-sm">Admin Dashboard</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back Admin!
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to proceed
            </p>  
          </div>
          {/* <UserAuthForm /> */}
          <form onSubmit={handleSubmit} className="bg-[#18181B] rounded-xl p-6  space-y-4">
            <div>
              <h1 className='text-center text-2xl text-white font-bold'>Login</h1>
              <p className='text-md text-center text-white'>Welcome Back!</p>
            </div>

            <div className="flex flex-col text-white">
              <label className="">Email</label>
              <Input type="email" id="email"
                name="email"
                value={email}
                onChange={handleChangeInput}
                className="border rounded-md px-4 p-1 text-white  " />

            </div>
            <div className="flex flex-col text-white">
              <label className="">Password</label>
              <Input type="password" id="password"
                name="password"
                value={password}
                onChange={handleChangeInput}
                placeholder='******' className="border rounded-md p-1 px-4 text-white " />
            </div>

            <div className='flex justify-center '>
              <button type="submit" className="bg-white/90 2  mt-2 rounded-md text-black p-2 w-full">Submit</button>
            </div>
        
          </form>


          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
