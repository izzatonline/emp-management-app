"use client";

import { EmployeeSchema } from "@/lib/validations";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createEmployee } from "@/lib/actions/employee.action";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Page = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      avatar: "",
      role: "",
      salary: 1000,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EmployeeSchema>) {
    setIsSubmitting(true);

    try {
      let avatarUrl = values.avatar;
      // make an async call to your API -> create a question
      // contain all form data
      if (selectedFile) {
        // Replace this with your file upload logic (e.g., Supabase Storage upload)
        avatarUrl = await uploadFileToStorage(selectedFile);
      }
      const employee = await createEmployee({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        avatar: avatarUrl,
        role: values.role,
        salary: values.salary,
        path: pathname,
      });
      // navigate to home page
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="mt-12 scroll-m-20 text-2xl font-semibold tracking-tight">
        Add Employee Details
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="mt-8">
                  Email <span className="">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular min-h-[42px] border"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="">
                  First Name <span className="">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular min-h-[42px] border"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="">
                  Last Name <span className="">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular min-h-[42px] border"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="">
                  Avatar <span className="">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    className="no-focus paragraph-regular min-h-[42px] border"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
                {/* Optional: Image preview */}
                {avatarPreview && (
                  <Image src={avatarPreview} alt="Avatar Preview" />
                )}
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="">
                  Role <span className="">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular min-h-[42px] border"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="">
                  Salary <span className="">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    type="number"
                    className="no-focus paragraph-regular min-h-[42px] border"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <div>Submitting...</div> : <div>Submit</div>}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Page;
