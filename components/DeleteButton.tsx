"use client";

import { Button } from "@/components/ui/button";
import { deleteEmployee } from "@/lib/actions/employee.action";
import { IdEmployeeSchema } from "@/lib/validations";
import { usePathname } from "next/navigation";
import React from "react";
import { z } from "zod";

interface Props {
  id: number;
  path: string;
}

const DeleteButton = ({ id, path }: Props) => {
  const pathname = usePathname();
  async function deleteEmployeeHandler(
    values: z.infer<typeof IdEmployeeSchema>
  ) {
    try {
      await deleteEmployee({
        id: values.id,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <Button
      className="bg-red-600 hover:bg-red-400"
      type="submit"
      onClick={() => deleteEmployeeHandler({ id, path })}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
