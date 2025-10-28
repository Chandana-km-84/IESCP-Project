using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IESCP.Models
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }

        [Required]
        [ForeignKey("AdRequest")]
        public int AdRequestId { get; set; }
        public virtual AdRequest AdRequest { get; set; }

        [Required]
        [ForeignKey("Influencer")]
        public int InfluencerId { get; set; }
        public virtual Influencer Influencer { get; set; }

        [Required]
        [ForeignKey("Sponsor")]
        public int SponsorId { get; set; }
        public virtual Sponsor Sponsor { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }
        [Required]
        public string PaymentMethod { get; set; }

        public string TransactionId { get; set; }
    }
}
