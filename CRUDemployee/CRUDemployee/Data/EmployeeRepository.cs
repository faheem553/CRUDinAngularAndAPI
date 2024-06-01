using Microsoft.EntityFrameworkCore;
using System;

namespace CRUDemployee.Data
{
    public class EmployeeRepository
    {
        private readonly ApplicationDbContext db;

        public EmployeeRepository(ApplicationDbContext appDbContext)
        {
            db = appDbContext;
        }

        public async Task AddEmployeeAsync(Employee employee)
        {
            await db.Set<Employee>().AddAsync(employee);
            await db.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployeeAsync()
        {
            return await db.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await db.Employees.FindAsync(id);
        }

        public async Task UpdateEmployeeAsync(int id, Employee model)
        {
            var employeee = await db.Employees.FindAsync(id);
            if (employeee == null)
            {
                throw new Exception("Employee not found");
            }
            employeee.Name = model.Name;
            employeee.Email = model.Email;
            employeee.Phone = model.Phone;
            employeee.Age = model.Age;
            employeee.Salary = model.Salary;
            employeee.Password = model.Password;
            await db.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsnyc(int id)
        {
            var employeee = await db.Employees.FindAsync(id);
            if (employeee == null)
            {
                throw new Exception("Employee not found");
            }
            db.Employees.Remove(employeee);
            await db.SaveChangesAsync();
        }
    }
}
