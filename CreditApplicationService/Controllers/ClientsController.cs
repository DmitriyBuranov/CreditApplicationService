using CreditApplicationService.Core.Domain;
using CreditApplicationService.DataAccess.Repositories.Abstractions;
using CreditApplicationService.Mappers;
using CreditApplicationService.Models;
using Microsoft.AspNetCore.Mvc;

namespace CreditApplicationService.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IRepository<Client> _repositoryClients;

        public ClientsController(IRepository<Client> repositoryClients)
        {
            _repositoryClients = repositoryClients;
        }

        /// <summary>
        /// Gets List of Clients
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllClientsAsync()
        {
            var entities = await _repositoryClients.GetAllAsync();
            return Ok(entities);
        }

        /// <summary>
        /// Gets Client By Id
        /// </summary>
        /// <param name="id">Client Id</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetClientAsync(int id)
        {
            if (id <= 0)
                return BadRequest();

            var entity = await _repositoryClients.GetByIdAsync(id);

            if (entity == null)
                return NotFound();

            return Ok(entity);
        }

        /// <summary>
        /// Creates Client
        /// </summary>        
        /// <param name="request">Client Dto</param>
        /// <returns>Client Id</returns>
        [HttpPost]
        public async Task<ActionResult> CreateClientAsync(ClientDto request)
        {
            var entity = ClientMapper.MapFromModel(request);

            await _repositoryClients.AddAsync(entity);

            return Ok(entity.Id);
        }

        /// <summary>
        /// Updates Client
        /// </summary>
        /// <param name="id">Client Id</param>
        /// <param name="request">Client Dto</param> 
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClientAsync(int id, ClientDto request)
        {
            var entity = await _repositoryClients.GetByIdAsync(id);

            if (entity == null)
                return NotFound();

            ClientMapper.MapFromModel(request, entity);
            await _repositoryClients.UpdateAsync(entity);

            return Ok();
        }

        /// <summary>
        /// Deletes Client
        /// </summary>
        /// <param name="id">Client Id</param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var entity = await _repositoryClients.GetByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _repositoryClients.DeleteAsync(entity);

            return Ok();
        }

        /// <summary>
        /// Gets List of Clients with this Surname
        /// </summary>
        /// /// <param name="surname">Client surname</param>
        /// <returns></returns>
        [HttpGet("BySurname{surname}")]
        public async Task<IActionResult> GetClientsWIthSurnameAsync(string surname)
        {
            var entities = await _repositoryClients.GetAllAsync(x => x.Surname == surname);
            return Ok(entities);
        }
    }
}