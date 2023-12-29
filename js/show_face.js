Qualtrics.SurveyEngine.addOnload(function()
{
  /*Place your JavaScript here to run when the page loads*/
  
  const q = this;

  q.hideNextButton();

  jQuery('#show_face_button').click(function(){ 

    jQuery('#show_face_button').prop("disabled",true);
    q.hidePreviousButton();

    const el = document.getElementById("face");
    el.classList.add("fade_show");

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

    });
  
});

Qualtrics.SurveyEngine.addOnReady(function()
{
  /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
  /*Place your JavaScript here to run when the page is unloaded*/

});