import { environment } from "src/environments/environment";

const Constants = {
    ImportTrainingDashboard: environment.apiBaseUrl + 'raw-data/dashboard/import',
    ImportEmployeeMaster: environment.apiBaseUrl + 'raw-data/employee-master/import',
    GetTrainingData: environment.apiBaseUrl + 'raw-data/training-dashboard',
    BatchTrainingData: environment.apiBaseUrl + 'raw-data/batch',
    ActiveEmployeeData: environment.apiBaseUrl + 'raw-data/active-employee',
    ResignedEmployeeData: environment.apiBaseUrl + 'raw-data/resigned-employee',
    GetBatchTech: environment.apiBaseUrl + 'raw-data/batch/tech',
    GetBatchStatus: environment.apiBaseUrl + 'raw-data/batch/status',
    GetJobData: environment.apiBaseUrl + 'job',
    TrainingDashboard: 'Training Dashboard',
    EmployeeMaster: 'Employee Master',
    ActiveEmployee: 'Active',
    ResignedEmployee: 'Resigned',
    noOfRecords: 5,
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0,
    pageZero: 0,
}

export default Constants;