Qualtrics.SurveyEngine.addOnload(function()
{

	let question = this;
	
	Qualtrics.SurveyEngine.addOnPageSubmit(function()
	{
		const participant_name = question.getChoiceAnswerValue();
		Qualtrics.SurveyEngine.setEmbeddedData("participant_name", participant_name);
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

