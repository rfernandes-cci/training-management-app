export interface EmployeeData {
    createdAt: string,
    currBusinessSystemQualification: string | null,
    currClient1: string,
    currClient2: string, 
    currClient3: string,
    currClient4: string,
    currCoreTechStack: string,
    currDepartment: string,
    currDesForReporting: string,
    currDesignation: string,
    currDesignationSince: string,
    currExperience: string,
    currGrade: string,
    currLocation: string,
    currManagerialQualification: string | null,
    currPresonalInterests: string | null,
    currPreviousEmployerExperience: number,
    currSecondaryTechStack: string | null,
    doj: string,
    email: string,
    employee: string,
    employeeNumber: string,
    employeeStatus: string,
    isProcessed: boolean,
    leavingDate: string | null,
    presentCity: string,
    presentState : string,
    reportingTo: string,
    updatedAt: string,
    yearsServedInCurrDesignation: number
}
