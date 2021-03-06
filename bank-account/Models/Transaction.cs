using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankAccount.Models {
    public class Transaction {

        [Key]
        public int TransactionId { get; set; }

        [Required(ErrorMessage = "Where da money at?")]
        public decimal Amount { get; set; }

        public int UserId { get; set; }

        public User Owner { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}