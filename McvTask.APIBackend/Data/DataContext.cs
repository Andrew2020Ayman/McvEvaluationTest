using McvTask.API.models;
using Microsoft.EntityFrameworkCore;

namespace McvTask.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<employee> Employees {get; set;}
        public DbSet<department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
   

           modelBuilder.Entity<employee>()
                .HasOne(e => e.department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.departmentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<department>()
                .HasIndex(d => d.departmentName)
                .IsUnique();
        }

    }
   

}