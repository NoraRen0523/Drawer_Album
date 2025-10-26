// app.js
// Drawer Album – hover/focus activation for ".card" items
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card"));
  if (cards.length === 0) return;

  const setAll = (active) =>
    cards.forEach((c) => c.classList.toggle("is-active", active));

  // Start with all cards active
  setAll(true);

  // ----- Pointer (mouse/touch/pen) handling via delegation -----
  // Use pointerover/out (they bubble) instead of mouseenter/leave
  document.addEventListener("pointerover", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    setAll(false);
    card.classList.add("is-active");
  });

  // When pointer leaves the last card to anywhere that's not a card, restore all
  document.addEventListener("pointerout", (e) => {
    const fromCard = e.target.closest(".card");
    const toCard =
      e.relatedTarget &&
      e.relatedTarget.closest &&
      e.relatedTarget.closest(".card");
    if (fromCard && !toCard) setAll(true);
  });

  // ----- Keyboard accessibility -----
  document.addEventListener("focusin", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    setAll(false);
    card.classList.add("is-active");
  });

  document.addEventListener("focusout", (e) => {
    const next =
      e.relatedTarget &&
      e.relatedTarget.closest &&
      e.relatedTarget.closest(".card");
    if (!next) setAll(true);
  });
});
