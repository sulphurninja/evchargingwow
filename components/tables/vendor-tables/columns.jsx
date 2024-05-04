"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vendorCode",
    header: "Code",
  },
  {
    accessorKey: "vendorName",
    header: "Vendor Name",
  },
  {
    accessorKey: "vendorEmail",
    header: "Vendor email",
  },
  {
    accessorKey: "vendorAddress",
    header: "Address",
  },
  {
    accessorKey: "contactPersonName",
    header: "Contact Person Name",
  },
  {
    accessorKey: "contactPersonMobNo",
    header: "Contact Person Mob No",
  },
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
