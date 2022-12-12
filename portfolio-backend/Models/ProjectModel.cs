using System.ComponentModel.DataAnnotations;

namespace portfolio_backend.Models;
public class ProjectModel 
{
    public ProjectModel(string link)
    {
        Link = link;
    }

    [Key]
    public string Link { get; set; }
}
