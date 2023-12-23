Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

	var qid = this.questionId;

	console.log("Processing questionId ", qid);

	$r = $("#" + this.questionId + " input[type=radio]");
	console.log("First radiobutton: ", $r[0].id);
	$("#" + this.questionId + " input[type=radio]").each(function () { 
  
          console.log("radiobutton: ", this.id); 
          console.log("choiceid: ", $(this).attr('choiceid'));
          var label_id = "#"+ qid + "-" + $(this).attr('choiceid') + "-label";
          console.log("label_id = ", label_id);
          $el = $(label_id).find('span')
          $el.attr(‘id’, label_id + "-span");
          console.log("Span text: ", $el.text());
         $("<img src='https://d2bigaxkb98vwk.cloudfront.net/assets/nose1.svg' style='width: 100px; padding-right: 10px;'/>").insertBefore($el);
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