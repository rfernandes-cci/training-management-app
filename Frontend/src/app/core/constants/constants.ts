import { environment } from "src/environments/environment";

const Constants = {
    ImportTrainingDashboard: environment.apiBaseUrl + 'raw-data/dashboard/import',
    ImportEmployeeMaster: environment.apiBaseUrl + 'raw-data/employee-master/import',
    GetTrainingData: environment.apiBaseUrl + 'raw-data/training-dashboard',
    TrainingDashboard: 'Training Dashboard',
    EmployeeMaster: 'Employee Master'
}

export default Constants;