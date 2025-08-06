"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YouTubeLinkCategory } from "@/lib/types";
import { BooksUpload } from "@/components/admin/books-upload";
import { DailyWordUpload } from "@/components/admin/daily-word-upload";
import { BibleStudyUpload } from "@/components/admin/bible-study-upload";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.string().url("Please enter a valid YouTube URL"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      
      console.log('Submitting form data:', data);
      
      const response = await fetch('/api/add-sermon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: data.url,
          title: data.title,
          category: data.category,
          addedBy: 'admin',
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to add sermon');
      }

      const result = await response.json();
      console.log('Success result:', result);
      toast.success("Sermon video added successfully");
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to add sermon video");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="max-w-2xl bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add Sermon Video</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="sermons" className="max-w-4xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sermons">Sermon Videos</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="daily-word">Ijambo ry'Umunsi</TabsTrigger>
          <TabsTrigger value="bible-study">Twige Bibiliya</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sermons">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add Sermon Video</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">YouTube URL</label>
                <Input
                  {...register("url")}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={errors.url ? "border-red-500" : ""}
                />
                {errors.url && (
                  <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  {...register("title")}
                  placeholder="Enter video title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  key={watch("category")}
                  value={watch("category")}
                  onValueChange={(value) => setValue("category", value, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Faith">Faith</SelectItem>
                    <SelectItem value="Grace">Grace</SelectItem>
                    <SelectItem value="Love">Love</SelectItem>
                    <SelectItem value="Hope">Hope</SelectItem>
                    <SelectItem value="Salvation">Salvation</SelectItem>
                    <SelectItem value="Prayer">Prayer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Adding..." : "Add Sermon Video"}
              </Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="books">
          <div className="bg-white rounded-lg shadow p-6">
            <BooksUpload />
          </div>
        </TabsContent>
        
        <TabsContent value="daily-word">
          <div className="bg-white rounded-lg shadow p-6">
            <DailyWordUpload />
          </div>
        </TabsContent>
        
        <TabsContent value="bible-study">
          <div className="bg-white rounded-lg shadow p-6">
            <BibleStudyUpload />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
