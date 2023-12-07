import { SummaryItem } from "./summary-item"

export interface JobsData {
    createdAt: string,
    errorFileLink: string,
    fileName: string,
    filePath: string,
    importType: string,
    jobId: string,
    jobType: string,
    status: string
    summary: SummaryItem[],
    updatedAt: string 
}

