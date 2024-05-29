"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { OtpStyledInput } from "@/components/extension/otp-input";
import { useRouter } from "next/router";

const OtpTest = ({ vendorCode }) => {
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const router = useRouter();
 

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: data.otp, vendorCode }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Success, Your OTP code is: ${data.otp}`);
        router.push(`/booking/${result.bookingId}`); // Redirect to the dynamic booking page
      } else {
        toast.error(result.error || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Error submitting OTP:', error);
      toast.error('An error occurred while verifying OTP');
    }
  };

  return (
    <div className="max-w-xs h-fit flex items-center justify-center outline outline-1 outline-muted rounded-md p-4 bg-background">
      <div className="w-full space-y-2">
        <div className="space-y-1">
          <h2 className="font-semibold">OTP verification</h2>
          <p className="text-xs">
            Enter the 5-digit code provided to the customer to verify the booking
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormControl>
                  <>
                    <FormItem>
                      <OtpStyledInput
                        numInputs={5}
                        inputType="number"
                        {...field}
                      />
                    </FormItem>
                    <FormMessage />
                  </>
                </FormControl>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OtpTest;
