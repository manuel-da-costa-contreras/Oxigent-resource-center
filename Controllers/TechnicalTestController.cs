using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace ResourceCenterInterview.Controllers;

public class TechnicalTestController : Controller
{
    private readonly IWebHostEnvironment _environment;

    public TechnicalTestController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public IActionResult ResourceCenter()
    {
        var dataFilePath = Path.Combine(_environment.ContentRootPath, "Data", "resources.mock.json");

        if (!System.IO.File.Exists(dataFilePath))
        {
            ViewBag.ResourceCenterData = "[]";
            return View();
        }

        var json = System.IO.File.ReadAllText(dataFilePath);

        // Validate JSON once server-side to avoid runtime script errors in the view.
        using var _ = JsonDocument.Parse(json);
        ViewBag.ResourceCenterData = json;

        return View();
    }
}
