using Billing.Api.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Billing.Api.Controllers
{
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoRepository _photoRepository;

        public PhotoController(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        [HttpGet("services")]
        public async Task<IActionResult> GetServices()
        {
            var services = await _photoRepository.GetPhotoServicesAsync();
            return Ok(services);
        }

        [HttpGet("sizes")]
        public async Task<IActionResult> GetSizes()
        {
            var sizes = await _photoRepository.GetPhotoSizesAsync();
            return Ok(sizes);
        }
    }
}
