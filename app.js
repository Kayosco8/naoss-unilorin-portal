document.addEventListener("DOMContentLoaded", function () {
  console.log("NAOSS Unilorin Digital Archive loaded successfully.");

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      console.log("Navigation:", link.textContent);
    });
  });
});
