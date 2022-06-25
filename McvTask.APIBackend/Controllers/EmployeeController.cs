using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using McvTask.API.Data;
using McvTask.API.Dtos;
using McvTask.API.models;
using McvTask.API___test.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace McvTask.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository repo;
        private readonly IMapper mapper;

        public EmployeeController(IEmployeeRepository repo , IMapper mapper)
       {
            this.repo = repo;
            this.mapper = mapper;
        }

       [HttpGet]
       public async Task<IActionResult> GetEmployees(){

        var Employees = await repo.GetEmployees();

         var usersToReturn =  mapper.Map<IEnumerable<EmployeeForReturnDto>>(Employees);
        return Ok(usersToReturn);
       } 
       [HttpGet("{id}")]
       public async Task<IActionResult> GetEmployee(int id){

        var Employee = await repo.GetEmployee(id);
        if(Employee ==null)
          return BadRequest($"employee with id: {id} doesn't exist");

         var usersToReturn =  mapper.Map<EmployeeForReturnDto>(Employee);
        return Ok(usersToReturn);
       } 

        [HttpPost]
       public async Task<IActionResult> AddEmpolyee(EmployeeForCreationDto employeeForCreationDto)
       {
         var departmentSelected = await repo.getDepartment(employeeForCreationDto.departmentName);
         if(departmentSelected == null)
            return BadRequest("Department is not exist");

            var CreatedEmployee = mapper.Map<employee>(employeeForCreationDto);
            CreatedEmployee.departmentId = departmentSelected.Id;
             repo.Add<employee>(CreatedEmployee);
            if(await repo.SaveAll()){
                var employee = mapper.Map<EmployeeForReturnDto>(CreatedEmployee);
                return Ok(employee);
            }
            throw new Exception("Failed to add employee");
       } 

        [HttpPut("{id}")]
       public async Task<IActionResult> EditEmpolyee(int id,EmployeeForUpdateDto employeeForUpdateDto)
        {
            employeeForUpdateDto.departmentName = employeeForUpdateDto.departmentName.ToLower();
            
             var departmentSelected = await repo.getDepartment(employeeForUpdateDto.departmentName);
            if(departmentSelected == null)
                return BadRequest("Department is not exist");
                
            var employeefromRepo = await repo.GetEmployee(id);
            employeefromRepo.departmentId = departmentSelected.Id;           
            mapper.Map(employeeForUpdateDto,employeefromRepo);
            if(await repo.SaveAll())
                return NoContent();   
                
            throw new Exception($"Updating employee {id} failed on save") ;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteEmployee(int id)
        {
             var employeeFromRepo = await repo.GetEmployee(id);
             if(employeeFromRepo == null)
               return BadRequest($"employee with id: {id} doesn't exist");

             repo.Delete(employeeFromRepo);

             if(await repo.SaveAll())
                return Ok();

            return BadRequest($"Failed to delete empolyee with id : {id} ");
        }

    }
}