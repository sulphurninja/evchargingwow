"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";



export const VendorClient = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Vendors (${data.length})`}
          description="Manage vendors (Update and delete vendor functionalities)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/vendors/register`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Register
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
