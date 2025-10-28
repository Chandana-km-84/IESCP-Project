using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.SponsorDashboard
{
    public class CreateAdRequestModel
    {
        
        [Required]
        public string AdName { get; set; }
        [Required]
        public string AdDescription { get; set; }

        [Required]
        public double Amount { get; set; }

        public int CampaignId { get; set; }
        
    }
}
