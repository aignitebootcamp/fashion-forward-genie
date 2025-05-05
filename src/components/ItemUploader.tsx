
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemUploaderProps {
  onUpload: (file: File, previewUrl: string) => void;
  className?: string;
}

const ItemUploader = ({ onUpload, className }: ItemUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onUpload(file, url);
  };

  const clearPreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card 
      className={cn(
        "border-dashed relative", 
        dragActive ? "border-primary" : "border-border",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Input
        ref={fileInputRef}
        type="file"
        id="item-upload"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="relative aspect-square">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover rounded-md"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full h-8 w-8 shadow-md"
            onClick={clearPreview}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <label 
          htmlFor="item-upload" 
          className="flex flex-col items-center justify-center aspect-square cursor-pointer text-muted-foreground p-4"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Camera className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium">Upload Item Image</p>
          <p className="text-xs mt-1 text-center">
            Drag and drop or click to upload
          </p>
        </label>
      )}
    </Card>
  );
};

export default ItemUploader;
