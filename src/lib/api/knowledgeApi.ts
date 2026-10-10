import { apiClient } from "./client";
import { KnowledgeDocument } from "@/types/dashboard";
import { mockKnowledgeBase } from "@/data/mock/dashboardData";

export const knowledgeApi = {
  // Get all indexed RAG documents
  getDocuments: async (): Promise<KnowledgeDocument[]> => {
    return apiClient<KnowledgeDocument[]>("/knowledge/documents", {
      method: "GET",
      fallbackData: mockKnowledgeBase,
    });
  },

  // Upload a document (PDF, DOCX, TXT) for vector indexing
  uploadDocument: async (file: File, category: string): Promise<KnowledgeDocument> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const response = await fetch("/api/knowledge/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      return await response.json();
    } catch {
      // Fallback mock
      return {
        id: `DOC-${Date.now()}`,
        title: file.name,
        category: category as KnowledgeDocument["category"],
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: "Just now",
        status: "processing",
        vectorChunks: 18,
        lastUpdated: "Just now",
      };
    }
  },

  // Test search against indexed RAG knowledge base
  queryKnowledge: async (query: string): Promise<{ answer: string; sources: string[] }> => {
    return apiClient<{ answer: string; sources: string[] }>("/knowledge/query", {
      method: "POST",
      body: JSON.stringify({ query }),
      fallbackData: {
        answer: "Sample RAG answer grounded on institutional policy documents.",
        sources: ["Scholarship_Policy_2026.pdf", "Fee_Structure_v4.pdf"],
      },
    });
  },
};
