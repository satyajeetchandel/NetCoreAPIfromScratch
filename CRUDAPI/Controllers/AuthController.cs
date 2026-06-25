using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRUDAPI.Data;
using CRUDAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLogin login)
    {
        var user = _context.UserLogins
            .FirstOrDefault(u => u.UserName == login.UserName && u.Password == login.Password);

        if (user == null)
            return Unauthorized(new { message = "Invalid credentials" });

        // ✅ Create JWT token
        var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
};

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });


        
    }
}

