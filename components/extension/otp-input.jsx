import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import OtpInput, { OTPInputProps } from "react-otp-input";


export const OtpStyledInput = ({
  className,
  ...props
}) => {
  return (
    <OtpInput
      {...props}
      renderInput={(inputProps) => (
        <Input
          {...inputProps}
          className={cn("!w-12 !appearance-none selection:bg-none ", className)}
        />
      )}
      containerStyle={`flex justify-center items-center flex-wrap  text-2xl font-bold ${
        props.renderSeparator ? "gap-1" : "gap-x-3 gap-y-2"
      }`}
    />
  );
};