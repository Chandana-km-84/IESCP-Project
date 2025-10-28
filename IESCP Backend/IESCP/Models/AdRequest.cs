using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IESCP.Models
{
    public class AdRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AdId { get; set; }
        [Required]
        public string AdName { get; set; }
        [Required]
        public string AdDescription { get; set; }
       
        [Required]
        public double Amount { get; set; }

        [ForeignKey("Influencers")]
        public int? InfluencerId { get; set; }

        public virtual Influencer Influencer { get; set; }

        [Required]
        [DefaultValue("Pending")]
        public string Status { get; set; }
       
      
        [ForeignKey("CampaignId")]
        public int CampaignId { get; set; }

        public virtual Campaign Campaign { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsFlagged { get; set; }
    }
}
