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

const bibleStudySchema = z.object({
  title: z.string().min(1, "Umutwe w'icyigisho ni ngombwa"),
  imageUrl: z.string().url("Shyiramo URL y'ifoto nziza"),
  content: z.string().min(10, "Content y'icyigisho igomba kuba nibura inyuguti 10"),
});

type BibleStudyFormData = z.infer<typeof bibleStudySchema>;

export function BibleStudyUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BibleStudyFormData>({
    resolver: zodResolver(bibleStudySchema),
  });

  const onSubmit = async (data: BibleStudyFormData) => {
    try {
      setIsLoading(true);
      
      console.log('Submitting bible study data:', data);
      
      const response = await fetch('/api/bible-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload bible study');
      }

      const result = await response.json();
      console.log('Bible study uploaded successfully:', result);
      
      toast.success("Icyigisho cy'Inyandiko Ntagatifu cyashyizweho neza!");
      reset();
      
    } catch (error) {
      console.error('Error uploading bible study:', error);
      toast.error("Habaye ikosa mu gushyira icyigisho. Ongera ugerageze.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Shyiraho Icyigisho cy'Inyandiko Ntagatifu</CardTitle>
        <CardDescription>
          Ongeraho icyigisho gishya cy'ubwiyunge
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Umutwe w'icyigisho</Label>
            <Input
              id="title"
              placeholder="Andika umutwe w'icyigisho"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Ifoto y'icyigisho (URL)</Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/ifoto-yicyigisho.jpg"
              {...register("imageUrl")}
              className={errors.imageUrl ? "border-red-500" : ""}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content y'icyigisho</Label>
            <Textarea
              id="content"
              placeholder="Andika content y'icyigisho hano..."
              rows={12}
              {...register("content")}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Birashyirwaho..." : "Shyiraho Icyigisho"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
