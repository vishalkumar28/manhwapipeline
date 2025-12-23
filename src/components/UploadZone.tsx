import { useState, useCallback } from "react";
import { Upload, Image, FolderOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFilesSelect: (files: File[]) => void;
}

const UploadZone = ({ onFilesSelect }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );
    
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles]);
      onFilesSelect([...files, ...droppedFiles]);
    }
  }, [files, onFilesSelect]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(file =>
      file.type.startsWith("image/")
    );
    
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
      onFilesSelect([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelect(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer group",
          isDragging
            ? "border-primary bg-primary/5 glow-primary"
            : "border-border hover:border-primary/50 hover:bg-card/50"
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={cn(
              "p-4 rounded-2xl transition-all duration-300",
              isDragging
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}
          >
            <Upload className="w-8 h-8" />
          </div>
          
          <div>
            <h4 className="font-display text-lg mb-1">
              {isDragging ? "Drop your images here" : "Upload Raw Manhwa Pages"}
            </h4>
            <p className="text-sm text-muted-foreground">
              Drag & drop your chapter images or click to browse
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Image className="w-4 h-4" />
            <span>Supports JPG, PNG, WEBP</span>
          </div>
        </div>

        {/* Animated border effect on drag */}
        {isDragging && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan" />
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-primary" />
              <span className="font-display text-sm">{files.length} Images Ready</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFiles([]);
                onFilesSelect([]);
              }}
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                  <span className="text-[10px] text-muted-foreground truncate block">
                    {String(index + 1).padStart(3, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
