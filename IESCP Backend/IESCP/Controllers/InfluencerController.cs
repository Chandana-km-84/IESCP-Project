using IESCP.Models.Authentication;
using IESCP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IESCP.Data;
using Microsoft.AspNetCore.Authorization;
using IESCP.Models.InfuencerDashboard;
using IESCP.Helper;
using Microsoft.Extensions.Logging;

namespace IESCP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfluencerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<InfluencerController> _logger;

        public InfluencerController(ApplicationDbContext context, IConfiguration config, ILogger<InfluencerController> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterInfluencerModel model)
        {
            try
            {
                var existingUser = _context.Users.SingleOrDefault(u => u.UserName == model.UserName);
                _logger.LogInformation("Influencer registration attempt with username: {username}", model.UserName);
                if (existingUser != null)
                {
                    return BadRequest("Username already exists.");
                }

                var influencer = new Influencer
                {
                    UserName = model.UserName,
                    Password = model.Password,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    InfluencerName = model.InfluencerName,
                    Category = model.Category,
                    Niche = model.Niche,
                    Reach = model.Reach,
                    ProfilePictureUrl = model.ProfilePictureUrl,
                    IsFlagged = false,
                    Role = UserRole.Influencer

                };

                _context.Influencers.Add(influencer);
                _context.SaveChanges();

                return Ok("Influencer registered successfully.");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while registering influencer.");
                return StatusCode(500, "Internal server error.");
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginInfluencerModel login)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(u => u.UserName == login.UserName && u.Password == login.Password);
                _logger.LogInformation("Influencer login attempt with username: {username}", login.UserName);   

                if (user == null)
                {
                    return Unauthorized("Invalid username or password.");
                }
                if (user.IsFlagged)
                {
                    return Unauthorized("User Blocked");
                }
                var influencer = _context.Influencers.SingleOrDefault(i => i.UserId == user.UserId);
                if (influencer == null)
                {
                    return Unauthorized("User is not an Influencer.");
                }
                var token = JwtTokenGenerator.GenerateToken(
                       login.UserName,
                       _config["Jwt:Key"],
                       _config["Jwt:Issuer"],
                       _config["Jwt:Audience"],
                       UserRole.Influencer.ToString()
                       );
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while logging in influencer.");
                return StatusCode(500, "Internal server error.");
            }
        }


        [Authorize(Roles = "Influencer")]
        [HttpGet]
        public IActionResult Dashboard()
        {
            _logger.LogInformation("Influencer Dashboard Accessed");
            return Ok("Authorise User Logged In");
        }

        [Authorize(Roles = "Influencer")]
        [HttpGet("pending-adrequests")]
        public async Task<IActionResult> GetPendingAdRequests()
        {
            try
            {
                var pendingAdRequests = await _context.AdRequests
                    .Where(ar => ar.Status == "Pending")
                    .Select(ar => new
                    {
                        ar.AdId,
                        ar.AdName,
                        ar.AdDescription,
                        ar.Amount,
                        ar.Status,
                        CampaignName = ar.Campaign.CampaignName,
                        InfluencerName = ar.Influencer != null ? ar.Influencer.UserName : null
                    })
                    .ToListAsync();

                if (pendingAdRequests.Count == 0)
                {
                    _logger.LogInformation("No pending ad requests found.");
                    return Ok("No pending ad requests found.");
                }

                return Ok(pendingAdRequests);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching pending ad requests.");
                return StatusCode(500, "Internal server error.");
            }
        }



        [Authorize(Roles = "Influencer")]
        [HttpPost("updateStatus")]
        public IActionResult UpdateAdStatus([FromBody] UpdateAdStatusModel model)
        {
            try
            {
                var userName = User.Identity?.Name;
                _logger.LogInformation("Influencer {username} updating ad status.", userName);

                var user = _context.Users.SingleOrDefault(u => u.UserName == userName);
                if (user == null || user.Role != UserRole.Influencer)
                {
                    return Unauthorized("User is not an Influencer.");
                }

                var request = _context.AdRequests.SingleOrDefault(b => b.AdId == model.AdId);
                if (request == null)
                {
                    return BadRequest("Ad request not found.");
                }

                if (model.Status != "Accepted" && model.Status != "Rejected")
                {
                    return BadRequest("Invalid status.");
                }

                request.Status = model.Status;
                request.InfluencerId = user.UserId;
                _context.SaveChanges();

                return Ok($"Request {model.Status.ToLower()} successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating ad status.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [Authorize(Roles = "Influencer")]
        [HttpPut("edit-Profile")]
        public async Task<IActionResult> EditInfluencerDetails([FromBody] RegisterInfluencerModel model)
        {
            try
            {
                var userName = User.Identity?.Name;
                var influencer = _context.Influencers.SingleOrDefault(i => i.UserName == userName);
                _logger.LogInformation("Influencer {username} updating details.", userName);
                if (influencer == null)
                {
                    return NotFound("Influencer not found.");
                }

                influencer.Email = model.Email;
                influencer.PhoneNumber = model.PhoneNumber;
                influencer.InfluencerName = model.InfluencerName;
                influencer.Category = model.Category;
                influencer.Niche = model.Niche;
                influencer.Reach = model.Reach;

                _context.Influencers.Update(influencer);
                await _context.SaveChangesAsync();

                return Ok("Influencer details updated successfully.");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating influencer details.");
                return StatusCode(500, "Internal server error.");
            }
    }

    [Authorize(Roles = "Influencer")]
        [HttpGet("search-campaigns")]
        public async Task<IActionResult> SearchCampaigns([FromQuery] string keyword)
        {
            try
            {
                var campaigns = await _context.Campaigns
                    .Where(c => c.CampaignName.Contains(keyword) || c.Description.Contains(keyword))
                    .ToListAsync();

                return Ok(campaigns);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while searching campaigns.");
                return StatusCode(500, "Internal server error.");
            }
        }

    }
}



