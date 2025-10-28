using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IESCP.Models
{
    public class Influencer: User
    {

        [Required]
        public string InfluencerName { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Niche { get; set; }

        [Required]
        public int Reach { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public int FollowersCount { get; set; }

        [Required]
        public string InstaId { get; set; }

    }
}
