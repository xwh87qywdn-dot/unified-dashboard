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
      shareStatus.textContent = "השיתוף הושלם";
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      shareStatus.textContent = "הקישור הועתק ללוח";
      return;
    }

    shareStatus.textContent = "שיתוף לא נתמך בדפדפן זה";
    return;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      shareStatus.textContent = "השיתוף בוטל";
      return;
    }

    console.error("Share/clipboard operation failed", error);
    shareStatus.textContent = "לא ניתן לשתף כרגע";
  }
}

shareButton?.addEventListener("click", () => {
  void sharePage();
});
