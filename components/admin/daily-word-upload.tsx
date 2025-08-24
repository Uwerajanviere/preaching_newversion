"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const dailyWordSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

type DailyWordFormData = z.infer<typeof dailyWordSchema>;

export function DailyWordUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DailyWordFormData>({
    resolver: zodResolver(dailyWordSchema),
  });

  const onSubmit = async (data: DailyWordFormData) => {
    try {
      setIsLoading(true);
      
      console.log('Submitting daily word data:', data);
      console.log('Current window location:', window.location.href);
      
      const apiUrl = '/api/daily-word';
      console.log('Making POST request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Failed to upload daily word: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Daily word uploaded successfully:', result);
      
      toast.success("Ijambo ry'Umunsi uploaded successfully!");
      reset();
      
    } catch (error) {
      console.error('Error uploading daily word:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload daily word. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Upload Ijambo ry'Umunsi</CardTitle>
        <CardDescription>
          Add a new daily word message
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter daily word title"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Enter the daily word content here..."
              rows={8}
              {...register("content")}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
            <p className="text-xs text-gray-500">
              This content will be displayed on the hero page as the latest daily word.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Uploading..." : "Upload Ijambo ry'Umunsi"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
