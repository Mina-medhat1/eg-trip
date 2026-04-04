using Microsoft.AspNetCore.Mvc;

namespace eg_travil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] SignUpRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request?.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            // TODO: Add your signup logic here (database, password hashing, etc.)
            return Ok(new { 
                message = "User registered successfully",
                token = "dummy-token-" + Guid.NewGuid().ToString(),
                fullName = request.FullName ?? "User"
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request?.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            // TODO: Add your login logic here (database validation, JWT generation, etc.)
            return Ok(new { 
                message = "Login successful",
                token = "dummy-token-" + Guid.NewGuid().ToString(),
                fullName = "Test User"
            });
        }
    }

    public class SignUpRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FullName { get; set; }
    }

    public class LoginRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
