// "use client";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Field, FieldGroup } from "@/components/ui/field";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Plus } from "lucide-react";
// import { Separator } from "@/components/ui/separator";

// interface NewItemDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function NewItemDialog({
//   open,
//   onOpenChange,
// }: NewItemDialogProps) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-125">
//         <form>
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
//                 <Plus className="h-4 w-4 text-primary" />
//               </div>
//               New Item
//             </DialogTitle>

//             <DialogDescription>
//               Create a new item by providing its details below.
//             </DialogDescription>
//           </DialogHeader>

//           <Separator className="mt-4 mb-8" />

//           <FieldGroup>
//             <Field>
//               <Label htmlFor="type">Type</Label>
//               <Select name="type">
//                 <SelectTrigger id="type">
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="snippet">Snippet</SelectItem>
//                   <SelectItem value="prompt">Prompt</SelectItem>
//                   <SelectItem value="command">Command</SelectItem>
//                   <SelectItem value="note">Note</SelectItem>
//                   <SelectItem value="link">Link</SelectItem>
//                   <SelectItem value="file">File</SelectItem>
//                   <SelectItem value="image">Image</SelectItem>
//                 </SelectContent>
//               </Select>
//             </Field>

//             <Field>
//               <Label htmlFor="title">Title</Label>
//               <Input id="title" name="title" placeholder="Enter title" />
//             </Field>

//             <Field>
//               <Label htmlFor="description">Description</Label>
//               <Input
//                 id="description"
//                 name="description"
//                 placeholder="Enter description"
//               />
//             </Field>

//             <Field>
//               <Label htmlFor="language">Language</Label>
//               <Select name="language">
//                 <SelectTrigger id="language">
//                   <SelectValue placeholder="Select language" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="javascript">JavaScript</SelectItem>
//                   <SelectItem value="typescript">TypeScript</SelectItem>
//                   <SelectItem value="python">Python</SelectItem>
//                   <SelectItem value="java">Java</SelectItem>
//                 </SelectContent>
//               </Select>
//             </Field>

//             <Field>
//               <Label htmlFor="content">Content</Label>
//               <Textarea
//                 id="content"
//                 name="content"
//                 placeholder="Enter content..."
//                 rows={6}
//               />
//             </Field>

//             <Field>
//               <Label htmlFor="url">URL</Label>
//               <Input id="url" name="url" placeholder="https://example.com" />
//             </Field>

//             <Field>
//               <Label htmlFor="file">File</Label>
//               <Input id="file" name="file" type="file" />
//             </Field>

//             <Field>
//               <Label htmlFor="tags">Tags</Label>
//               <Input id="tags" name="tags" placeholder="tag1, tag2, tag3" />
//             </Field>
//           </FieldGroup>

//           <DialogFooter className="mt-6">
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => onOpenChange(false)}
//               >
//                 Cancel
//               </Button>
//             </DialogClose>

//             <Button type="submit">Create</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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

// import CodeEditor from "./code-editor";
// import MarkdownEditor from "./markdown-editor";

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

              {/* {showLanguageField ? (
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
              )} */}
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
