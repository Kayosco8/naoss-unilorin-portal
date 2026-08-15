const SUPABASE_URL = "https://tydgxkpvklakqgtctwnj.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_sIBGFtkZIgg3Y5IjIn_Glg_z9uaU8mA";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

document.addEventListener("DOMContentLoaded", function () {
  console.log("NAOSS Digital Archive connected to Supabase.");

  loadExecutives();
});

async function loadExecutives() {
  const { data, error } = await supabaseClient
    .from("executives")
    .select("*");

  if (error) {
    console.error("Error loading executives:", error);
    return;
  }

  console.log("Executives:", data);
}
