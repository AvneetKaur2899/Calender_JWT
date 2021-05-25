using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CalenderApplications.Models
{
    public partial class CalenderDBContext : DbContext
    {
        public CalenderDBContext()
        {
        }

        public CalenderDBContext(DbContextOptions<CalenderDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EventsList> EventsList { get; set; }
        public virtual DbSet<UserInfo> UserInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server= CYG299\\SQLEXPRESS;Database=CalenderDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventsList>(entity =>
            {
                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EventName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasKey(e => e.EmailId);

                entity.Property(e => e.EmailId)
                    .HasMaxLength(250)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Password).HasMaxLength(250);
            });
        }
    }
}
