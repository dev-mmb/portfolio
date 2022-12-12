using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace portfolio_backend.Models;
public class FileModel
{
    public FileModel(string name, byte[] blob)
    {
        this.Name = name;
        this.Blob = blob;
    }

    [Key] public string Name { get; set; }

    [Required] public byte[] Blob;
}