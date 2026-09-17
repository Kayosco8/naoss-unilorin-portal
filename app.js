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

  const container =
    document.getElementById("executive-list") ||
    document.getElementById("executives-list") ||
    document.getElementById("executives");

  if (!container) {
    console.warn("Executives container not found.");
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading executive council...</p></div>";

  const { data, error } = await supabaseClient
    .from("executives")
    .select("*")
    .order("position", {
      ascending: true
    });

  if (error) {
    console.error("Executives error:", error);

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load executives.</p></div>";

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
            alt="${escapeHTML(
              executive.full_name || "Executive"
            )}"
            class="executive-photo"
          >

          <h3>
            ${escapeHTML(
              executive.full_name || "Name not available"
            )}
          </h3>

          ${
            executive.position
              ? `
                <p>
                  <strong>Position:</strong>
                  ${escapeHTML(executive.position)}
                </p>
              `
              : ""
          }

          ${
            executive.department
              ? `
                <p>
                  <strong>Department:</strong>
                  ${escapeHTML(executive.department)}
                </p>
              `
              : ""
          }

          ${
            executive.level
              ? `
                <p>
                  <strong>Level:</strong>
                  ${escapeHTML(executive.level)}
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
   LOAD PROGRAMMES
   ========================================= */

async function loadProgrammes() {

  const container =
    document.getElementById("programme-list") ||
    document.getElementById("programmes-list") ||
    document.getElementById("programmes");

  if (!container) {
    console.warn("Programmes container not found.");
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading programmes and activities...</p></div>";

  const { data, error } = await supabaseClient
    .from("programmes")
    .select("*")
    .order("programme_date", {
      ascending: false
    });

  if (error) {
    console.error("Programmes error:", error);

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load programmes.</p></div>";

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
            ${escapeHTML(
              programme.title || "Programme"
            )}
          </h3>

          ${
            programme.theme
              ? `
                <p>
                  <strong>Theme:</strong>
                  ${escapeHTML(programme.theme)}
                </p>
              `
              : ""
          }

          ${
            programme.programme_date
              ? `
                <p>
                  <strong>Date:</strong>
                  ${formatDate(
                    programme.programme_date
                  )}
                </p>
              `
              : ""
          }

          ${
            programme.venue
              ? `
                <p>
                  <strong>Venue:</strong>
                  ${escapeHTML(programme.venue)}
                </p>
              `
              : ""
          }

          ${
            programme.objectives
              ? `
                <p>
                  <strong>Objectives:</strong>
                  ${escapeHTML(
                    programme.objectives
                  )}
                </p>
              `
              : ""
          }

          ${
            programme.report
              ? `
                <p>
                  <strong>Report:</strong>
                  ${escapeHTML(programme.report)}
                </p>
              `
              : ""
          }

          ${
            programme.outcome
              ? `
                <p>
                  <strong>Outcome:</strong>
                  ${escapeHTML(programme.outcome)}
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
   LOAD DOCUMENTS
   ========================================= */

async function loadDocuments() {

  const container =
    document.getElementById("document-list") ||
    document.getElementById("documents-list") ||
    document.getElementById("documents");

  if (!container) {
    console.warn("Documents container not found.");
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading documents...</p></div>";

  const { data, error } = await supabaseClient
    .from("documents")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    console.error("Documents error:", error);

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load documents.</p></div>";

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
            ${escapeHTML(
              document.title || "Document"
            )}
          </h3>

          ${
            document.document_type
              ? `
                <p>
                  <strong>Type:</strong>
                  ${escapeHTML(
                    document.document_type
                  )}
                </p>
              `
              : ""
          }

          ${
            document.description
              ? `
                <p>
                  ${escapeHTML(
                    document.description
                  )}
                </p>
              `
              : ""
          }

          ${
            document.file_url
              ? `
                <p>
                  <a
                    href="${escapeHTML(
                      document.file_url
                    )}"
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
    document.getElementById("administration-list") ||
    document.getElementById("administrations-list") ||
    document.getElementById("administrations");

  if (!container) {
    console.warn(
      "Administrations container not found."
    );
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading administrations...</p></div>";

  const { data, error } = await supabaseClient
    .from("administrations")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    console.error(
      "Administrations error:",
      error
    );

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load administrations.</p></div>";

    return;
  }

  if (!data || data.length === 0) {
    showEmpty(
      container,
      "No administration records available."
    );

    return;
  }

  const currentAdministration =
    data.find(function (administration) {

      return (
        administration.session ===
        "2026/2027"
      );

    });


  if (currentAdministration) {

    container.innerHTML = `
      <div class="administration-card">

        <h3>
          ${escapeHTML(
            currentAdministration.name ||
            "Current Administration"
          )}
        </h3>

        ${
          currentAdministration.session
            ? `
              <p>
                <strong>Session:</strong>
                ${escapeHTML(
                  currentAdministration.session
                )}
              </p>
            `
            : ""
        }

        ${
          currentAdministration.president
            ? `
              <p>
                <strong>President:</strong>
                ${escapeHTML(
                  currentAdministration.president
                )}
              </p>
            `
            : ""
        }

        ${
          currentAdministration.general_secretary
            ? `
              <p>
                <strong>General Secretary:</strong>
                ${escapeHTML(
                  currentAdministration.general_secretary
                )}
              </p>
            `
            : ""
        }

        ${
          currentAdministration.description
            ? `
              <p>
                ${escapeHTML(
                  currentAdministration.description
                )}
              </p>
            `
            : ""
        }

      </div>
    `;

  } else {

    container.innerHTML = data
      .map(function (administration) {

        return `
          <div class="administration-card">

            <h3>
              ${escapeHTML(
                administration.name ||
                "Administration"
              )}
            </h3>

            ${
              administration.session
                ? `
                  <p>
                    <strong>Session:</strong>
                    ${escapeHTML(
                      administration.session
                    )}
                  </p>
                `
                : ""
            }

            ${
              administration.president
                ? `
                  <p>
                    <strong>President:</strong>
                    ${escapeHTML(
                      administration.president
                    )}
                  </p>
                `
                : ""
            }

            ${
              administration.general_secretary
                ? `
                  <p>
                    <strong>General Secretary:</strong>
                    ${escapeHTML(
                      administration.general_secretary
                    )}
                  </p>
                `
                : ""
            }

            ${
              administration.description
                ? `
                  <p>
                    ${escapeHTML(
                      administration.description
                    )}
                  </p>
                `
                : ""
            }

          </div>
        `;
      })
      .join("");
  }
}


/* =========================================
   LOAD HISTORY
   ========================================= */

async function loadHistory() {

  const container =
    document.getElementById("history-list") ||
    document.getElementById("history");

  if (!container) {
    console.warn(
      "History container not found."
    );
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading history...</p></div>";

  const { data, error } = await supabaseClient
    .from("administrations")
    .select("*")
    .order("created_at", {
      ascending: true
    });

  if (error) {
    console.error(
      "History error:",
      error
    );

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load history.</p></div>";

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
            ${escapeHTML(
              administration.name ||
              "Administration"
            )}
          </h3>

          ${
            administration.session
              ? `
                <p>
                  <strong>Session:</strong>
                  ${escapeHTML(
                    administration.session
                  )}
                </p>
              `
              : ""
          }

          ${
            administration.president
              ? `
                <p>
                  <strong>President:</strong>
                  ${escapeHTML(
                    administration.president
                  )}
                </p>
              `
              : ""
          }

          ${
            administration.general_secretary
              ? `
                <p>
                  <strong>General Secretary:</strong>
                  ${escapeHTML(
                    administration.general_secretary
                  )}
                </p>
              `
              : ""
          }

          ${
            administration.description
              ? `
                <p>
                  ${escapeHTML(
                    administration.description
                  )}
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
   LOAD MEETINGS
   ========================================= */

async function loadMeetings() {

  const container =
    document.getElementById("meeting-list") ||
    document.getElementById("meetings-list") ||
    document.getElementById("meetings");

  if (!container) {
    console.warn(
      "Meetings container not found."
    );
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading meetings and minutes...</p></div>";

  const { data, error } = await supabaseClient
    .from("meetings")
    .select("*")
    .order("meeting_date", {
      ascending: false
    });

  if (error) {
    console.error(
      "Meetings error:",
      error
    );

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load meetings.</p></div>";

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
            ${escapeHTML(
              meeting.title || "Meeting"
            )}
          </h3>

          ${
            meeting.meeting_date
              ? `
                <p>
                  <strong>Date:</strong>
                  ${formatDate(
                    meeting.meeting_date
                  )}
                </p>
              `
              : ""
          }

          ${
            meeting.meet_time
              ? `
                <p>
                  <strong>Time:</strong>
                  ${escapeHTML(
                    meeting.meet_time
                  )}
                </p>
              `
              : ""
          }

          ${
            meeting.venue
              ? `
                <p>
                  <strong>Venue:</strong>
                  ${escapeHTML(
                    meeting.venue
                  )}
                </p>
              `
              : ""
          }

          ${
            meeting.agenda
              ? `
                <p>
                  <strong>Agenda:</strong>
                  ${escapeHTML(
                    meeting.agenda
                  )}
                </p>
              `
              : ""
          }

          ${
            meeting.minutes
              ? `
                <p>
                  <strong>Minutes:</strong>
                  ${escapeHTML(
                    meeting.minutes
                  )}
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
   LOAD HANDOVER RECORDS
   ========================================= */

async function loadHandoverRecords() {
  const container = document.getElementById("handover-list");

  if (!container) return;

  try {
    const { data, error } = await supabaseClient
      .from("handover_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Handover error:", error);
      container.innerHTML = `
        <div class="empty-state">
          <p>Unable to load handover records.</p>
        </div>
      `;
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No handover records available yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = data.map(record => {
      const title = escapeHTML(record.title || "Handover Record");
      const status = escapeHTML(record.status || "");
      const description = escapeHTML(record.description || "");
      const date = record.created_at ? formatDate(record.created_at) : "";

      let fileButton = "";

      if (record.file_url && record.file_url.trim() !== "") {
        fileButton = `
          <a class="document-link"
             href="${escapeHTML(record.file_url)}"
             target="_blank"
             rel="noopener noreferrer">
             View Handover Document
          </a>
        `;
      }

      return `
        <article class="card handover-card">
          <h3>${title}</h3>

          ${status ? `<p><strong>Status:</strong> ${status}</p>` : ""}

          ${date ? `<p><strong>Date:</strong> ${date}</p>` : ""}

          ${description ? `<p>${description}</p>` : ""}

          ${fileButton}
        </article>
      `;
    }).join("");

  } catch (err) {
    console.error("Unexpected handover error:", err);

    container.innerHTML = `
      <div class="empty-state">
        <p>Unable to load handover records.</p>
      </div>
    `;
  }
}
/* =========================================
   LOAD REPORTS
   ========================================= */

async function loadReports() {

  const container =
    document.getElementById("report-list") ||
    document.getElementById("reports-list") ||
    document.getElementById("reports");

  if (!container) {
    console.warn(
      "Reports container not found."
    );
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading reports...</p></div>";

  const { data, error } = await supabaseClient
    .from("reports")
    .select("*")
    .order("report_date", {
      ascending: false
    });

  if (error) {
    console.error(
      "Reports error:",
      error
    );

    container.innerHTML =
      "<div class='empty-state'><p>Unable to load reports.</p></div>";

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
            ${escapeHTML(
              report.title || "Report"
            )}
          </h3>

          ${
            report.report_type
              ? `
                <p>
                  <strong>Report Type:</strong>
                  ${escapeHTML(
                    report.report_type
                  )}
                </p>
              `
              : ""
          }

          ${
            report.report_date
              ? `
                <p>
                  <strong>Date:</strong>
                  ${formatDate(
                    report.report_date
                  )}
                </p>
              `
              : ""
          }

          ${
            report.content
              ? `
                <p>
                  ${escapeHTML(
                    report.content
                  )}
                </p>
              `
              : ""
          }

          ${
            report.file_url
              ? `
                <p>
                  <a
                    href="${escapeHTML(
                      report.file_url
                    )}"
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
   LOAD NAOSSITE OF THE WEEK
   ========================================= */

async function loadNAOSSiteOfTheWeek() {

  const container =
    document.getElementById("naossite-list") ||
    document.getElementById("naossite-of-the-week") ||
    document.getElementById("naossite");

  if (!container) {
    console.warn(
      "NAOSSite of the Week container not found."
    );
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading NAOSSite of the Week...</p></div>";

  /*
    The NAOSSite table has not yet been
    confirmed in the current Supabase database.

    Do not query an unknown table.
  */

  showEmpty(
    container,
    "NAOSSite of the Week records will appear here."
  );
}


/* =========================================
   LOAD VOTING RECORDS
   ========================================= */

async function loadVotingRecords() {

  const container =
    document.getElementById("voting-list") ||
    document.getElementById("voting-records") ||
    document.getElementById("voting");

  if (!container) {
    console.warn(
      "Voting records container not found."
    );
    return;
  }

  container.innerHTML =
    "<div class='empty-state'><p>Loading voting and election records...</p></div>";

  /*
    The voting/election table has not yet
    been confirmed in Supabase.

    Do not query an unknown table.
  */

  showEmpty(
    container,
    "Voting and election records will appear here."
  );
}


/* =========================================
   LOAD COMPLETE ARCHIVE
   ========================================= */

async function loadArchive() {

  console.log(
    "Loading NAOSS Digital Archive..."
  );

  const loaders = [

    loadAdministrations(),

    loadExecutives(),

    loadMeetings(),

    loadProgrammes(),

    loadReports(),

    loadHandoverRecords(),

    loadDocuments(),

    loadHistory(),
       
    loadNAOSSiteOfTheWeek(),

    loadVotingRecords()

  ];

  await Promise.allSettled(loaders);

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


/* =========================================
   DOM READY
   ========================================= */

if (
  document.readyState ===
  "loading"
) {

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
      document.visibilityState ===
      "visible"
    ) {

      loadArchive();

    }

  }
);


/* =========================================
   GLOBAL ERROR HANDLING
   ========================================= */

window.addEventListener(
  "error",
  function (event) {

    console.error(
      "NAOSS Archive Error:",
      event.error ||
      event.message
    );

  }
);


/* =========================================
   UNHANDLED PROMISE ERROR
   ========================================= */

window.addEventListener(
  "unhandledrejection",
  function (event) {

    console.error(
      "NAOSS Archive Promise Error:",
      event.reason
    );

  }
);
