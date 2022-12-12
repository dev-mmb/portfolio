using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using portfolio_backend.Contexts;
using portfolio_backend.Models;

namespace portfolio_backend.Controllers;
public class FileController : Controller
{
    private const string FileUri = "file";

    private DatabaseContext _dbContext;

    public FileController(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost(Name = $"{FileUri}/{{link}}")]
    public IResult Post(List<IFormFile> files)
    {
        List<string> fileNames = new List<string>();

        files.ForEach(file =>
        {
            if (file.Length > 0)
            {
                using (var mStream = new MemoryStream())
                {
                    file.CopyToAsync(mStream);

                    var entity = new FileModel(file.Name, mStream.ToArray());

                    _dbContext.Files.Add(entity);
                    _dbContext.SaveChanges();


                    fileNames.Add(entity.Name);
                }
            }
        });

        return Results.Ok(fileNames);
    }


}