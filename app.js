const SUPABASE_URL = "https://tydgxkpvklakqgtctwnj.supabase.co";
const SUPABASE_KEY = "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mA";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ===============================
// LOAD EXECUTIVES
// ===============================

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
    console.error("Executive error:", result.error);

    list.innerHTML =
      "<div class='card'>" +
      "<h3>Unable to load executives</h3>" +
      "<p>" + result.error.message + "</p>" +
      "</div>";

    return;
  }

  list.innerHTML = "";

  if (!result.data || result.data.length === 0) {
    list.innerHTML =
      "<div class='card'>" +
      "<h3>No executives found</h3>" +
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


// ===============================
// LOAD PROGRAMMES
// ===============================

async function loadProgrammes() {
  const section = document.getElementById("programme-list");

  if (!section) {
    console.error("Programme list not found.");
    return;
  }

  const result = await supabaseClient
  .from("Programmes")
  .select("*")
  .order("date", { ascending: false });

  if (result.error) {
    console.error("Programme error:", result.error);

    section.innerHTML =
      "<div class='empty-state'>" +
      "<p>Unable to load programmes.</p>" +
      "</div>";

    return;
  }

  section.innerHTML = "";

  if (!result.data || result.data.length === 0) {
    section.innerHTML =
      "<div class='empty-state'>" +
      "<p>No programmes have been added yet.</p>" +
      "</div>";

    return;
  }

  result.data.forEach(function (programme) {
    const card = document.createElement("div");

    card.className = "card";

    let photoHTML = "";

    if (programme.photo_url) {
      photoHTML =
        "<img src='" +
        programme.photo_url +
        "' alt='" +
        (programme.title || "Programme") +
        "' style='width:100%;max-height:250px;object-fit:cover;border-radius:10px;margin-bottom:15px;'>";
    }

    card.innerHTML =
      photoHTML +

      "<h3>" +
      (programme.title || "Programme") +
      "</h3>" +

      (programme.date
        ? "<p><strong>Date:</strong> " +
          programme.date +
          "</p>"
        : "") +

      (programme.Venue
        ? "<p><strong>Venue:</strong> " +
          programme.Venue +
          "</p>"
        : "") +

      (programme.Description
        ? "<p>" +
          programme.Description +
          "</p>"
        : "");

    section.appendChild(card);
  });
}


// ===============================
// START WEBSITE
// ===============================
async function loadAdministrations() {
  const list = document.getElementById("administration-list");

  if (!list) {
    console.error("Administration list not found.");
    return;
  }

  const result = await supabaseClient
    .from("administrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (result.error) {
    console.error("Administration error:", result.error);

    list.innerHTML =
      "<div class='card'>" +
      "<h3>Unable to load administrations</h3>" +
      "<p>" + result.error.message + "</p>" +
      "</div>";

    return;
  }

  list.innerHTML = "";

  if (!result.data || result.data.length === 0) {
    list.innerHTML =
      "<div class='empty-state'>" +
      "<p>No administrations have been added yet.</p>" +
      "</div>";

    return;
  }

  result.data.forEach(function (administration) {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML =
      "<h3>" +
      (administration.name || "Administration") +
      "</h3>" +

      (administration.session
        ? "<p><strong>Session:</strong> " +
          administration.session +
          "</p>"
        : "") +

      (administration.president
        ? "<p><strong>President:</strong> " +
          administration.president +
          "</p>"
        : "") +

      (administration.general_secretary
        ? "<p><strong>General Secretary:</strong> " +
          administration.general_secretary +
          "</p>"
        : "") +

      (administration.description
        ? "<p>" +
          administration.description +
          "</p>"
        : "");

    list.appendChild(card);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  loadExecutives();
  loadProgrammes();
  loadAdministrations();
});
