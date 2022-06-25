using System.Collections.Generic;
using System.Threading.Tasks;
using McvTask.API.models;
using Microsoft.EntityFrameworkCore;

namespace McvTask.API.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext context;

        public EmployeeRepository(DataContext context)
        {
            this.context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
           context.Remove(entity);
        }

        public async Task<department> getDepartment(string departmentName)
        {
             var department =  await context.Departments.FirstOrDefaultAsync(d => d.departmentName.ToLower() == departmentName.ToLower());
             if(department != null)
               return department;
            
            return null;
        }

        public  async Task<employee> GetEmployee(int id)
        {
          var employee = await context.Employees.Include(x => x.department)
                        .FirstOrDefaultAsync(u => u.Id == id);
          return employee;
        }

        public async Task<IEnumerable<employee>> GetEmployees()
        {
            
             var employees = await context.Employees.Include(x => x.department).ToListAsync();
            return employees;
        }

        public async Task<bool> SaveAll()
        {
             return await context.SaveChangesAsync() > 0;
        }
    }
}