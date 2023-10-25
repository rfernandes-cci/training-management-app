import { environment } from "src/environments/environment";

const Constants = {
    ImportTrainingDashboard: environment.apiBaseUrl + 'raw-data/dashboard/import',
    ImportEmployeeMaster: environment.apiBaseUrl + 'raw-data/employee-master/import'
}

export default Constants;