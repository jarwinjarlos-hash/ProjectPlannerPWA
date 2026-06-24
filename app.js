let devices = [];
let activityName = "";
let chart;

// Create activity
function addActivity() {
  activityName = document.getElementById("activityName").value;
  alert("Activity Created: " + activityName);
}

// Add device
function addDevice() {
  let tag = document.getElementById("deviceTag").value;
  if (!tag) return;

  devices.push({
    tag: tag,
    done: false
  });

  document.getElementById("deviceTag").value = "";
  render();
}

// Toggle status
function toggle(index) {
  devices[index].done = !devices[index].done;
  render();
}

// Render UI
function render() {
  let list = document.getElementById("deviceList");
  list.innerHTML = "";

  devices.forEach((d, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span class="${d.done ? "done" : ""}">
        ${d.tag}
      </span>
      <button onclick="toggle(${i})">
        ${d.done ? "Undo" : "Done"}
      </button>
    `;

    list.appendChild(li);
  });

  updateStatus();
  loadGantt();
}

// Update summary
function updateStatus() {
  let done = devices.filter(d => d.done).length;
  let total = devices.length;

  document.getElementById("statusSummary").innerText =
    `Finished: ${done} / ${total}`;

  let percent = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("percent").innerText = percent + "%";

  updateChart(percent);
}

// Chart.js
function updateChart(actualPercent) {
  let ctx = document.getElementById("progressChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Start', 'Current'],
      datasets: [
        {
          label: 'Planned',
          data: [0, 100],
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Actual',
          data: [0, actualPercent],
          borderColor: 'red',
          fill: false
        }
      ]
    }
  });
}

