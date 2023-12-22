function toggleFaceVisible(button) {

  button.disabled = true;

  const el = document.getElementById("face");

  let isVisible = el.classList.contains("fade_show");

  console.log("Is visible = ", isVisible);
  if (!isVisible) {
    el.classList.add("fade_show");
    el.classList.remove("fade_hidden");
  }

  var timeleft = 10;
  var faceTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(faceTimer);
      el.classList.remove("fade_show");
      el.classList.add("fade_hidden")
      jQuery('#NextButton').click();
    }
    timeleft -= 1;
  }, 1000);

}