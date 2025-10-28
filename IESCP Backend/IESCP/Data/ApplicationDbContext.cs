using IESCP.Models;
using Microsoft.EntityFrameworkCore;

namespace IESCP.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) 
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<Influencer> Influencers { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<AdRequest> AdRequests { get; set; }

        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 3,
                    UserName = "nekochan",
                    Password = "0307",
                    Email = "kmchandu81@gmail.com",
                    PhoneNumber = "8296986079",
                    Role = UserRole.Admin,
                    ProfilePictureUrl = "",
                    IsFlagged = false
                }
            );
        }
    }
}
