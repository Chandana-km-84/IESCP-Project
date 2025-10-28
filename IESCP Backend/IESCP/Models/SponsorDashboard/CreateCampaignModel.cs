using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.SponsorDashboard
{
    public class CreateCampaignModel
    {
        [Required]
        public string CampaignName { get; set; }

        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime Start_date { get; set; }
        [Required]
        public DateTime End_date { get; set; }
        [Required]
        public int Budget { get; set; }
        [Required]
        public string Visibility { get; set; }
        [Required]
        public string CompNiche { get; set; }
        [Required]
        public string Goals { get; set; }
    }
}
