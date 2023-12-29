Qualtrics.SurveyEngine.addOnReady(function()
{

	// Adjust the following config for each question.
	// Note that the min and max is only required for 'q1'
	// since 'q2' min/max is computed based on the value of 'q1'
	const config = { 
		r1: {facePart: 'nose', variant: '1', min: 70, max: 80, correct: true},
		r2: {facePart: 'nose', variant: '2', min: 0, max: 0, correct: false}
	};

	const qid = this.questionId;

	$("#QR-" + this.questionId + "-face_part_A").attr("src",
		'https://d2bigaxkb98vwk.cloudfront.net/assets/' + config.r1.facePart + config.r1.variant + '.svg');
	$("#QR-" + this.questionId + "-face_part_B").attr("src",
		'https://d2bigaxkb98vwk.cloudfront.net/assets/' + config.r2.facePart + config.r2.variant + '.svg');

	$r1 = $("[id$=-label-span-0]");
	$r2 = $("[id$=-label-span-1]");
	$($r1).text("");
	$($r2).text("");

	function setResponsePercentMetadata() {
		const r1_pct = Math.floor(Math.random() * (config.r1.max - config.r1.min + 1) + config.r1.min)
		const r2_pct = 100 - r1_pct;

		// $($r1).text(r1_pct);
		// $($r2).text(r2_pct);

		$("#QR-" + qid + "-faces-progress-bar-inner-A").css('width', r1_pct + '%');			
		$("#QR-" + qid + "-faces-progress-bar-span-A").text(r1_pct + '%');

		$("#QR-" + qid + "-faces-progress-bar-inner-B").css('width', r2_pct + '%');			
		$("#QR-" + qid + "-faces-progress-bar-span-B").text(r2_pct + '%');

		Qualtrics.SurveyEngine.setEmbeddedData("r1_meta", r1_pct + ", " + config.r1.correct);
		Qualtrics.SurveyEngine.setEmbeddedData("r2_meta", r2_pct + ", " + config.r2.correct);

	};

	// Initialize immediately then timer will start at next interval
	setResponsePercentMetadata();

	const faceTimer = setInterval(setResponsePercentMetadata, 3000);

	Qualtrics.SurveyEngine.setEmbeddedData("response_timer", faceTimer);

});

Qualtrics.SurveyEngine.addOnload(function()
{

	this.hideNextButton();
	this.hidePreviousButton();

	const qid = this.questionId;

	function createProgressBarElement(responseId) {

		const progressBarWrapper = {
			id: "QR-" + qid + "-faces-progress-bar-wrapper-" + responseId,
			css: {
				width: '75px', 
				'vertical-align': 'middle', 
				display: 'flex', 
				margin: 'auto 0'
			}
		};

		const progressBarOuter = {
			id: "QR-" + qid + "-faces-progress-bar-outer-" + responseId,
			css: {
				display: 'flex',
				width: '100%',
				height: '15px',
				backgroundColor: "gray",
				borderRadius: '5px',
				verticalAlign: 'center',
				margin: 'auto 0',
			}
		};

		const progressBarInner = {
			id: "QR-" + qid + "-faces-progress-bar-inner-" + responseId,
			css: {
			    display: 'block',
			    height: '100%',
			    borderRadius: '5px',
			    backgroundColor: 'red'
			}
		};

		const progressBarSpan = {
			id: "QR-" + qid + "-faces-progress-bar-span-" + responseId,
			css: {
			    'padding-left': '5px',
			    'font-weight': 'bold'
			}
		};

		var $divWrapper = $("<div>", progressBarWrapper);
		var $divOuter = $("<div>", progressBarOuter);
		var $divInner = $("<div>", progressBarInner);
		var $divSpan = $("<span>", progressBarSpan);

		$divOuter.append($divInner);
		$divWrapper.append($divOuter);
		$divWrapper.append($divSpan);

		return $divWrapper;

	};

	$r = $("#" + qid + " input:radio");

	$r1_meta = $("#" + qid + " input[type=text]")[0];
	$r2_meta = $("#" + qid + " input[type=text]")[1];

	// Hide the additional text field as this will hold our additional data
	$("#" + qid + " input[type=text]").hide();

	var label_id = "#"+ qid + "-" + $r[0].getAttribute('choiceid') + "-label";
	$el = $(label_id).find('span');
	$el.attr('id', qid + "-" + $r[0].getAttribute('choiceid') + "-label-span-0");
	$image = $("<img id='QR-" + qid + '-face_part_A' + "' style='width: 100px; padding-right: 10px;'/>")
		.insertBefore($el);
	createProgressBarElement('A').insertAfter($image);

	label_id = "#"+ qid + "-" + $r[1].getAttribute('choiceid') + "-label";
	$el = $(label_id).find('span');
	$el.attr('id', qid + "-" + $r[1].getAttribute('choiceid') + "-label-span-1");
	$image = $("<img id='QR-" + qid + '-face_part_B' + "' style='width: 100px; padding-right: 10px;'/>")
		.insertBefore($el);
	createProgressBarElement('B').insertAfter($image);

	$r.on( "change", function() {
		const intervalId = Qualtrics.SurveyEngine.getEmbeddedData("response_timer");
		clearInterval(intervalId);

		var rb = $("input:radio[name='" + $.escapeSelector(this.name) + "']");
		var idx = rb.index(rb.filter(':checked'));

		if (idx == 0) {
			$($r1_meta).val(Qualtrics.SurveyEngine.getEmbeddedData("r1_meta"));
			$($r2_meta).val(""); // clear other text field since only one can have a value
		} else if (idx == 1) {
			$($r2_meta).val(Qualtrics.SurveyEngine.getEmbeddedData("r2_meta"));
			$($r1_meta).val(""); // clear other text field since only one can have a value
		}

		jQuery('#NextButton').click();

    });

	
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
	const intervalId = Qualtrics.SurveyEngine.getEmbeddedData("response_timer");
	clearInterval(intervalId);

});