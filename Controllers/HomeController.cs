using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ResourceCenterInterview.Models;

namespace ResourceCenterInterview.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return RedirectToAction("ResourceCenter", "TechnicalTest");
    }

    public IActionResult Privacy()
    {
        return RedirectToAction("ResourceCenter", "TechnicalTest");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
