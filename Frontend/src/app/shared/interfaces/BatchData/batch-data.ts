export interface BatchData {
    NoFailed: number | null;
    NoOfTrainees: number;
    NoSuccess: number | null;
    batchTitle: string;
    createdAt: string;
    endDate: string | null;
    headTrainer: string;
    id: string;
    isProcessed: boolean;
    startDate: string;
    status: string;
    tech: string;
    trainingCoordinator: string;
    updatedAt: string;
}
