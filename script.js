// Initialize Locomotive Scroll
var timeout;
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

// Function to move the circle with the cursor
function circleMouseFollower(xscale,yscale) {
  window.addEventListener("mousemove", function (event) {
    const circle = document.querySelector("#minicircle");

    // Get cursor position relative to the viewport
    const x = event.clientX;
    const y = event.clientY;

    // Update the circle's position
    circle.style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale}) `;
  });
}
function mousesize() {
  var xscale=1
  var yscale=1
  var xprevious=0
  var yprevious=0

  window.addEventListener('mousemove',function (dets) {
    clearTimeout(timeout);
  var xdiff=   dets.clientX - xprevious
  var ydiff=   dets.clientY - yprevious
  xscale= gsap.utils.clamp(.8,1.2,xdiff)
  yscale=gsap.utils.clamp(.8,1.2,ydiff)
     xprevious=dets.clientX
     yprevious=dets.clientX
  circleMouseFollower(xscale,yscale)
  timeout = setTimeout(function () {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
  }, 100);
  });
}
function firstpageanim() {
  var tl=gsap.timeline();
  tl.from("#nav",{
    y:'-10',
    opacity:0,
    duration:1.5,
    ease:Expo.easeInOut
  })
  .to(".boundingelem",{
    y:0,
    stagger:.2,
    duration:2,
    delay:-1,
    ease:Expo.easeInOut
  })
  .from("#page1footer",{
    y:'-10',
    opacity:0,
    delay:-1,
    duration:1.5,
    ease:Expo.easeInOut
  })
}
document.querySelectorAll('.element').forEach(function (element) {
 var rotate=0;
 var diffrot=0;
 
  element.addEventListener('mousemove',function(dets){
 var diff= dets.clientY- element.getBoundingClientRect().top
  diffrot=dets.clientX-rotate;
  rotate=dets.clientX
 
    gsap.to(element.querySelector("img"),{
      opacity:1,
      ease:Power3,
      top:diff,
      left:dets.clientX,
      rotate: gsap.utils.clamp(-20,20,diffrot*0.5)
    })
  })
  element.addEventListener('mouseleave',function(dets){
       gsap.to(element.querySelector("img"),{
         opacity:0,
         ease:Power3,
         duration:0.5
       })
     })
})
function updateCurrentTime() {
  const currentTimeElement = document.getElementById("currentTime");
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;

  currentTimeElement.textContent = formattedTime;
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);
circleMouseFollower();
firstpageanim()
mousesize()
