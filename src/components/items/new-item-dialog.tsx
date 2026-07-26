"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select>
              <SelectTrigger>
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
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Enter title" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="Enter description" />
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea placeholder="Enter content..." rows={6} />
          </div>

          <div className="space-y-2">
            <Label>URL</Label>
            <Input placeholder="https://example.com" />
          </div>

          <div className="space-y-2">
            <Label>File</Label>
            <Input type="file" />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input placeholder="tag1, tag2, tag3" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
