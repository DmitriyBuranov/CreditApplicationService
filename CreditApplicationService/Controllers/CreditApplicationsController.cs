using CreditApplicationService.Core.Domain;
using CreditApplicationService.DataAccess.Repositories.Abstractions;
using CreditApplicationService.Mappers;
using CreditApplicationService.Models;
using CreditApplicationService.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace CreditApplicationService.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CreditApplicationsController : ControllerBase
    {
        private readonly IRepository<CreditApplication> _repositoryCreditApplications;

        private readonly IRepository<Client> _repositoryClients;

        public CreditApplicationsController(IRepository<CreditApplication> repositoryCreditApplications, IRepository<Client> repositoryClients)
        {
            _repositoryCreditApplications = repositoryCreditApplications;
            _repositoryClients = repositoryClients;
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
            var client = await _repositoryClients.GetByIdAsync(entity.ClientId);
            entity.Result = CreditApprovalService.ApproveCredit(entity, client);
            await _repositoryCreditApplications.AddAsync(entity);

            return Ok(entity.Result);
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


        /// <summary>
        /// Gets List of Credit Applications with clients info
        /// </summary>
        /// <param name="type">Client surname</param>
        /// <returns> CreditApplicationsResponse</returns>
        [HttpGet("WithCLientsInfo{type}")]
        public async Task<IActionResult> GetAllCreditApplicationsWithClientsAsync(string type)
        {
            Expression<Func<CreditApplication, bool>> expression = x => true; ;

            switch (type) {
                case "Denied":
                    expression = x => x.Result == false;
                    break;
                case "Approved":
                    expression = x => x.Result == true;
                    break;
            }        

            var entities = await _repositoryCreditApplications
                .GetManySelectAsync<CreditApplicationsResponse>(expression, entity => new CreditApplicationsResponse
                {
                    CreditId = entity.Id,
                    ClientId = entity.ClientId,
                    Surname = entity.Client.Surname,
                    Name = entity.Client.Name,
                    CreatedAt = entity.CreatedAt,
                    Result = entity.Result
                 });
 
            return Ok(entities);
        }
    }
}