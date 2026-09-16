/* =========================================
   NAOSS UNILORIN DIGITAL ARCHIVE
   PUBLIC APP
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
   LOAD PROGRAMMES
   ========================================= */

async function loadProgrammes() {
  const section = document.getElementById("programme-list");

  if (!section) {
    return;
  }

  section.innerHTML =
    "<div class='empty-state'>" +
    "<p>Loading programmes and activities...</p>" +
    "</div>";

  const result = await supabaseClient
    .from("programmes")
    .select("*")
    .order("programme_date", { ascending: false });

  if (result.error) {
    console.error("Programme error:", result.error);

    showEmpty(
      section,
      "Unable to load programmes."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      section,
      "No programmes have been archived yet."
    );

    return;
  }

  section.innerHTML = "";

  result.data.forEach(function (programme) {
    const card = document.createElement("div");

    card.className = "card programme-card";

    let dateHTML = "";

    if (programme.programme_date) {
      dateHTML =
        "<p><strong>Date:</strong> " +
        formatDate(programme.programme_date) +
        "</p>";
    }

    let venueHTML = "";

    if (programme.venue) {
      venueHTML =
        "<p><strong>Venue:</strong> " +
        escapeHTML(programme.venue) +
        "</p>";
    }

    let themeHTML = "";

    if (programme.theme) {
      themeHTML =
        "<p><strong>Theme:</strong> " +
        escapeHTML(programme.theme) +
        "</p>";
    }

    let objectiveHTML = "";

    if (programme.objectives) {
      objectiveHTML =
        "<p><strong>Objectives:</strong> " +
        escapeHTML(programme.objectives) +
        "</p>";
    }

    let reportHTML = "";

    if (programme.report) {
      reportHTML =
        "<p><strong>Report:</strong> " +
        escapeHTML(programme.report) +
        "</p>";
    }

    let outcomeHTML = "";

    if (programme.outcome) {
      outcomeHTML =
        "<p><strong>Outcome:</strong> " +
        escapeHTML(programme.outcome) +
        "</p>";
    }

    card.innerHTML =
      "<h3>" +
      escapeHTML(
        programme.title || "NAOSS Programme"
      ) +
      "</h3>" +

      themeHTML +
      dateHTML +
      venueHTML +
      objectiveHTML +
      reportHTML +
      outcomeHTML;

    section.appendChild(card);
  });
}


/* =========================================
   LOAD DOCUMENTS
   ========================================= */

async function loadDocuments() {
  const section = document.getElementById("document-list");

  if (!section) {
    return;
  }

  section.innerHTML =
    "<div class='empty-state'>" +
    "<p>Loading documents...</p>" +
    "</div>";

  const result = await supabaseClient
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (result.error) {
    console.error("Document error:", result.error);

    showEmpty(
      section,
      "Unable to load archived documents."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      section,
      "No documents have been archived yet."
    );

    return;
  }

  section.innerHTML = "";

  result.data.forEach(function (documentRecord) {
    const card = document.createElement("div");

    card.className = "card document-card";

    let typeHTML = "";

    if (documentRecord.document_type) {
      typeHTML =
        "<p><strong>Type:</strong> " +
        escapeHTML(documentRecord.document_type) +
        "</p>";
    }

    let descriptionHTML = "";

    if (documentRecord.description) {
      descriptionHTML =
        "<p>" +
        escapeHTML(documentRecord.description) +
        "</p>";
    }

    let linkHTML = "";

    if (documentRecord.file_url) {
      linkHTML =
        "<p>" +
        "<a href='" +
        escapeHTML(documentRecord.file_url) +
        "' target='_blank' rel='noopener noreferrer'>" +
        "View Document" +
        "</a>" +
        "</p>";
    }

    card.innerHTML =
      "<h3>" +
      escapeHTML(
        documentRecord.title ||
        "Official Document"
      ) +
      "</h3>" +

      typeHTML +
      descriptionHTML +
      linkHTML;

    section.appendChild(card);
  });
}


/* =========================================
   LOAD CURRENT ADMINISTRATION
   ========================================= */

async function loadAdministrations() {
  const list = document.getElementById(
    "administration-list"
  );

  if (!list) {
    return;
  }

  list.innerHTML =
    "<div class='empty-state'>" +
    "<p>Loading current administration...</p>" +
    "</div>";

  const result = await supabaseClient
    .from("administrations")
    .select("*")
    .eq("session", "2026/2027")
    .order("created_at", { ascending: false });

  if (result.error) {
    console.error(
      "Administration error:",
      result.error
    );

    showEmpty(
      list,
      "Unable to load the current administration."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      list,
      "No current administration has been added yet."
    );

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (administration) {
    const card = document.createElement("div");

    card.className = "card admin-card";

    card.innerHTML =
      "<h3>" +
      escapeHTML(
        administration.name ||
        "NAOSS Administration"
      ) +
      "</h3>" +

      (administration.session
        ? "<p><strong>Session:</strong> " +
          escapeHTML(administration.session) +
          "</p>"
        : "") +

      (administration.president
        ? "<p><strong>President:</strong> " +
          escapeHTML(administration.president) +
          "</p>"
        : "") +

      (administration.general_secretary
        ? "<p><strong>General Secretary:</strong> " +
          escapeHTML(
            administration.general_secretary
          ) +
          "</p>"
        : "") +

      (administration.description
        ? "<p>" +
          escapeHTML(
            administration.description
          ) +
          "</p>"
        : "");

    list.appendChild(card);
  });
}


/* =========================================
   LOAD NAOSS HISTORY
   ========================================= */

async function loadHistory() {
  const list = document.getElementById(
    "history-list"
  );

  if (!list) {
    return;
  }

  list.innerHTML =
    "<div class='empty-state'>" +
    "<p>Loading NAOSS history...</p>" +
    "</div>";

  const result = await supabaseClient
    .from("administrations")
    .select("*")
    .order("created_at", { ascending: true });

  if (result.error) {
    console.error(
      "History error:",
      result.error
    );

    showEmpty(
      list,
      "Unable to load NAOSS history."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      list,
      "No historical administrations have been added yet."
    );

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (administration) {
    const card = document.createElement("div");

    card.className = "card history-card";

    card.innerHTML =
      "<h3>" +
      escapeHTML(
        administration.name ||
        "NAOSS Administration"
      ) +
      "</h3>" +

      (administration.session
        ? "<p><strong>Session:</strong> " +
          escapeHTML(administration.session) +
          "</p>"
        : "") +

      (administration.president
        ? "<p><strong>President:</strong> " +
          escapeHTML(administration.president) +
          "</p>"
        : "") +

      (administration.general_secretary
        ? "<p><strong>General Secretary:</strong> " +
          escapeHTML(
            administration.general_secretary
          ) +
          "</p>"
        : "") +

      (administration.description
        ? "<p>" +
          escapeHTML(
            administration.description
          ) +
          "</p>"
        : "");

    list.appendChild(card);
  });
}


/* =========================================
   LOAD COMPLETE ARCHIVE
   ========================================= */

async function loadArchive() {

  await Promise.all([
    loadExecutives(),
    loadProgrammes(),
    loadDocuments(),
    loadAdministrations(),
    loadHistory()
  ]);

}


/* =========================================
   START WEBSITE
   ========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadArchive();
  }
);


/* =========================================
   REFRESH WHEN PAGE BECOMES VISIBLE
   ========================================= */

document.addEventListener(
  "visibilitychange",
  function () {

    if (
      document.visibilityState === "visible"
    ) {
      loadArchive();
    }

  }
);


/* =========================================
   ERROR HANDLING
   ========================================= */

window.addEventListener(
  "error",
  function (event) {

    console.error(
      "NAOSS Archive Error:",
      event.error || event.message
    );

  }
);
