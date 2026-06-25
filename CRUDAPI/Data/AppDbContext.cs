using Microsoft.EntityFrameworkCore;
using CRUDAPI.Models;



namespace CRUDAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<UserLogin>().ToTable("UserLogin"); // ✅ force EF to use singular table
}
    }

}
