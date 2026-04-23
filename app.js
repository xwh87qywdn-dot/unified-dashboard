const shareButton = document.getElementById("shareButton");
const shareStatus = document.getElementById("shareStatus");

async function sharePage() {
  const shareData = {
    title: document.title,
    text: "Unified Dashboard",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = "הקישור שותף בהצלחה";
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      shareStatus.textContent = "הקישור הועתק ללוח";
      return;
    }

    throw new Error("Sharing is not supported");
  } catch (error) {
    console.error("Share failed", error);
    shareStatus.textContent = "לא ניתן לשתף כרגע";
  }
}

shareButton?.addEventListener("click", () => {
  void sharePage();
});
