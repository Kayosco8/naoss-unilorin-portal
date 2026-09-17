/* =========================================
   NAOSS UNILORIN DIGITAL ARCHIVE
   PUBLIC APP
   ========================================= */


/* =========================================
   SUPABASE CONNECTION
   ========================================= */

if (!window.supabase) {
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<div style='background:#f8d7da;color:#842029;padding:12px;text-align:center;font-weight:bold;'>ERROR: Supabase library did not load.</div>"
  );

  throw new Error("Supabase library did not load.");
}


const SUPABASE_URL =
  "https://tydgxkpvklakqgtctwnj.supabase.co";


const SUPABASE_ANON_KEY =
  "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mA";


const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


console.log("NAOSS App.js loaded");
console.log("Supabase client:", supabaseClient);


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


function formatDate(value) {
  if (!value) {
    return "Date not available";
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return escapeHTML(value);
  }

  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


function showEmpty(container, message) {
  if (!container) {
    return;
  }

  container.innerHTML =
    "<p style='padding:15px;'>" +
    escapeHTML(message) +
    "</p>";
}


/* =========================================
   LOAD EXECUTIVES
   ========================================= */

async function loadExecutives() {
  const container =
    document.getElementById("executives-list") ||
    document.getElementById("executives");

  if (!container) {
    console.warn("Executives container not found.");
    return;
  }

  container.innerHTML = "<p>Loading executives...</p>";

  const { data, error } = await supabaseClient
    .from("executives")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Executives error:", error);

    container.innerHTML =
      "<p>Unable to load executives.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No executive records available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (executive) {
      const photo =
        executive.photo_url ||
        "https://via.placeholder.com/300x300?text=NAOSS";

      return `
        <div class="executive-card">

          <img
            src="${escapeHTML(photo)}"
            alt="${escapeHTML(executive.full_name || "Executive")}"
            class="executive-photo"
          >

          <h3>
            ${escapeHTML(executive.full_name)}
          </h3>

          <p>
            <strong>Position:</strong>
            ${escapeHTML(executive.position)}
          </p>

          <p>
            <strong>Department:</strong>
            ${escapeHTML(executive.department)}
          </p>

          <p>
            <strong>Level:</strong>
            ${escapeHTML(executive.level)}
          </p>

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD PROGRAMMES
   ========================================= */

async function loadProgrammes() {
  const container =
    document.getElementById("programmes-list") ||
    document.getElementById("programmes");

  if (!container) {
    console.warn("Programmes container not found.");
    return;
  }

  container.innerHTML = "<p>Loading programmes...</p>";

  const { data, error } = await supabaseClient
    .from("programmes")
    .select("*")
    .order("programme_date", {
      ascending: false
    });

  if (error) {
    console.error("Programmes error:", error);

    container.innerHTML =
      "<p>Unable to load programmes.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No programme records available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (programme) {
      return `
        <div class="programme-card">

          <h3>
            ${escapeHTML(programme.title)}
          </h3>

          ${
            programme.theme
              ? `<p><strong>Theme:</strong> ${escapeHTML(programme.theme)}</p>`
              : ""
          }

          ${
            programme.programme_date
              ? `<p><strong>Date:</strong> ${formatDate(programme.programme_date)}</p>`
              : ""
          }

          ${
            programme.venue
              ? `<p><strong>Venue:</strong> ${escapeHTML(programme.venue)}</p>`
              : ""
          }

          ${
            programme.objectives
              ? `<p><strong>Objectives:</strong> ${escapeHTML(programme.objectives)}</p>`
              : ""
          }

          ${
            programme.report
              ? `<p><strong>Report:</strong> ${escapeHTML(programme.report)}</p>`
              : ""
          }

          ${
            programme.outcome
              ? `<p><strong>Outcome:</strong> ${escapeHTML(programme.outcome)}</p>`
              : ""
          }

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD DOCUMENTS
   ========================================= */

async function loadDocuments() {
  const container =
    document.getElementById("documents-list") ||
    document.getElementById("documents");

  if (!container) {
    console.warn("Documents container not found.");
    return;
  }

  container.innerHTML = "<p>Loading documents...</p>";

  const { data, error } = await supabaseClient
    .from("documents")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    console.error("Documents error:", error);

    container.innerHTML =
      "<p>Unable to load documents.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No documents available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (document) {
      return `
        <div class="document-card">

          <h3>
            ${escapeHTML(document.title)}
          </h3>

          ${
            document.document_type
              ? `<p><strong>Type:</strong> ${escapeHTML(document.document_type)}</p>`
              : ""
          }

          ${
            document.description
              ? `<p>${escapeHTML(document.description)}</p>`
              : ""
          }

          ${
            document.file_url
              ? `
                <p>
                  <a
                    href="${escapeHTML(document.file_url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </p>
              `
              : ""
          }

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD ADMINISTRATIONS
   ========================================= */

async function loadAdministrations() {
  const container =
    document.getElementById("administrations-list") ||
    document.getElementById("administrations");

  if (!container) {
    console.warn("Administrations container not found.");
    return;
  }

  container.innerHTML =
    "<p>Loading administration...</p>";

  const { data, error } = await supabaseClient
    .from("administrations")
    .select("*")
    .eq("session", "2026/2027")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    console.error("Administrations error:", error);

    container.innerHTML =
      "<p>Unable to load administration.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No administration record available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (administration) {
      return `
        <div class="administration-card">

          <h3>
            ${escapeHTML(administration.name)}
          </h3>

          <p>
            <strong>Session:</strong>
            ${escapeHTML(administration.session)}
          </p>

          <p>
            <strong>President:</strong>
            ${escapeHTML(administration.president)}
          </p>

          <p>
            <strong>General Secretary:</strong>
            ${escapeHTML(administration.general_secretary)}
          </p>

          ${
            administration.description
              ? `<p>${escapeHTML(administration.description)}</p>`
              : ""
          }

        </div>
      `;
    })
    .join("");
}
/* =========================================
   LOAD HISTORY
   ========================================= */

async function loadHistory() {
  const container =
    document.getElementById("history-list") ||
    document.getElementById("history");

  if (!container) {
    console.warn("History container not found.");
    return;
  }

  container.innerHTML = "<p>Loading history...</p>";

  const { data, error } = await supabaseClient
    .from("administrations")
    .select("*")
    .order("created_at", {
      ascending: true
    });

  if (error) {
    console.error("History error:", error);

    container.innerHTML =
      "<p>Unable to load history.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No history records available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (administration) {
      return `
        <div class="history-card">

          <h3>
            ${escapeHTML(administration.name)}
          </h3>

          <p>
            <strong>Session:</strong>
            ${escapeHTML(administration.session)}
          </p>

          <p>
            <strong>President:</strong>
            ${escapeHTML(administration.president)}
          </p>

          <p>
            <strong>General Secretary:</strong>
            ${escapeHTML(administration.general_secretary)}
          </p>

          ${
            administration.description
              ? `<p>${escapeHTML(administration.description)}</p>`
              : ""
          }

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD MEETINGS
   ========================================= */

async function loadMeetings() {
  const container =
    document.getElementById("meetings-list") ||
    document.getElementById("meetings");

  if (!container) {
    console.warn("Meetings container not found.");
    return;
  }

  container.innerHTML = "<p>Loading meetings...</p>";

  const { data, error } = await supabaseClient
    .from("meetings")
    .select("*")
    .order("meeting_date", {
      ascending: false
    });

  if (error) {
    console.error("Meetings error:", error);

    container.innerHTML =
      "<p>Unable to load meetings.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No meeting records available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (meeting) {
      return `
        <div class="meeting-card">

          <h3>
            ${escapeHTML(meeting.title)}
          </h3>

          ${
            meeting.meeting_date
              ? `<p><strong>Date:</strong> ${formatDate(meeting.meeting_date)}</p>`
              : ""
          }

          ${
            meeting.meet_time
              ? `<p><strong>Time:</strong> ${escapeHTML(meeting.meet_time)}</p>`
              : ""
          }

          ${
            meeting.venue
              ? `<p><strong>Venue:</strong> ${escapeHTML(meeting.venue)}</p>`
              : ""
          }

          ${
            meeting.agenda
              ? `<p><strong>Agenda:</strong> ${escapeHTML(meeting.agenda)}</p>`
              : ""
          }

          ${
            meeting.minutes
              ? `<p><strong>Minutes:</strong> ${escapeHTML(meeting.minutes)}</p>`
              : ""
          }

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD HANDOVER RECORDS
   ========================================= */

async function loadHandoverRecords() {
  const container =
    document.getElementById("handover-list") ||
    document.getElementById("handover") ||
    document.getElementById("handover-records");

  if (!container) {
    console.warn("Handover container not found.");
    return;
  }

  container.innerHTML =
    "<p>Loading handover records...</p>";

  const { data, error } = await supabaseClient
    .from("handover_records")
    .select("*")
    .order("created", {
      ascending: false
    });

  if (error) {
    console.error("Handover error:", error);

    container.innerHTML =
      "<p>Unable to load handover records.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No handover records available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (handover) {
      return `
        <div class="handover-card">

          ${
            handover.status
              ? `<p><strong>Status:</strong> ${escapeHTML(handover.status)}</p>`
              : ""
          }

          ${
            handover.description
              ? `<p>${escapeHTML(handover.description)}</p>`
              : ""
          }

          ${
            handover.file_url
              ? `
                <p>
                  <a
                    href="${escapeHTML(handover.file_url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Handover Record
                  </a>
                </p>
              `
              : ""
          }

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD REPORTS
   ========================================= */

async function loadReports() {
  const container =
    document.getElementById("reports-list") ||
    document.getElementById("reports");

  if (!container) {
    console.warn("Reports container not found.");
    return;
  }

  container.innerHTML = "<p>Loading reports...</p>";

  const { data, error } = await supabaseClient
    .from("reports")
    .select("*")
    .order("report_date", {
      ascending: false
    });

  if (error) {
    console.error("Reports error:", error);

    container.innerHTML =
      "<p>Unable to load reports.</p>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No reports available."
    );

    return;
  }

  container.innerHTML = data
    .map(function (report) {
      return `
        <div class="report-card">

          <h3>
            ${escapeHTML(report.title)}
          </h3>

          ${
            report.report_type
              ? `<p><strong>Report Type:</strong> ${escapeHTML(report.report_type)}</p>`
              : ""
          }

          ${
            report.report_date
              ? `<p><strong>Date:</strong> ${formatDate(report.report_date)}</p>`
              : ""
          }

          ${
            report.content
              ? `<p>${escapeHTML(report.content)}</p>`
              : ""
          }

          ${
            report.file_url
              ? `
                <p>
                  <a
                    href="${escapeHTML(report.file_url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Report
                  </a>
                </p>
              `
              : ""
          }

        </div>
      `;
    })
    .join("");
}


/* =========================================
   LOAD COMPLETE ARCHIVE
   ========================================= */

async function loadArchive() {
  console.log("Loading NAOSS Digital Archive...");

  await Promise.allSettled([
    loadAdministrations(),
    loadExecutives(),
    loadMeetings(),
    loadProgrammes(),
    loadHandoverRecords(),
    loadReports(),
    loadDocuments(),
    loadHistory()
  ]);

  console.log(
    "NAOSS Digital Archive loading completed."
  );
}


/* =========================================
   START WEBSITE
   ========================================= */

function startNAOSSApp() {
  loadArchive();
}


if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    startNAOSSApp
  );
} else {
  startNAOSSApp();
}


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
