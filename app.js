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
    "<p>" + (result.error.message || "Unknown error") + "</p>" +
    "<p>Code: " + (result.error.code || "N/A") + "</p>" +
    "</div>";

  return;
}
  list.innerHTML = "";

  result.data.forEach(function (executive) {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML =
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

document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadExecutives();
  }
);
