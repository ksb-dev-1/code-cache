"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface NewItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewItemDialog({
  open,
  onOpenChange,
}: NewItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <form>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              New Item
            </DialogTitle>

            <DialogDescription>
              Create a new item by providing its details below.
            </DialogDescription>
          </DialogHeader>

          <Separator className="mt-4 mb-8" />

          <FieldGroup>
            <Field>
              <Label htmlFor="type">Type</Label>
              <Select name="type">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="snippet">Snippet</SelectItem>
                  <SelectItem value="prompt">Prompt</SelectItem>
                  <SelectItem value="command">Command</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter title" />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter description"
              />
            </Field>

            <Field>
              <Label htmlFor="language">Language</Label>
              <Select name="language">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Enter content..."
                rows={6}
              />
            </Field>

            <Field>
              <Label htmlFor="url">URL</Label>
              <Input id="url" name="url" placeholder="https://example.com" />
            </Field>

            <Field>
              <Label htmlFor="file">File</Label>
              <Input id="file" name="file" type="file" />
            </Field>

            <Field>
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" name="tags" placeholder="tag1, tag2, tag3" />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
