// BUS BOOKING WEBSITE - JAVASCRIPT

const $ = (id) => document.getElementById(id);

// Set today's date as the minimum journey date
const dateInput = $("journeyDate");

if (dateInput) {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  dateInput.min = localDate;
}

// HOME PAGE: Search bus
const searchForm = $("searchForm");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const from = $("fromCity").value;
    const to = $("toCity").value;
    const date = $("journeyDate").value;

    if (from === to) {
      alert("Please select two different cities.");
      return;
    }

    localStorage.setItem("busFrom", from);
    localStorage.setItem("busTo", to);
    localStorage.setItem("busDate", date);

    window.location.href = "booking.html";
  });
}

// BOOKING PAGE: Create seats
const seatGrid = $("seatGrid");

if (seatGrid) {
  const bookedSeats = [4, 8, 17, 22];
  const selectedSeats = new Set();

  for (let number = 1; number <= 24; number++) {
    const seat = document.createElement("button");

    seat.type = "button";
    seat.className = "seat";
    seat.textContent = number;

    if (bookedSeats.includes(number)) {
      seat.classList.add("booked");
      seat.disabled = true;
      seat.title = "Already booked";
    } else {
      seat.addEventListener("click", function () {
        if (selectedSeats.has(number)) {
          selectedSeats.delete(number);
          seat.classList.remove("selected");
        } else {
          selectedSeats.add(number);
          seat.classList.add("selected");
        }

        const total = selectedSeats.size * 650;

        $("seatCount").textContent = selectedSeats.size;
        $("totalPrice").textContent = "₹" + total;

        const seats = [...selectedSeats]
          .sort((a, b) => a - b)
          .join(",");

        localStorage.setItem("busSeats", seats);
        localStorage.setItem("busFare", total);
      });
    }

    seatGrid.appendChild(seat);
  }

  $("bookingFrom").textContent =
    localStorage.getItem("busFrom") || "Ahmedabad";

  $("bookingTo").textContent =
    localStorage.getItem("busTo") || "Mumbai";

  $("bookingDate").textContent =
    localStorage.getItem("busDate") || "Not selected";

  $("continueBooking").addEventListener("click", function () {
    if (selectedSeats.size === 0) {
      alert("Please select at least one seat.");
      return;
    }

    window.location.href = "receipt.html";
  });
}

// RECEIPT PAGE: Display booking details
if ($("receiptFrom")) {
  $("receiptFrom").textContent =
    localStorage.getItem("busFrom") || "Ahmedabad";

  $("receiptTo").textContent =
    localStorage.getItem("busTo") || "Mumbai";

  $("receiptDate").textContent =
    localStorage.getItem("busDate") || "Not selected";

  $("receiptSeats").textContent =
    localStorage.getItem("busSeats") || "Not selected";

  $("receiptFare").textContent =
    "₹" + (localStorage.getItem("busFare") || "0");

  $("bookingNumber").textContent =
    "BB" + Math.floor(100000 + Math.random() * 900000);

  const passengerName = $("passengerName");

  passengerName.value =
    localStorage.getItem("passengerName") || "";

  passengerName.addEventListener("input", function () {
    localStorage.setItem("passengerName", this.value);
  });
}

// CONTACT PAGE: Demo contact form
const contactForm = $("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    $("contactMessage").textContent =
      "Thank you! Your demo message has been submitted.";

    contactForm.reset();
  });
}