const STORAGE_KEY = "lernkarten-app-v1";
const defaultState = { cards: [], categories: [], activity: {} };
let state = loadState();
let hasSavedState = Boolean(localStorage.getItem(STORAGE_KEY));
let editingId = null;
let pendingImage = "";
let studyQueue = [];
let studyIndex = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const today = () => new Date().toISOString().slice(0, 10);
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
function loadState() { try { return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; } catch { return { ...defaultState }; } }
async function loadBundledCards() {
  try {
    const indexResponse = await fetch("cards/index.json", { cache: "no-cache" });
    if (!indexResponse.ok) throw new Error(`cards/index.json: ${indexResponse.status}`);
    const index = await indexResponse.json();
    if (!Array.isArray(index.files)) throw new Error("cards/index.json enthält kein files-Array.");
    const decks = await Promise.all(index.files.map(async (file) => {
      const response = await fetch(`cards/${encodeURIComponent(file)}`, { cache: "no-cache" });
      if (!response.ok) throw new Error(`cards/${file}: ${response.status}`);
      const deck = await response.json();
      if (!Array.isArray(deck.cards)) throw new Error(`cards/${file} enthält kein cards-Array.`);
      if (!Array.isArray(deck.categories)) throw new Error(`cards/${file} enthält kein categories-Array.`);
      return deck;
    }));
    const bundled = {
      cards: decks.flatMap((deck) => deck.cards.map((card) => ({
        ...card,
        tags: [...new Set([...(deck.categories || []), ...(card.tags || [])])]
      }))),
      categories: decks.flatMap((deck) => deck.categories || [])
    };
    if (!Array.isArray(bundled.cards)) throw new Error("cards.json enthält kein cards-Array.");
    const localCards = new Map(state.cards.map((card) => [card.id, card]));
    state.cards = bundled.cards.map((card) => ({ ...card, ...(localCards.get(card.id) || {}) }));
    for (const card of state.cards) localCards.delete(card.id);
    state.cards.push(...localCards.values());
    state.categories = [...new Set([...(bundled.categories || []), ...state.categories, ...state.cards.flatMap((card) => card.tags || [])])];
    if (!hasSavedState) saveState();
  } catch (error) {
    if (!hasSavedState) showToast("Projektkarten konnten nicht geladen werden.");
    console.error("Projektkarten konnten nicht geladen werden.", error);
  }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderAll(); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c])); }
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2400); }
function openModal(id) { $(`#${id}`).classList.remove("hidden"); }
function closeModal(element) { element.closest(".modal-backdrop").classList.add("hidden"); }
function switchView(view) { $$(".view").forEach((el) => el.classList.toggle("active", el.id === `${view}-view`)); $$(".nav-tab").forEach((el) => el.classList.toggle("active", el.dataset.view === view)); }
function allCategories() { return [...new Set([...state.categories, ...state.cards.flatMap((card) => card.tags || [])])].sort((a, b) => a.localeCompare(b)); }
function dueCards() { const now = today(); return state.cards.filter((card) => !card.nextReview || card.nextReview <= now); }
function tagsHtml(tags = []) { return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join(""); }

function renderAll() {
  renderDashboard(); renderCategoryOptions(); renderCards(); renderStats();
}
function renderDashboard() {
  const due = dueCards(), mastered = state.cards.filter((card) => card.level >= 3).length;
  $("#due-count").textContent = due.length; $("#mastered-count").textContent = mastered;
  const learnedToday = state.activity[today()] || 0, total = state.cards.length;
  $("#today-progress").textContent = total ? `${Math.min(100, Math.round((learnedToday / total) * 100))}%` : "0%";
  $("#today-label").textContent = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "short" }).format(new Date());
  $("#learn-subtitle").textContent = due.length ? `${due.length} Karte${due.length === 1 ? "" : "n"} warten auf dich.` : "Für heute ist alles wiederholt.";
  const categories = allCategories();
  $("#category-list").innerHTML = categories.length ? categories.map((category) => {
    const cards = state.cards.filter((card) => card.tags?.includes(category)); const done = cards.filter((card) => card.level >= 3).length;
    return `<div class="category-row"><span class="category-name">${escapeHtml(category)}</span><div class="category-bar"><i style="width:${cards.length ? done / cards.length * 100 : 0}%"></i></div><small>${done}/${cards.length}</small></div>`;
  }).join("") : `<p class="muted">Noch keine Kategorien vorhanden.</p>`;
  const recent = [...state.cards].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  $("#recent-cards").innerHTML = recent.length ? recent.map((card) => `<article class="mini-card" data-edit="${card.id}"><h3>${escapeHtml(card.question)}</h3>${tagsHtml(card.tags)}</article>`).join("") : `<p class="muted">Lege deine erste Karte an.</p>`;
}
function renderCategoryOptions() {
  const selected = $("#category-filter").value; $("#category-filter").innerHTML = `<option value="">Alle Kategorien</option>${allCategories().map((cat) => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join("")}`; $("#category-filter").value = selected;
}
function renderCards() {
  const query = $("#search-input").value.toLowerCase(), category = $("#category-filter").value;
  const cards = state.cards.filter((card) => (!category || card.tags?.includes(category)) && (!query || `${card.question} ${card.answer} ${(card.tags || []).join(" ")}`.toLowerCase().includes(query)));
  $("#cards-list").innerHTML = cards.length ? cards.map((card) => `<article class="card-row"><div class="card-row-main"><h3>${escapeHtml(card.question)}</h3>${tagsHtml(card.tags)}${card.image ? " <span class=\"tag\">Bild</span>" : ""}</div><small class="muted">${card.level >= 3 ? "sicher" : card.nextReview && card.nextReview > today() ? `wieder am ${new Date(`${card.nextReview}T12:00`).toLocaleDateString("de-DE")}` : "fällig"}</small><div class="card-row-actions"><button class="small-action" data-edit="${card.id}">Bearbeiten</button><button class="small-action" data-delete="${card.id}">Löschen</button></div></article>`).join("") : `<div class="empty">Keine Karten gefunden. Erstelle eine neue Karte oder ändere den Filter.</div>`;
}
function renderStats() {
  const total = state.cards.length, mastered = state.cards.filter((c) => c.level >= 3).length, reviews = Object.values(state.activity).reduce((a, b) => a + b, 0);
  $("#stats-grid").innerHTML = [["Karten gesamt", total], ["Sicher beherrscht", mastered], ["Wiederholungen", reviews], ["Kategorien", allCategories().length]].map(([label, value]) => `<div class="stat"><small>${label}</small><strong>${value}</strong><span class="muted">${label === "Sicher beherrscht" && total ? `${Math.round(value / total * 100)}% deiner Karten` : " "}</span></div>`).join("");
  const days = [...Array(7)].map((_, i) => { const date = new Date(); date.setDate(date.getDate() - 6 + i); return date.toISOString().slice(0, 10); });
  const max = Math.max(1, ...days.map((day) => state.activity[day] || 0));
  $("#activity-chart").innerHTML = days.map((day) => `<div class="bar-col"><div class="bar ${day === today() ? "active" : ""}" style="height:${Math.max(3, (state.activity[day] || 0) / max * 100)}%"></div><small>${new Date(`${day}T12:00`).toLocaleDateString("de-DE", { weekday: "short" })}</small></div>`).join("");
}
function resetCardForm() { $("#card-form").reset(); $("#image-preview").classList.add("hidden"); $("#image-hint").textContent = "Optional, wird lokal gespeichert"; pendingImage = ""; editingId = null; $("#modal-title").textContent = "Neue Karte"; }
function openCard(id) {
  resetCardForm(); editingId = id || null; const card = state.cards.find((item) => item.id === id);
  if (card) { $("#modal-title").textContent = "Karte bearbeiten"; $("#question-input").value = card.question; $("#answer-input").value = card.answer; $("#tags-input").value = (card.tags || []).join(", "); pendingImage = card.image || ""; if (pendingImage) { $("#image-preview").src = pendingImage; $("#image-preview").classList.remove("hidden"); } }
  openModal("card-modal");
}
function renderManageCategories() { $("#manage-category-list").innerHTML = allCategories().map((cat) => `<div><span>${escapeHtml(cat)}</span><button type="button" class="delete-category" data-category="${escapeHtml(cat)}">Entfernen</button></div>`).join("") || `<p class="muted">Noch keine Kategorien.</p>`; }
function openStudySetup() {
  const categories = allCategories();
  $("#study-category-list").innerHTML = categories.length ? categories.map((category) => `<label class="study-category-choice"><input type="checkbox" value="${escapeHtml(category)}" /> ${escapeHtml(category)}</label>`).join("") : `<p class="muted">Es sind noch keine Kategorien vorhanden.</p>`;
  $("#all-categories-choice").checked = true;
  openModal("study-setup-modal");
}
function startStudy(categories = [], limit = null, type = "both") {
  studyQueue = dueCards().filter((card) => !categories.length || categories.some((category) => card.tags?.includes(category)));
  studyQueue = studyQueue.filter((card) => type === "both" || (type === "new" ? !card.reviewCount : card.lastRating === "again"));
  if (limit) studyQueue = studyQueue.slice(0, limit);
  if (!studyQueue.length) { showToast("Keine fälligen Karten in der Auswahl."); return; }
  studyIndex = 0; renderStudyCard(); openModal("study-modal");
}
function renderStudyCard() {
  const card = studyQueue[studyIndex]; $("#study-counter").textContent = `Karte ${studyIndex + 1} von ${studyQueue.length}`; $("#study-question").textContent = card.question; $("#study-answer").classList.add("hidden"); $("#reveal-answer").classList.remove("hidden"); $("#study-answer p").textContent = card.answer;
  $("#study-image").src = card.image || ""; $("#study-image").classList.toggle("hidden", !card.image);
}
function rateCard(rating) {
  const card = studyQueue[studyIndex], intervals = { again: 0, hard: 1, easy: Math.min(30, Math.max(3, (card.interval || 1) * 2)) };
  card.level = rating === "again" ? 0 : Math.min(5, (card.level || 0) + (rating === "easy" ? 1 : 0)); card.interval = intervals[rating]; card.reviewCount = (card.reviewCount || 0) + 1; card.lastRating = rating; const next = new Date(); next.setDate(next.getDate() + intervals[rating]); card.nextReview = next.toISOString().slice(0, 10); state.activity[today()] = (state.activity[today()] || 0) + 1; saveState();
  if (++studyIndex < studyQueue.length) renderStudyCard(); else { closeModal($("#study-modal")); showToast("Lerneinheit abgeschlossen!"); }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-edit], [data-view-link]"); if (!target) return;
  if (target.dataset.view) switchView(target.dataset.view); if (target.dataset.viewLink) switchView(target.dataset.viewLink);
  if (target.id === "new-card") openCard(); if (target.id === "start-session") openStudySetup(); if (target.dataset.edit) openCard(target.dataset.edit);
  if (target.dataset.delete) { state.cards = state.cards.filter((card) => card.id !== target.dataset.delete); saveState(); showToast("Karte gelöscht."); }
  if (target.id === "manage-categories") { renderManageCategories(); openModal("category-modal"); }
  if (target.dataset.category) { const category = target.dataset.category; state.categories = state.categories.filter((item) => item !== category); state.cards.forEach((card) => { card.tags = (card.tags || []).filter((tag) => tag !== category); }); saveState(); renderManageCategories(); }
  if (target.id === "reveal-answer") { $("#study-answer").classList.remove("hidden"); target.classList.add("hidden"); }
  if (target.dataset.rating) rateCard(target.dataset.rating);
  if (target.hasAttribute("data-close")) closeModal(target);
});
$("#card-form").addEventListener("submit", (event) => { event.preventDefault(); const tags = $("#tags-input").value.split(",").map((tag) => tag.trim()).filter(Boolean); const existing = state.cards.find((card) => card.id === editingId); const card = existing || { id: uid(), createdAt: Date.now(), level: 0, interval: 0 }; Object.assign(card, { question: $("#question-input").value.trim(), answer: $("#answer-input").value.trim(), tags, image: pendingImage }); if (!existing) state.cards.push(card); state.categories = [...new Set([...state.categories, ...tags])]; saveState(); closeModal($("#card-modal")); showToast(existing ? "Karte aktualisiert." : "Karte gespeichert."); });
$("#image-input").addEventListener("change", (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { pendingImage = reader.result; $("#image-preview").src = pendingImage; $("#image-preview").classList.remove("hidden"); $("#image-hint").textContent = file.name; }; reader.readAsDataURL(file); });
$("#category-form").addEventListener("submit", (event) => { event.preventDefault(); const value = $("#new-category-input").value.trim(); if (value && !allCategories().includes(value)) { state.categories.push(value); saveState(); renderManageCategories(); $("#new-category-input").value = ""; showToast("Kategorie hinzugefügt."); } });
$("#study-setup-form").addEventListener("submit", (event) => { event.preventDefault(); const allSelected = $("#all-categories-choice").checked; const categories = allSelected ? [] : $$("#study-category-list input:checked").map((input) => input.value); const limited = $('input[name="study-count"]:checked').value === "limited"; const count = Number.parseInt($("#study-count-input").value, 10); const type = $('input[name="study-type"]:checked').value; if (!allSelected && !categories.length) { showToast("Wähle mindestens eine Kategorie aus."); return; } if (limited && (!Number.isInteger(count) || count < 1)) { showToast("Gib eine gültige Kartenanzahl ein."); return; } closeModal($("#study-setup-modal")); startStudy(categories, limited ? count : null, type); });
$("#all-categories-choice").addEventListener("change", (event) => { $$("#study-category-list input").forEach((input) => { input.disabled = event.target.checked; input.checked = false; }); });
$$('input[name="study-count"]').forEach((input) => input.addEventListener("change", (event) => { $("#study-count-input").disabled = event.target.value !== "limited"; }));
$("#search-input").addEventListener("input", renderCards); $("#category-filter").addEventListener("change", renderCards);
$("#export-button").addEventListener("click", () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `lernkarten-backup-${today()}.json`; link.click(); URL.revokeObjectURL(link.href); });
$("#import-button").addEventListener("click", () => $("#import-file").click());
$("#import-file").addEventListener("change", (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!Array.isArray(imported.cards)) throw new Error("Ungültiges Format"); state = { ...defaultState, ...imported }; saveState(); showToast("Daten importiert."); } catch { showToast("Import fehlgeschlagen: ungültige Datei."); } event.target.value = ""; }; reader.readAsText(file); });
loadBundledCards().finally(renderAll);
