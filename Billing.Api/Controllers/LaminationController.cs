using Billing.Api.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Billing.Api.Controllers
{
    public class LaminationController : ControllerBase
    {
        private readonly ILaminationRepository _laminationRepository;

        public LaminationController(ILaminationRepository laminationRepository)
        {
            _laminationRepository = laminationRepository;
        }

        [HttpGet("finishtypes")]
        public async Task<IActionResult> GetFinshTypes()
        {
            var services = await _laminationRepository.GetLaminationFinishTypes();
            return Ok(services);
        }

        [HttpGet("laminationtypes")]
        public async Task<IActionResult> GetLaminationTypes()
        {
            var sizes = await _laminationRepository.GetLaminationTypes();
            return Ok(sizes);
        }
    }
}
