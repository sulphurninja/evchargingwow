"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";



export const BatteryClient = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Batteries (${data.length})`}
          description="Manage Batteries (Update and delete battery details)"
        />
        <div className="gap-4  md:flex">
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/batteries/qrCodes`)}
        >
          <QrCode className="mr-2 h-4 w-4" /> QR Codes
        </Button>
        <Button
          className="text-xs mt-4 md:mt-0 md:flex md:text-sm"
          onClick={() => router.push(`/dashboard/batteries/register`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Register
        </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="serialNo" columns={columns} data={data} />
    </>
  );
};
