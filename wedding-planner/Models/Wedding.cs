using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WeddingPlanner.Validations;

namespace WeddingPlanner.Models {
    public class Wedding {

        [Key]
        public int WeddingId { get; set; }

        [Required (ErrorMessage = "Enter your wedder one")]
        public string WedderOne { get; set; }

        [Required (ErrorMessage = "Enter your wedder two")]
        public string WedderTwo { get; set; }

        [Required (ErrorMessage = "Enter a date")]
        [DataType (DataType.Date)]
        [CurrentDate (ErrorMessage = "Sorry no time travel")]
        public DateTime Date { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Zip { get; set; }

        public string Creator { get; set; }

        public List<Association> Guest { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}