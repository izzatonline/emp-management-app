"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  CreateEmployeeParams,
  EmailEmployeeParams,
  IdEmployeeParams,
} from "./shared.types";

const prisma = new PrismaClient();

export async function getAllUsers() {
  try {
    const employees = await prisma.employee.findMany({});

    return { employees };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createEmployee(params: CreateEmployeeParams) {
  try {
    const { email, first_name, last_name, avatar, role, salary, path } = params;

    await prisma.employee.create({
      data: {
        email,
        first_name,
        last_name,
        avatar,
        role,
        salary,
      },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteEmployee(params: IdEmployeeParams) {
  try {
    const { id, path } = params;

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
