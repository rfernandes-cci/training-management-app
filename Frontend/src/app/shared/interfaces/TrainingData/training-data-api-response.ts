import { TrainingData } from "./training-data";

export interface TrainingDataApiResponse {
    currentPage: number,
    records: TrainingData[],
    totalPages: number,
    totalRecords: number
}

