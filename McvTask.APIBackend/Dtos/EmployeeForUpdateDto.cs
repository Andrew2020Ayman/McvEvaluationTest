using System;

namespace McvTask.API___test.Dtos
{
    public class EmployeeForUpdateDto
    {
        public string employeeName { get; set; }
        public DateTime birthDate { get; set; }
        public string employeeTitle { get; set; }
        public DateTime hiringDate { get; set; }
        public string departmentName { get; set; }
    }
}