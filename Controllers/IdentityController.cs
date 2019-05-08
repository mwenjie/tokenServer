using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using IdentityModel.Client;

namespace myauth1.Controllers
{
    [Route("api/[controller]")]
    public class IdentityController : ControllerBase
    {

        [HttpGet("connect/authorize")]
        public async Task<IActionResult> Authorize()
        {
            // discover endpoints from metadata
            var client = new HttpClient();
            var disco = await client.GetDiscoveryDocumentAsync("http://localhost:5000");
            if (disco.IsError)
            {
                Console.WriteLine(disco.Error);
                return BadRequest();
            }
            // request token
            var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
            {
                Address = disco.TokenEndpoint,

                ClientId = "client",
                ClientSecret = "secret",
                Scope = "api2.full_access"
            });

            if (tokenResponse.IsError)
            {
                Console.WriteLine(tokenResponse.Error);
                return BadRequest();
            }

            return Ok(tokenResponse.Json);

        }
    }
}