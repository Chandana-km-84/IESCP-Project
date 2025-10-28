using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IESCP.Models
{
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RatingId { get; set; }
        [Required]
        [ForeignKey("Sponsor")]
        public int SponsorId { get; set; }
        public virtual Sponsor Sponsor { get; set; }

        [Required]
        [ForeignKey("Influencer")]
        public int InfluencerId { get; set; }
        public virtual Influencer Influencer{ get; set; }

        [Required]
        [Range(1, 5)]
        public int RatingValue { get; set; }

        public string Comment { get; set; }
    }
}
