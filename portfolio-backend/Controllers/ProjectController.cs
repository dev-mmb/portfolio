using Microsoft.AspNetCore.Mvc;
using portfolio_backend.Contexts;
using portfolio_backend.Models;

namespace portfolio_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    private const string ProjectUri = "project";

    private DatabaseContext databaseContext;

    private readonly ILogger<ProjectController> _logger;

    public ProjectController(ILogger<ProjectController> logger, DatabaseContext context)
    {
        _logger = logger;
        databaseContext = context;
    }

    [HttpGet(Name = $"{ProjectUri}")]
    public IResult Get()
    {
        return Results.Ok(databaseContext.Projects.AsEnumerable());
    }

    [HttpGet(Name = $"{ProjectUri}/{{link}}")]
    public IResult Get(string link)
    {
        var entity = databaseContext.Projects.Find(link);
        if (entity == null) return Results.NotFound();
        return Results.Ok(entity);
    }

    [HttpPost(Name = $"{ProjectUri}/{{link}}")]
    public IResult Post(string link)
    {
        var entity = databaseContext.Projects.Find(link);
        if (entity != null) return Results.BadRequest("Key already exists");

        var project = new ProjectModel(link);
        databaseContext.Add(project);
        databaseContext.SaveChanges();
        return Results.Created($"{ProjectUri}/{link}", project);
    }

    [HttpPost(Name = $"{ProjectUri}")]
    public IResult Post(ProjectModel projectModel)
    {
        var entity = databaseContext.Projects.Find(projectModel.Link);
        if (entity != null) return Results.BadRequest("Key already exists");
    
        databaseContext.Add(projectModel);
        databaseContext.SaveChanges();
        return Results.Created($"{ProjectUri}/{projectModel.Link}", projectModel);
    }

    [HttpDelete(Name = $"{ProjectUri}/{{link}}")]
    public IResult Delete(string link)
    {
        var entity = databaseContext.Projects.Find(link);
        if (entity == null) return Results.NotFound();

        databaseContext.Remove(entity);
        databaseContext.SaveChanges();

        return Results.Ok();
    }

    [HttpPut(Name = $"{ProjectUri}/{{link}}/{{newLink}}")]
    public IResult Put(string link, string newLink)
    {
        var entity = databaseContext.Projects.Find(link);
        if (entity == null) return Results.NotFound();

        databaseContext.Remove(entity);

        entity.Link = newLink;
        databaseContext.Add(entity);

        databaseContext.SaveChanges();

        return Results.Ok();
    }
}