/* =========================================
   NAOSS UNILORIN DIGITAL ARCHIVE
   PUBLIC APP — GROUP 1
   ========================================= */

const SUPABASE_URL =
  "https://tydgxkpvklakqgtctwnj.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mQ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =========================================
   HELPER FUNCTIONS
   ========================================= */

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return escapeHTML(dateValue);
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


function showEmpty(container, message) {
  container.innerHTML =
    "<div class='empty-state'>" +
    "<p>" +
    escapeHTML(message) +
    "</p>" +
    "</div>";
}


/* =========================================
   LOAD EXECUTIVES
   ========================================= */

async function loadExecutives() {
  const list = document.getElementById("executive-list");

  if (!list) {
    return;
  }

  list.innerHTML =
    "<div class='empty-state'>" +
    "<p>Loading executive council...</p>" +
    "</div>";

  const result = await supabaseClient
    .from("executives")
    .select("*")
    .order("position", { ascending: true });

  if (result.error) {
    console.error("Executive error:", result.error);

    showEmpty(
      list,
      "Unable to load the Executive Council."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      list,
      "No executive records have been added yet."
    );

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (executive) {
    const card = document.createElement("div");

    card.className = "card executive-card";

    let photoHTML = "";

    if (executive.photo_url) {
      photoHTML =
        "<img src='" +
        escapeHTML(executive.photo_url) +
        "' alt='" +
        escapeHTML(
          executive.full_name || "NAOSS Executive"
        ) +
        "'>";
    }

    card.innerHTML =
      photoHTML +

      "<h3>" +
      escapeHTML(
        executive.position || "Executive"
      ) +
      "</h3>" +

      "<p><strong>" +
      escapeHTML(
        executive.full_name || "Name unavailable"
      ) +
      "</strong></p>" +

      (executive.department
        ? "<p><strong>Department:</strong> " +
          escapeHTML(executive.department) +
          "</p>"
        : "") +

      (executive.level
        ? "<p><strong>Level:</strong> " +
          escapeHTML(executive.level) +
          "</p>"
        : "");

    list.appendChild(card);
  });
}


/* =========================================
   END OF GROUP 1
   ========================================= */
