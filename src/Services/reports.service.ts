import { api } from "./axiosConfig";

export type ReportType = "sales" | "expenses" | "investments" | "full";
export type ReportFormat = "xlsx" | "csv" | "pdf";

export interface ExportReportPayload {
  type: ReportType;
  format: ReportFormat;
  date_from: string; // "YYYY-MM-DD"
  date_to: string;   // "YYYY-MM-DD"
}

const MIME_MAP: Record<ReportFormat, string> = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  pdf: "application/pdf",
};

export const exportReport = async (payload: ExportReportPayload): Promise<void> => {
  const response = await api.post("/reports/export", payload, {
    responseType: "blob",
  });

  const mime = MIME_MAP[payload.format];
  const blob = new Blob([response.data as BlobPart], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `reporte_${payload.type}_${payload.date_from}_${payload.date_to}.${payload.format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
