"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CodeEditor from "./code-editor";
import MarkdownEditor from "./markdown-editor";

interface NewItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type ItemTypeName =
  "snippet" | "prompt" | "command" | "note" | "link" | "file" | "image";

const ITEM_TYPES = [
  { value: "snippet", label: "Snippet" },
  { value: "prompt", label: "Prompt" },
  { value: "command", label: "Command" },
  { value: "note", label: "Note" },
  { value: "link", label: "Link" },
  { value: "file", label: "File" },
  { value: "image", label: "Image" },
];

const LANGUAGES = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export default function NewItemDialog({
  open,
  onOpenChange,
}: NewItemDialogProps) {
  const [typeName, setTypeName] = useState<ItemTypeName>("snippet");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [tagsInput, setTagsInput] = useState("");
  const [fileData, setFileData] = useState<{
    fileUrl: string;
    fileName: string;
    fileSize: number;
  } | null>(null);
  const showFileUpload = typeName === "file" || typeName === "image";

  const showContentField = ["snippet", "prompt", "command", "note"].includes(
    typeName,
  );

  const showLanguageField = ["snippet", "command"].includes(typeName);

  const showUrlField = typeName === "link";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>

            <Select
              value={typeName}
              onValueChange={(value) => setTypeName(value as ItemTypeName)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {ITEM_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          {showLanguageField && (
            <div className="space-y-2">
              <Label>Language</Label>

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showContentField && (
            <div className="space-y-2">
              <Label>Content</Label>

              {showLanguageField ? (
                <CodeEditor
                  value={content}
                  onChange={setContent}
                  language={language}
                />
              ) : (
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your content..."
                />
              )}
            </div>
          )}

          {showUrlField && (
            <div className="space-y-2">
              <Label>URL</Label>

              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          )}

          {showFileUpload && (
            <div className="space-y-2">
              <Label htmlFor="file">
                {typeName === "image" ? "Image" : "File"}
              </Label>

              <Input
                id="file"
                type="file"
                accept={typeName === "image" ? "image/*" : undefined}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] ?? null;
                  //setFileData(selectedFile);
                }}
              />

              {fileData && (
                <p className="text-sm text-muted-foreground">
                  {fileData.fileName}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label>Tags</Label>

            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="react, nextjs, typescript"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() => {
                console.log({
                  typeName,
                  title,
                  description,
                  content,
                  url,
                  language,
                  tagsInput,
                });
              }}
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
