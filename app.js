let tasks = [];

// Add task
function addTask() {

  let name = document.getElementById("taskName").value;
  let start = new Date(document.getElementById("startDate").value);
  let end = new Date(document.getElementById("endDate").value);

  if (!name || !start || !end) return;

  tasks.push({
    name: name,
    start: start,
    end: end,
    done: false
  });

  render();
}

// Render everything
function render() {

  renderTable();
  renderTimeline();
}

// LEFT TABLE
function renderTable() {
  let tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = "";

  tasks.forEach((t, i) => {

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${t.name}</td>
      <td>${formatDate(t.start)}</td>
      <td>${formatDate(t.end)}</td>
      <td>
        <button onclick="toggle(${i})">
          ${t.done ? "Done" : "Pending"}
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// RIGHT TIMELINE
function renderTimeline() {

  let timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  let baseDate = new Date("2026-06-01");

  tasks.forEach(t => {

    // create row
    for (let i = 0; i < 30; i++) {

      let cell = document.createElement("div");
      cell.className = "cell";

      let current = new Date(baseDate);
      current.setDate(current.getDate() + i);

      // check if inside task duration
      if (current >= t.start && current <= t.end) {
        cell.classList.add("bar");
      }

      timeline.appendChild(cell);
    }
  });
}

// Toggle status
function toggle(i) {
  tasks[i].done = !tasks[i].done;
  render();
}

// Format
function formatDate(d) {
  return d.toISOString().split("T")[0];
}
