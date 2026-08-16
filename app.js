const SUPABASE_URL = "https://tydgxkpvklakqgtctwnj.supabase.co";
const SUPABASE_KEY = "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mA";

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
      "<h3>Supabase Error</h3>" +
      "<p>" +
      (result.error.message || "Unable to load executive records.") +
      "</p>" +
      "<p>Code: " +
      (result.error.code || "N/A") +
      "</p>" +
      "</div>";

    return;
  }

  list.innerHTML = "";

  if (!result.data || result.data.length === 0) {
    list.innerHTML =
      "<div class='card'>" +
      "<h3>No executives found</h3>" +
      "<p>No executive records have been added yet.</p>" +
      "</div>";

    return;
  }

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
