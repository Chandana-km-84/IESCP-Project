using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.SponsorDashboard
{
    public class RateInfluencerModel
    {
        [Required]
        public int AdRequestId { get; set; }
        [Required]
        [Range(1, 5)]
        public int RatingValue { get; set; }
        public string Comment { get; set; }
    }

}
