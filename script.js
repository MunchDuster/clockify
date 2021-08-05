const clockBorderThickness = 3;
const clockRadius = 120;

//colors
const handColor = "#ddd";
const dotsColor = "#ddd";
const clockBackground = "#333";
const clockBorder = "#666";

const DegToRad = Math.PI / 180;

const time = document.getElementById("time");
const date = document.getElementById("date");
const timerBox = document.getElementById("timerBox");
const canvas = document.getElementById("canvas");
const smoothBox = document.getElementById("smoothBox");

const ctx = canvas.getContext("2d");

var realtime;
function ticky() {
  realtime = new Date();

  date.innerText = getDate(
    realtime.getMonth(),
    realtime.getFullYear(),
    realtime.getDate()
  );
  time.innerText = getTime(
    realtime.getSeconds(),
    realtime.getMinutes(),
    realtime.getHours()
  );
  updateCanvas();
  window.requestAnimationFrame(ticky);
}
function getTime(seconds, minutes, hours) {
  var str;
  var mins = minutes < 10 ? "0" + minutes : minutes;
  if (hours > 12) {
    str = hours - 12 + ":" + mins + " PM";
  } else {
    str = hours + ":" + mins + " AM";
  }

  return str;
}
function getDate(month, year, day) {
  var str = day + " ";
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  str += monthNames[month] + " " + year;
  return str;
}
function updateCanvas() {
  ClearCanvas();
  DrawClockBack();
  DrawPoints();
  DrawHands();
}
function ClearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function DrawClockBack() {
  //Clock background
  ctx.beginPath();
  ctx.fillStyle = clockBackground;
  ctx.arc(canvas.width / 2, canvas.height / 2, clockRadius, 0, Math.PI * 2);
  ctx.fill();

  //Clock border
  ctx.strokeStyle = clockBorder;
  ctx.lineWidth = clockBorderThickness;
  ctx.stroke();
  ctx.closePath();
}
function DrawPoints() {
  for (var i = 0; i < 12; i++) {
    //hour points

    ctx.moveTo(
      canvas.width / 2 + Math.cos(i * 30 * DegToRad) * (clockRadius - 10),
      canvas.height / 2 + Math.sin(i * 30 * DegToRad) * (clockRadius - 10)
    );
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2 + Math.cos(i * 30 * DegToRad) * (clockRadius - 10),
      canvas.height / 2 + Math.sin(i * 30 * DegToRad) * (clockRadius - 10),
      5,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = dotsColor;
    ctx.fill();
    ctx.closePath();

    //minute points
    for (var j = 1; j < 5; j++) {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 +
          Math.cos((i * 30 + j * 6) * DegToRad) * (clockRadius - 10),
        canvas.height / 2 +
          Math.sin((i * 30 + j * 6) * DegToRad) * (clockRadius - 10),
        3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.closePath();
    }
  }
}
function DrawHands() {
  if (smoothBox.checked) {
    //sec hand
    DrawHand(
      (realtime.getSeconds() + realtime.getMilliseconds() / 1000) * 6 - 90,
      90,
      2
    );
    //minute hand
    DrawHand(
      (realtime.getMinutes() + realtime.getSeconds() / 60) * 6 - 90,
      80,
      6
    );
    //hour hand
    DrawHand(
      (realtime.getHours() + realtime.getMinutes() / 60) * 30 - 90,
      60,
      8
    );
  } else {
    //sec hand
    DrawHand(realtime.getSeconds() * 6 - 90, 90, 4);
    //minute hand
    DrawHand(realtime.getMinutes() * 6 - 90, 80, 6);
    //hour hand
    DrawHand(realtime.getHours() * 30 - 90, 60, 8);
  }
}
function DrawHand(angle, length, width) {
  ctx.beginPath();
  //left center point
  ctx.moveTo(
    canvas.width / 2 + Math.sin(-angle * DegToRad) * (width / 2),
    canvas.height / 2 + Math.cos(-angle * DegToRad) * (width / 2)
  );
  //back point
  ctx.lineTo(
    canvas.width / 2 + Math.cos(angle * DegToRad) * -(width / 2),
    canvas.height / 2 + Math.sin(angle * DegToRad) * -(width / 2)
  );
  //right center point
  ctx.lineTo(
    canvas.width / 2 + Math.sin(-angle * DegToRad) * (-width / 2),
    canvas.height / 2 + Math.cos(-angle * DegToRad) * (-width / 2)
  );
  //tip
  ctx.lineTo(
    canvas.width / 2 +
      Math.cos(angle * DegToRad) * length +
      Math.sin(-angle * DegToRad) * -1,
    canvas.height / 2 +
      Math.sin(angle * DegToRad) * length +
      Math.cos(-angle * DegToRad) * -1
  );
  ctx.lineTo(
    canvas.width / 2 +
      Math.cos(angle * DegToRad) * length +
      Math.sin(-angle * DegToRad) * 1,
    canvas.height / 2 +
      Math.sin(angle * DegToRad) * length +
      +Math.cos(-angle * DegToRad) * 1
  );
  ctx.fillStyle = handColor;
  ctx.fill();
  ctx.closePath();
}

function hideShowTimer() {
  timerBox.style.display =
    timerBox.style.display == "none" ? "inline-block" : "none";
}
window.requestAnimationFrame(ticky);
