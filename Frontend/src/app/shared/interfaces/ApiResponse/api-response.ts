export interface ApiResponse<T> {
    currentPage: number,
    records: T[],
    totalPages: number,
    totalRecords: number
}
