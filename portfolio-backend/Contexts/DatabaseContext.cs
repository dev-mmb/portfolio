using Microsoft.EntityFrameworkCore;
using portfolio_backend.Models;


namespace portfolio_backend.Contexts;

public class DatabaseContext : DbContext
{
    public DbSet<ProjectModel> Projects { get; set; }
    public DbSet<FileModel> Files { get; set; }

    public string DbPath { get; }

    public DatabaseContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "portfolio.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");


}
