const track = document.getElementById("image-track");

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
  console.log("TrackDataset mate: ", track.dataset.mouseDownAt);
};

window.onmouseup = (e) => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
  console.log("Max Delta Mate: ", maxDelta);
  console.log("Mouse Delta Mate: ", mouseDelta);

  const percentage = (mouseDelta / maxDelta) * -100;
  console.log("this is percentage: " + percentage);

  const nextPercentage = Math.max(
    Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0),
    -100
  );
  track.dataset.percentage = nextPercentage;

  // track.style.transform = `translate(${nextPercentage}%, -50%)`;
  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  const trackImages = document.getElementsByClassName("image");

  for (const image of trackImages) {
    console.log("image: ", image);
    // image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    image.animate(
      {
        objectPosition: `${nextPercentage + 100}% 50%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};
