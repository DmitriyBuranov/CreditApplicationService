using CreditApplicationService.Core.Domain;
using CreditApplicationService.DataAccess.Repositories.Abstractions;
using CreditApplicationService.Mappers;
using CreditApplicationService.Models;
using Microsoft.AspNetCore.Mvc;

namespace CreditApplicationService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CreditApplicationsController : ControllerBase
    {
        private readonly IRepository<CreditApplication> _repositoryCreditApplications;

        public CreditApplicationsController(IRepository<CreditApplication> repositoryCreditApplications)
        {
            _repositoryCreditApplications = repositoryCreditApplications;
        }

        /// <summary>
        /// Gets List of CreditApplications
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllCreditApplicationsAsync()
        {
            var entities = await _repositoryCreditApplications.GetAllAsync();
            return Ok(entities);
        }

        /// <summary>
        /// Gets CreditApplication By Id
        /// </summary>
        /// <param name="id">CreditApplication Id</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetCreditApplicationAsync(int id)
        {
            if (id <= 0)
                return BadRequest();

            var entity = await _repositoryCreditApplications.GetByIdAsync(id);

            if (entity == null)
                return NotFound();

            return Ok(entity);
        }

        /// <summary>
        /// Creates CreditApplication
        /// </summary>        
        /// <param name="request">CreditApplication Dto</param>
        /// <returns>CreditApplication Id</returns>
        [HttpPost]
        public async Task<ActionResult> CreateCreditApplicationAsync(CreditApplicationDto request)
        {
            var entity = CreditApplicationMapper.MapFromModel(request);

            await _repositoryCreditApplications.AddAsync(entity);

            return Ok(entity.Id);
        }

        /// <summary>
        /// Updates CreditApplication
        /// </summary>
        /// <param name="id">CreditApplication Id</param>
        /// <param name="request">CreditApplication Dto</param> 
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCreditApplicationAsync(int id, CreditApplicationDto request)
        {
            var entity = await _repositoryCreditApplications.GetByIdAsync(id);

            if (entity == null)
                return NotFound();

            CreditApplicationMapper.MapFromModel(request, entity);
            await _repositoryCreditApplications.UpdateAsync(entity);

            return Ok();
        }

        /// <summary>
        /// Deletes CreditApplication
        /// </summary>
        /// <param name="id">CreditApplication Id</param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteCreditApplication(int id)
        {
            var entity = await _repositoryCreditApplications.GetByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _repositoryCreditApplications.DeleteAsync(entity);

            return Ok();
        }
    }
}