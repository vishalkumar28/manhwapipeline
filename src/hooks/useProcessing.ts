import { useState, useCallback } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";

export interface ProcessedImage {
  original: File;
  cleaned?: Blob;
  enhanced?: Blob;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export interface ProcessingState {
  images: ProcessedImage[];
  isProcessing: boolean;
  progress: number;
  currentStep: string;
}

export function useProcessing() {
  const [state, setState] = useState<ProcessingState>({
    images: [],
    isProcessing: false,
    progress: 0,
    currentStep: "",
  });

  const processImages = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    // Check API health first
    const isHealthy = await api.checkHealth();
    if (!isHealthy) {
      toast.error("API server is offline. Please try again later.");
      return;
    }

    setState({
      images: files.map((file) => ({ original: file, status: "pending" })),
      isProcessing: true,
      progress: 0,
      currentStep: "Starting pipeline...",
    });

    const results: ProcessedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      setState((prev) => ({
        ...prev,
        progress: Math.round((i / files.length) * 100),
        currentStep: `Processing image ${i + 1} of ${files.length}: ${file.name}`,
        images: prev.images.map((img, idx) =>
          idx === i ? { ...img, status: "processing" } : img
        ),
      }));

      const result = await api.processImage(file);

      const processedImage: ProcessedImage = {
        original: file,
        cleaned: result.cleanedImage,
        enhanced: result.enhancedImage,
        status: result.error ? "error" : "done",
        error: result.error,
      };

      results.push(processedImage);

      setState((prev) => ({
        ...prev,
        images: prev.images.map((img, idx) =>
          idx === i ? processedImage : img
        ),
      }));
    }

    setState((prev) => ({
      ...prev,
      isProcessing: false,
      progress: 100,
      currentStep: "Processing complete!",
    }));

    const successCount = results.filter((r) => r.status === "done").length;
    const errorCount = results.filter((r) => r.status === "error").length;

    if (errorCount === 0) {
      toast.success(`Successfully processed ${successCount} images!`);
    } else {
      toast.warning(`Processed ${successCount} images, ${errorCount} failed.`);
    }

    return results;
  }, []);

  const reset = useCallback(() => {
    setState({
      images: [],
      isProcessing: false,
      progress: 0,
      currentStep: "",
    });
  }, []);

  const downloadImage = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const downloadAllEnhanced = useCallback(() => {
    state.images
      .filter((img) => img.enhanced)
      .forEach((img, idx) => {
        if (img.enhanced) {
          downloadImage(img.enhanced, `enhanced_${String(idx + 1).padStart(3, "0")}.png`);
        }
      });
  }, [state.images, downloadImage]);

  return {
    ...state,
    processImages,
    reset,
    downloadImage,
    downloadAllEnhanced,
  };
}
