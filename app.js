/* =========================================
   NAOSS UNILORIN DIGITAL ARCHIVE
   PUBLIC APP
   ========================================= */
document.body.insertAdjacentHTML(
  "afterbegin",
  "<div style='background:#fff3cd;color:#664d03;padding:12px;text-align:center;font-weight:bold;'>NAOSS JavaScript is running</div>"
);

if (!window.supabase) {
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<div style='background:#f8d7da;color:#842029;padding:12px;text-align:center;font-weight:bold;'>ERROR: Supabase library did not load.</div>"
  );

  throw new Error("Supabase library did not load.");
}

const SUPABASE_URL =
  "https://tydgxkpvklakqgtctwnj.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mQ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
console.log("NAOSS App.js loaded");
console.log("Supabase library:", window.supabase);
console.log("Supabase client:", supabaseClient);
document.body.insertAdjacentHTML(
  "afterbegin",
  "<div style='background:#fff3cd;color:#664d03;padding:12px;text-align:center;font-weight:bold;'>NAOSS App.js is running</div>"
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
/* LOAD MEETINGS */

async function loadMeetings() {
  const list = document.getElementById("meeting-list");

  if (!list) {
    return;
  }

  list.innerHTML =
    "<div class='empty-state'><p>Loading meetings and minutes...</p></div>";

  const result = await supabaseClient
    .from("meetings")
    .select("*")
    .order("meeting_date", { ascending: false });

  if (result.error) {
    console.error("Meeting error:", result.error);

    showEmpty(
      list,
      "Unable to load meetings and minutes."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      list,
      "No meeting records have been archived yet."
    );

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (meeting) {
    const card = document.createElement("div");

    card.className = "card meeting-card";

    card.innerHTML =
      "<h3>" +
      escapeHTML(meeting.title || "NAOSS Meeting") +
      "</h3>" +

      (meeting.meeting_date
        ? "<p><strong>Date:</strong> " +
          formatDate(meeting.meeting_date) +
          "</p>"
        : "") +

      (meeting.meet_time
        ? "<p><strong>Time:</strong> " +
          escapeHTML(meeting.meet_time) +
          "</p>"
        : "") +

      (meeting.venue
        ? "<p><strong>Venue:</strong> " +
          escapeHTML(meeting.venue) +
          "</p>"
        : "") +

      (meeting.agenda
        ? "<p><strong>Agenda:</strong> " +
          escapeHTML(meeting.agenda) +
          "</p>"
        : "") +

      (meeting.minutes
        ? "<p><strong>Minutes:</strong> " +
          escapeHTML(meeting.minutes) +
          "</p>"
        : "");

    list.appendChild(card);
  });
}


/* LOAD HANDOVER RECORDS */

async function loadHandoverRecords() {
  const list = document.getElementById("handover-list");

  if (!list) {
    return;
  }

  list.innerHTML =
    "<div class='empty-state'><p>Loading handover records...</p></div>";

  const result = await supabaseClient
    .from("handover_records")
    .select("*")
    .order("created", { ascending: false });

  if (result.error) {
    console.error("Handover error:", result.error);

    showEmpty(
      list,
      "Unable to load handover records."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      list,
      "No handover records have been archived yet."
    );

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (handover) {
    const card = document.createElement("div");

    card.className = "card handover-card";

    let fileHTML = "";

    if (handover.file_url) {
      fileHTML =
        "<p><a href='" +
        escapeHTML(handover.file_url) +
        "' target='_blank' rel='noopener noreferrer'>" +
        "View Handover Document" +
        "</a></p>";
    }

    card.innerHTML =
      "<h3>Handover Record</h3>" +

      (handover.status
        ? "<p><strong>Status:</strong> " +
          escapeHTML(handover.status) +
          "</p>"
        : "") +

      (handover.description
        ? "<p><strong>Details:</strong> " +
          escapeHTML(handover.description) +
          "</p>"
        : "") +

      fileHTML;

    list.appendChild(card);
  });
}


/* LOAD REPORTS */

async function loadReports() {
  const list = document.getElementById("report-list");

  if (!list) {
    return;
  }

  list.innerHTML =
    "<div class='empty-state'><p>Loading reports...</p></div>";

  const result = await supabaseClient
    .from("reports")
    .select("*")
    .order("report_date", { ascending: false });

  if (result.error) {
    console.error("Report error:", result.error);

    showEmpty(
      list,
      "Unable to load reports."
    );

    return;
  }

  if (!result.data || result.data.length === 0) {
    showEmpty(
      list,
      "No reports have been archived yet."
    );

    return;
  }

  list.innerHTML = "";

  result.data.forEach(function (report) {
    const card = document.createElement("div");

    card.className = "card report-card";

    let fileHTML = "";

    if (report.file_url) {
      fileHTML =
        "<p><a href='" +
        escapeHTML(report.file_url) +
        "' target='_blank' rel='noopener noreferrer'>" +
        "View Report File" +
        "</a></p>";
    }

    card.innerHTML =
      "<h3>" +
      escapeHTML(report.title || "NAOSS Report") +
      "</h3>" +

      (report.report_type
        ? "<p><strong>Type:</strong> " +
          escapeHTML(report.report_type) +
          "</p>"
        : "") +

      (report.report_date
        ? "<p><strong>Date:</strong> " +
          formatDate(report.report_date) +
          "</p>"
        : "") +

      (report.content
        ? "<p><strong>Report:</strong> " +
          escapeHTML(report.content) +
          "</p>"
        : "") +

      fileHTML;

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
    loadHistory(),
    loadMeetings(),
    loadHandoverRecords(),
    loadReports()
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
