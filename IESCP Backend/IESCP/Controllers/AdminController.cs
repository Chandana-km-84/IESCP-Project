using IESCP.Data;
using IESCP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using IESCP.Helper;
using IESCP.Models.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace IESCP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<AdminController> _logger;

        public AdminController(ApplicationDbContext context, IConfiguration config,ILogger<AdminController> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginAdminModel model)
        {
            try
            {
                var admin = _context.Users.SingleOrDefault(u => u.Email == model.Email && u.Password == model.Password && u.Role == UserRole.Admin);
                _logger.LogInformation("Admin login attempt with email: {email}", model.Email);

                if (admin == null)
                {
                    return Unauthorized("Invalid email or password.");
                }


                var otp = GenerateOtp();
                await SendOtpEmail(admin.Email, otp);

                HttpContext.Session.SetString("AdminOtp", otp);
                HttpContext.Session.SetString("AdminEmail", admin.Email);

                return Ok("OTP sent to email.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while logging in admin.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("verifyOtp")]
        public IActionResult VerifyOtp([FromBody] VerifyOTPModel model)
        {
            var storedOtp = HttpContext.Session.GetString("AdminOtp");
            var storedEmail = HttpContext.Session.GetString("AdminEmail");

            if (storedOtp == null || storedOtp != model.Otp || storedEmail != model.Email)
            {
                return Unauthorized("Invalid OTP.");
            }

           
            var token = JwtTokenGenerator.GenerateToken(
                model.Email,
                _config["Jwt:Key"],
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                UserRole.Admin.ToString()
            );

            return Ok(new { Token = token });
        }

        private string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }
        
        private async Task SendOtpEmail(string email, string otp)
        {
            var smtpClient = new SmtpClient(_config["Smtp:Host"])
            {
                Port = int.Parse(_config["Smtp:Port"]),
                Credentials = new NetworkCredential(_config["Smtp:Username"], _config["Smtp:Password"]),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_config["Smtp:From"]),
                Subject = "Your OTP Code",
                Body = $"Your OTP code is {otp}",
                IsBodyHtml = false,
            };
            mailMessage.To.Add(email);

            await smtpClient.SendMailAsync(mailMessage);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("flagUser/{userId}")]
        public IActionResult FlagUser(int userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.IsFlagged = true;
            _context.SaveChanges();

            return Ok("User flagged.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("unflagUser/{userId}")]
        public IActionResult UnflagUser(int userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.IsFlagged = false;
            _context.SaveChanges();

            return Ok("User unflagged.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("flagCampaign/{campaignId}")]
        public IActionResult FlagCampaign(int campaignId)
        {
            var campaign = _context.Campaigns.Find(campaignId);
            if (campaign == null)
            {
                return NotFound("Campaign not found.");
            }

            campaign.IsFlagged = true;
            _context.SaveChanges();

            return Ok("Campaign flagged.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("unflagCampaign/{campaignId}")]
        public IActionResult UnflagCampaign(int campaignId)
        {
            var campaign = _context.Campaigns.Find(campaignId);
            if (campaign == null)
            {
                return NotFound("Campaign not found.");
            }

            campaign.IsFlagged = false;
            _context.SaveChanges();

            return Ok("Campaign unflagged.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("flagAdRequest/{adRequestId}")]
        public IActionResult FlagAdRequest(int adRequestId)
        {
            var adRequest = _context.AdRequests.Find(adRequestId);
            if (adRequest == null)
            {
                return NotFound("Ad request not found.");
            }

            adRequest.IsFlagged = true;
            _context.SaveChanges();

            return Ok("Ad request flagged.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("unflagAdRequest/{adRequestId}")]
        public IActionResult UnflagAdRequest(int adRequestId)
        {
            var adRequest = _context.AdRequests.Find(adRequestId);
            if (adRequest == null)
            {
                return NotFound("Ad request not found.");
            }

            adRequest.IsFlagged = false;
            _context.SaveChanges();

            return Ok("Ad request unflagged.");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getUnapprovedSponsors")]
        public IActionResult GetUnapprovedSponsors()
        {
            var sponsors = _context.Sponsors.Where(s => s.IsApproved == false).ToList();
            return Ok(sponsors);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("approveSponsor/{sponsorId}")]
        public IActionResult ApproveSponsor(int sponsorId)
        {
            var sponsor = _context.Sponsors.Find(sponsorId);
            if (sponsor == null)
            {
                return NotFound("Sponsor not found.");
            }

            sponsor.IsApproved = true;
            _context.SaveChanges();

            return Ok("Sponsor approved.");
        }
    }
}
