using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CalenderApplications.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CalenderApplications.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }
        [AllowAnonymous]
        [HttpPost]
        public Object Login([FromBody]UserInfo login)
        {
            IActionResult response;
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
                return response;
            }
            else
                return new { token = "" };
        }

        private string GenerateJSONWebToken(UserInfo userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserInfo AuthenticateUser(UserInfo login)
        {
            UserInfo user = null;

            CalenderDBContext _context = new CalenderDBContext();
            //hamare pure table mein check krega (whether present or not)
            //_context.StudentInfo.Where(e => e.Email == login.EmailAddress && e.Password == login.Password);
            // ya pheli entry aaye ya null
            //Student mein database wala saman hai.
            var User = _context.UserInfo.SingleOrDefault(e => e.EmailId == login.EmailId && e.Password == login.Password);
            if (User == null)
            {
                return null;
            }
            user = new UserInfo();
            //UserModel mein ui wala saman hoga
            user.Name = User.Name;
            user.EmailId = User.EmailId;
            user.Password = User.Password;


            return user;
            //Validate the User Credentials
            //Demo Purpose, I have Passed HardCoded User Information
        }

    }
}