const SUPABASE_URL = "YOUR_EXISTING_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_EXISTING_SUPABASE_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function loadExecutives() {
  const list = document.getElementById("executive-list");

  if (!list) {
    console.error("Executive list not found.");
    return;
  }

  const result = await supabaseClient
    .from("executives")
    .select("*");

  if (result.error) {
    console.error("Supabase error:", result.error);

    list.innerHTML =
      "<div class='card'>" +
      "<h3>Unable to load executives</h3>" +
      "<p>" + result.error.message + "</p>" +
      "</div>";

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (executive) {
    const card = document.createElement("div");
    card.className = "card";

    let photoHTML = "";

    if (executive.photo_url) {
      photoHTML =
        "<img src='" +
        executive.photo_url +
        "' alt='" +
        (executive.full_name || "Executive") +
        "' style='width:120px;height:120px;object-fit:cover;border-radius:50%;display:block;margin-bottom:20px;'>";
    }

    card.innerHTML =
      photoHTML +
      "<h3>" +
      (executive.position || "Executive") +
      "</h3>" +
      "<p><strong>" +
      (executive.full_name || "") +
      "</strong></p>" +
      (executive.department
        ? "<p>Department: " +
          executive.department +
          "</p>"
        : "") +
      (executive.level
        ? "<p>Level: " +
          executive.level +
          "</p>"
        : "");

    list.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadExecutives();
});
