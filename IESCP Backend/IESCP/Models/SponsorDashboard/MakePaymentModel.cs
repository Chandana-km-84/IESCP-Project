using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.SponsorDashboard
{
    public class MakePaymentModel
    {
        [Required]
        public int AdRequestId { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public string PaymentMethod { get; set; }
        public string TransactionId { get; set; }
    }

}
