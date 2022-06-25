using System.Collections.Generic;
using System.Threading.Tasks;
using McvTask.API.Interfaces;
using McvTask.API.models;
using Microsoft.EntityFrameworkCore;

namespace McvTask.API.Data
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DataContext context;

        public DepartmentRepository(DataContext context)
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

    
         public async Task<bool> DepartmentNameIsFound(string departmentName)
        {
            return await context.Departments.FirstOrDefaultAsync(d => d.departmentName.ToLower() == departmentName.ToLower()) == null;
        }


        public async Task<department> GetDepartment(int id)
        {
            var department = await context.Departments.FirstOrDefaultAsync(u => u.Id == id);
           return department;
        }

        public async Task<IEnumerable<department>> GetDepartments()
        {
             var departments = await context.Departments.ToListAsync();
            return departments;
        }

        public async Task<bool> SaveAll()
        {
             return await context.SaveChangesAsync() > 0;
        }

    }
}