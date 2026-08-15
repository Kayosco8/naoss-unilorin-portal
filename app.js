const SUPABASE_URL = "https://tydgxkpvklakqgtctwnj.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mA";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

document.addEventListener("DOMContentLoaded", function () {
  loadExecutives();
});

async function loadExecutives() {
  const executiveList = document.getElementById("executive-list");

  const { data, error } = await supabaseClient
    .from("executives")
    .select("full_name, position, department, level, photo_url")
    .order("position");

  if (error) {
    console.error("Error loading executives:", error);
    executiveList.innerHTML = "<p>Unable to load executive records.</p>";
    return;
  }

  if (!data || data.length === 0) {
    executiveList.innerHTML = "<p>No executive records available.</p>";
    return;
  }

  executiveList.innerHTML = "";

  data.forEach(function (executive) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${
        executive.photo_url
          ? `<img src="${executive.photo_url}" alt="${executive.full_name}" style="width:100%; border-radius:10px; margin-bottom:15px;">`
          : ""
      }

      <h3>${executive.position || "Executive"}</h3>
      <p><strong>${executive.full_name}</strong></p>

      ${
        executive.department
          ? `<p>Department: ${executive.department}</p>`
          : ""
      }

      ${
        executive.level
          ? `<p>Level: ${executive.level}</p>`
          : ""
      }
    `;

    executiveList.appendChild(card);
  });
}
