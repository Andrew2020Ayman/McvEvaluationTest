using System.Collections.Generic;

namespace McvTask.API.models
{
    public class department
    {
        public int Id { get; set; }
        public string departmentName { get; set; }
        public ICollection<employee> Employees  { get; set; }
    }
}