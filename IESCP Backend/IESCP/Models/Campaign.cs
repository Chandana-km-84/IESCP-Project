using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IESCP.Models
{
    public class Campaign
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CampaignId { get; set; }

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

        
        [ForeignKey("Sponsors")]
        public int SponsorId { get; set; }

        public virtual Sponsor Sponsor { get; set; }

        public virtual ICollection<AdRequest> AdRequests { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsFlagged { get; set; }

       
    }
}
