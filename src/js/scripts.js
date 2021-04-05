window.addEventListener("load", setup);
async function setup() {
  const ctx = document.getElementById("chart").getContext("2d");
  const globalTemps = await getData();
  const otherTemps = await getDifferentData();
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: globalTemps.years,
      datasets: [
        {
          label: "Temps",
          data: globalTemps.temps,
          fill: false,
          borderColor: "rgba(18, 26, 140, 1)",
          backgroundColor: "rgba(18, 26, 140, 1)",

          borderWidth: 1,
        },
        {
          label: "Other Temps",
          data: otherTemps.temps,
          fill: false,
          borderColor: "rgba(245, 27, 27, 1)",
          backgroundColor: "rgba(245, 27, 27, 1)",
          borderWidth: 1,
        },
      ],
    },
  });
}

async function getData() {
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();

  const years = [];
  const temps = [];
  const rows = data.split("\n").slice(1);
  rows.forEach((row) => {
    const cols = row.split(",");
    years.push(cols[0]);
    temps.push(14 + parseFloat(cols[1]));
  });

  return { years, temps };
}

async function getDifferentData() {
  const response = await fetch("GLB.Ts+dSST.csv");
  const data = await response.text();

  const years = [];
  const temps = [];

  const rows = data.split("\n").slice(2);
  rows.forEach((row) => {
    const cols = row.split(",");
    years.push(cols[0]);
    temps.push(14 + parseFloat(cols[1]));
  });
  return { years, temps };
}
