let devices = [];
let chart;

function addActivity() {
  let name = document.getElementById("activityName").value;
  alert("Activity Created: " + name);
}

function addDevice() {
  let tag = document.getElementById("deviceTag").value;
  if (!tag) return;

  devices.push({ tag: tag, done: false });
  document.getElementById("deviceTag").value = "";
  render();
}

function toggle(index) {
  devices[index].done = !devices[index].done;
  render();
}

function render() {
  let list = document.getElementById("deviceList");
  list.innerHTML = "";

  devices.forEach((d, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span class="${d.done ? "done" : ""}">${d.tag}</span>
      <button onclick="toggle(${i})">${d.done ? "Undo" : "Done"}</button>
    `;

    list.appendChild(li);
  });

  updateStatus();
  loadGantt();
}

function updateStatus() {
  let done = devices.filter(d => d.done).length;
  let total = devices.length;

  document.getElementById("statusSummary").innerText =
    `Finished: ${done} / ${total}`;

  let percent = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("percent").innerText = percent + "%";

  updateChart(percent);
}

function updateChart(actualPercent) {
  let ctx = document.getElementById("progressChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Start', 'Now'],
      datasets: [
        {
          label: 'Planned',
          data: [0, 100],
          borderColor: 'blue'
        },
        {
          label: 'Actual',
          data: [0, actualPercent],
          borderColor: 'red'
        }
      ]
    }
  });
}

function loadGantt() {
  let tasks = devices.map((d, i) => ({
    id: i.toString(),
    name: d.tag,
    start: "2026-06-01",
    end: "2026-06-10",
    progress: d.done ? 100 : 0
  }));

  document.getElementById("gantt").innerHTML = "";

  if (tasks.length > 0) {
    new Gantt("#gantt", tasks);
  }
}
