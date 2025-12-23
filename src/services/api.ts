const API_BASE_URL = "https://manga-processor-api.onrender.com";

export interface ProcessingResult {
  cleanedImage?: Blob;
  enhancedImage?: Blob;
  error?: string;
}

export const api = {
  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  // Clean image (denoise + threshold)
  async cleanImage(file: File): Promise<Blob> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/clean-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to clean image: ${response.statusText}`);
    }

    return response.blob();
  },

  // Enhance panel (add border)
  async enhancePanel(file: File, border: number = 10): Promise<Blob> {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("border", border.toString());

    const response = await fetch(`${API_BASE_URL}/enhance-panel`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to enhance panel: ${response.statusText}`);
    }

    return response.blob();
  },

  // Process single image through full pipeline
  async processImage(file: File): Promise<ProcessingResult> {
    try {
      const cleanedBlob = await api.cleanImage(file);
      const cleanedFile = new File([cleanedBlob], file.name, { type: "image/png" });
      const enhancedBlob = await api.enhancePanel(cleanedFile);
      
      return {
        cleanedImage: cleanedBlob,
        enhancedImage: enhancedBlob,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Processing failed",
      };
    }
  },
};
