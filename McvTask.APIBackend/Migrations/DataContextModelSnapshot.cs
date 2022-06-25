﻿// <auto-generated />
using System;
using McvTask.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace McvTask.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("McvTask.API.models.department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("departmentName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("departmentName")
                        .IsUnique();

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("McvTask.API.models.employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("birthDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("departmentId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("employeeName")
                        .HasColumnType("TEXT");

                    b.Property<string>("employeeTitle")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("hiringDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("departmentId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("McvTask.API.models.employee", b =>
                {
                    b.HasOne("McvTask.API.models.department", "department")
                        .WithMany("Employees")
                        .HasForeignKey("departmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("department");
                });

            modelBuilder.Entity("McvTask.API.models.department", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}