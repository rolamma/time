async function getPrayerTimes() {
  try {
    const url =
      "https://api.aladhan.com/v1/timingsByCity?city=Qurayyat&country=Saudi%20Arabia&method=4";

    const response = await fetch(url);
    const data = await response.json();

    const t = data.data.timings;

    document.querySelector(".fajr").textContent = formatTime(t.Fajr);
    document.querySelector(".sunrise").textContent = formatTime(t.Sunrise);
    document.querySelector(".dhuhr").textContent = formatTime(t.Dhuhr);
    document.querySelector(".asr").textContent = formatTime(t.Asr);
    document.querySelector(".maghrib").textContent = formatTime(t.Maghrib);
    document.querySelector(".isha").textContent = formatTime(t.Isha);

  } catch (error) {
    console.log("Error:", error);
  }
}

function formatTime(time) {
  let clean = time.split(" ")[0];
  let [hours, minutes] = clean.split(":");

  hours = Number(hours);

  let period = hours >= 12 ? "م" : "ص";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${period}`;
}

getPrayerTimes();

/* يحدث الأوقات كل يوم تلقائيًا */
setInterval(getPrayerTimes, 24 * 60 * 60 * 1000);


document.getElementById("downloadBtn").addEventListener("click", async () => {
  const element = document.querySelector(".poster");

  const canvas = await html2canvas(element, {
    scale: 2
  });

  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = "prayer-times.png";
  link.click();
});