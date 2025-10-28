using IESCP.Data;
using IESCP.Models.Authentication;
using IESCP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using IESCP.Models.SponsorDashboard;
using Microsoft.EntityFrameworkCore;
using IESCP.Helper;

namespace IESCP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<SponsorController> _logger;


        public SponsorController(ApplicationDbContext context, IConfiguration config,ILogger<SponsorController> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }


        [HttpPost("register")]
        public async Task <IActionResult> Register([FromBody] RegisterSponsorModel model)
        {
            try
            {
                var existingUser = _context.Users.SingleOrDefault(u => u.UserName == model.UserName);
                _logger.LogInformation("Sponsor registration attempt with username: {username}", model.UserName);
                if (existingUser != null)
                {
                    return BadRequest("Username already exists.");
                }


                var sponsor = new Sponsor
                {
                    UserName = model.UserName,
                    Password = model.Password,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    SponsorName = model.SponsorName,
                    Industry = model.Industry,
                    Company = model.Company,
                    ProfilePictureUrl = model.ProfilePictureUrl,
                    IsApproved = false,
                    IsFlagged = false,
                    Role = UserRole.Sponsor
                };

                _context.Sponsors.Add(sponsor);
                _context.SaveChanges();

                return Ok("Sponsor registered successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while registering sponsor.");
                return StatusCode(500, "Internal server error.");
            }
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginSponsorModel login)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(u => u.UserName == login.UserName && u.Password == login.Password);
                _logger.LogInformation("Sponsor login attempt with username: {username}", login.UserName);
                if (user == null)
                {
                    return Unauthorized("Invalid username or password.");
                }
                if (user.IsFlagged)
                {
                    return Unauthorized("User Blocked");
                }
                var sponsor = _context.Sponsors.SingleOrDefault(i => i.UserId == user.UserId);
                if (sponsor == null)
                {
                    return Unauthorized("User is not an Sponsor.");
                }

                if (!sponsor.IsApproved)
                {
                    return Unauthorized("Sponsor account is not approved by admin.");
                }

                var token = JwtTokenGenerator.GenerateToken(
                       login.UserName,
                       _config["Jwt:Key"],
                       _config["Jwt:Issuer"],
                       _config["Jwt:Audience"],
                       UserRole.Sponsor.ToString()
                       );
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while logging in sponsor.");
                return StatusCode(500, "Internal server error.");
            }

          
        }
        [Authorize(Roles = "Sponsor")]
        [HttpGet]
        public IActionResult Dashboard()
        {
            _logger.LogInformation("Sponsor dashboard accessed.");
            return Ok("Authorise User Logged In");
        }

        [Authorize(Roles = "Sponsor")]
        [HttpPost("CreateCampaign")]
        public IActionResult CreateCampaignModel([FromBody] CreateCampaignModel model)
        {
            try
            {
                _logger.LogInformation("Creating campaign.");
                if (model == null || string.IsNullOrEmpty(model.CampaignName))
                {
                    return BadRequest("Invalid Campaign data.");
                }

                var userName = User.Identity?.Name;

                var user = _context.Users.SingleOrDefault(u => u.UserName == userName);
                if (user == null || user.Role != UserRole.Sponsor)
                {
                    return Unauthorized("User is not a Sponsor.");
                }

                var campaign = new Campaign
                {
                    CampaignName = model.CampaignName,
                    Description = model.Description,
                    Start_date = model.Start_date,
                    End_date = model.End_date,
                    Budget = model.Budget,
                    Visibility = model.Visibility,
                    CompNiche = model.CompNiche,
                    Goals = model.Goals,
                    SponsorId = user.UserId
                };

                _context.Campaigns.Add(campaign);
                _context.SaveChanges();

                return Ok("Campaign created successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating campaign.");
                return StatusCode(500, "Internal server error.");
            }
           
        }

    

        
        [Authorize(Roles = "Sponsor")]
        [HttpPost("CreateAdRequest")]

        public IActionResult CreateAdRequestModel([FromBody] CreateAdRequestModel model)
        {
            try
            {
                _logger.LogInformation("Creating ad request.");
                if (model == null || string.IsNullOrEmpty(model.AdName) || model.CampaignId <= 0)
                {
                    return BadRequest("Invalid package data.");
                }
                var userName = User.Identity?.Name;

                var user = _context.Users.SingleOrDefault(u => u.UserName == userName);
                if (user == null || user.Role != UserRole.Sponsor)
                {
                    return Unauthorized("User is not a Sponsor.");
                }

                var campaign = _context.Campaigns.SingleOrDefault(c => c.CampaignId == model.CampaignId && c.SponsorId == user.UserId);
                if (campaign == null)
                {
                    return NotFound("Campaign not found or you are not authorised to add a request to this campaign.");
                }

                var request = new AdRequest
                {
                    AdName = model.AdName,
                    AdDescription = model.AdDescription,
                    Amount = model.Amount,
                    Status = "Pending",
                    CampaignId = model.CampaignId
                };

                _context.AdRequests.Add(request);
                _context.SaveChanges();

                return Ok("AdRequest created successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating ad request.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [Authorize(Roles = "Sponsor")]
        [HttpGet("getAdRequestByCampaignId/{campaignId}")]
        public async Task<IActionResult> GetAdRequestByCampaignId(int campaignId)
        {
            try
            {
                var userName = User.Identity?.Name;
                var sponsor = _context.Sponsors.SingleOrDefault(s => s.UserName == userName);
                _logger.LogInformation("Fetching ad requests for sponsor {username}.", userName);
                if (sponsor == null)
                {
                    return Unauthorized("User is not a Sponsor.");
                }

                var campaign = await _context.Campaigns
                    .Include(c => c.AdRequests)
                    .SingleOrDefaultAsync(c => c.CampaignId == campaignId && c.SponsorId == sponsor.UserId);
                if (campaign == null)
                {
                    return NotFound("Campaign not found or you are not authorized to view this campaign.");
                }

                var adRequests = campaign.AdRequests
                    .Select(ar => new
                    {
                        ar.AdId,
                        ar.AdName,
                        ar.AdDescription,
                        ar.Amount,
                        ar.Status,
                        InfluencerName = ar.InfluencerId.HasValue ? _context.Influencers.SingleOrDefault(i => i.UserId == ar.InfluencerId.Value)?.UserName : null
                    })
                    .ToList();

                if (adRequests.Count == 0)
                {
                    return Ok("No ad requests found for this campaign.");
                }

                return Ok(adRequests);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching ad requests.");
                return StatusCode(500, "Internal server error.");
            }
        }




        [Authorize(Roles = "Sponsor")]
        [HttpPost("makePaymentForAdRequest")]
        public IActionResult MakePaymentForAdRequest([FromBody] MakePaymentModel model)
        {
            try
            {
                _logger.LogInformation("Making payment for ad request.");
                if (model == null || model.Amount <= 0)
                {
                    return BadRequest("Invalid payment data.");
                }

                var userName = User.Identity?.Name;
                var sponsor = _context.Users.SingleOrDefault(u => u.UserName == userName);
                if (sponsor == null || sponsor.Role != UserRole.Sponsor)
                {
                    return Unauthorized("User is not a Sponsor.");
                }

                var adRequest = _context.AdRequests.Include(a => a.Influencer).SingleOrDefault(a => a.AdId == model.AdRequestId && a.Campaign.SponsorId == sponsor.UserId);
                if (adRequest == null || adRequest.Influencer == null)
                {
                    return NotFound("AdRequest or Influencer not found.");
                }

                var payment = new Payment
                {
                    AdRequestId = model.AdRequestId,
                    SponsorId = sponsor.UserId,
                    InfluencerId = adRequest.Influencer.UserId,
                    Amount = model.Amount,
                    PaymentDate = DateTime.UtcNow,
                    PaymentMethod = model.PaymentMethod,
                    TransactionId = model.TransactionId
                };

                _context.Payments.Add(payment);
                _context.SaveChanges();

                return Ok("Payment made successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while making payment.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [Authorize(Roles = "Sponsor")]
        [HttpPost("rateInfluencerForAdRequest")]
        public IActionResult RateInfluencerForAdRequest([FromBody] RateInfluencerModel model)
        {
            try
            {
                _logger.LogInformation("Rating influencer for ad request.");
                if (model == null || model.RatingValue < 1 || model.RatingValue > 5)
                {
                    return BadRequest("Invalid rating data.");
                }

                var userName = User.Identity?.Name;
                var sponsor = _context.Users.SingleOrDefault(u => u.UserName == userName);
                if (sponsor == null || sponsor.Role != UserRole.Sponsor)
                {
                    return Unauthorized("User is not a Sponsor.");
                }

                var adRequest = _context.AdRequests.Include(a => a.Influencer).SingleOrDefault(a => a.AdId == model.AdRequestId && a.Campaign.SponsorId == sponsor.UserId);
                if (adRequest == null || adRequest.Influencer == null)
                {
                    return NotFound("AdRequest or Influencer not found.");
                }

                var rating = new Rating
                {
                    SponsorId = sponsor.UserId,
                    InfluencerId = adRequest.Influencer.UserId,
                    RatingValue = model.RatingValue,
                    Comment = model.Comment
                };

                _context.Ratings.Add(rating);
                _context.SaveChanges();

                return Ok("Rating added successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while rating influencer.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [Authorize(Roles = "Sponsor")]
        [HttpPut("edit-Profile")]
        public async Task<IActionResult> EditSponsorDetails([FromBody] RegisterSponsorModel model)
        {
            try
            {
                var userName = User.Identity?.Name;
                var sponsor = _context.Sponsors.SingleOrDefault(s => s.UserName == userName);
                _logger.LogInformation("Editing sponsor details for sponsor {username}.", userName);
                if (sponsor == null)
                {
                    return NotFound("Sponsor not found.");
                }

                sponsor.Email = model.Email;
                sponsor.PhoneNumber = model.PhoneNumber;
                sponsor.SponsorName = model.SponsorName;
                sponsor.Industry = model.Industry;
                sponsor.Company = model.Company;

                _context.Sponsors.Update(sponsor);
                await _context.SaveChangesAsync();

                return Ok("Sponsor details updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating sponsor details.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [Authorize(Roles = "Sponsor")]
        [HttpPut("edit-campaign/{campaignId}")]
        public async Task<IActionResult> EditCampaign(int campaignId, [FromBody] CreateCampaignModel model)
        {
            try
            {
                var userName = User.Identity?.Name;
                var sponsor = _context.Sponsors.SingleOrDefault(s => s.UserName == userName);
                _logger.LogInformation("Editing campaign for sponsor {username}.", userName);
                if (sponsor == null)
                {
                    return NotFound("Sponsor not found.");
                }

                var campaign = _context.Campaigns.SingleOrDefault(c => c.CampaignId == campaignId && c.SponsorId == sponsor.UserId);
                if (campaign == null)
                {
                    return NotFound("Campaign not found.");
                }

                campaign.CampaignName = model.CampaignName;
                campaign.Description = model.Description;
                campaign.Start_date = model.Start_date;
                campaign.End_date = model.End_date;
                campaign.Budget = model.Budget;
                campaign.Visibility = model.Visibility;
                campaign.CompNiche = model.CompNiche;
                campaign.Goals = model.Goals;

                _context.Campaigns.Update(campaign);
                await _context.SaveChangesAsync();

                return Ok("Campaign updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating campaign.");
                return StatusCode(500, "Internal server error.");
            }

        }

        [Authorize(Roles = "Sponsor")]
        [HttpPut("edit-adrequest/{adRequestId}")]
        public async Task<IActionResult> EditAdRequest(int adRequestId, [FromBody] CreateAdRequestModel model)
        {
            try
            {
                var userName = User.Identity?.Name;
                var sponsor = _context.Sponsors.SingleOrDefault(s => s.UserName == userName);
                _logger.LogInformation("Editing ad request for sponsor {username}.", userName);
                if (sponsor == null)
                {
                    return NotFound("Sponsor not found.");
                }

                var adRequest = _context.AdRequests.Include(a => a.Campaign)
                    .SingleOrDefault(a => a.AdId == adRequestId && a.Campaign.SponsorId == sponsor.UserId);
                if (adRequest == null)
                {
                    return NotFound("Ad request not found.");
                }

                adRequest.AdName = model.AdName;
                adRequest.AdDescription = model.AdDescription;
                adRequest.Amount = model.Amount;

                _context.AdRequests.Update(adRequest);
                await _context.SaveChangesAsync();

                return Ok("Ad request updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating ad request.");
                return StatusCode(500, "Internal server error.");
            }


        }


    }
}
