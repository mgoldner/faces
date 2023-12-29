Qualtrics.SurveyEngine.addOnload(function()
{

	function randomIntFromInterval(min, max) { // min and max included 
  		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function WordCloud(data, {
	  size = group => group.length, // Given a grouping of words, returns the size factor for that word
	  word = d => d, // Given an item of the data array, returns the word
	  marginTop = 0, // top margin, in pixels
	  marginRight = 0, // right margin, in pixels
	  marginBottom = 0, // bottom margin, in pixels
	  marginLeft = 0, // left margin, in pixels
	  width = 640, // outer width, in pixels
	  height = 400, // outer height, in pixels
	  // maxWords = 250, // maximum number of words to extract from the text
	  fontFamily = "Open Sans", // font family
	  fontScale = 15, // base font size
	  padding = 5, // amount of padding between the words (in pixels)
	  rotate = 0, // a constant or function to rotate the words
	  invalidation // when this promise resolves, stop the simulation
	} = {}) {

	  const svg = d3.create("svg")
	      .attr("viewBox", [0, 0, width, height])
	      .attr("width", width)
	      .attr("font-family", fontFamily)
	      .attr("font-weight", 600)
	      .attr("text-anchor", "middle")
	      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

	  const s = svg.append("style")
	  	.attr("type", 'text/css')
	  	.text(`
	  		text.blink { 
	  			animation: blink 2s ease-out; 
	  		}
	  		@keyframes blink {
			  0% {
			    text-shadow: 0 0 20px rgba(226, 25, 45, 0);
			  }
			  20% {
			    fill: rgba(226, 25, 45, 1);
			    text-shadow: -5px -5px 20px rgba(226, 25, 45, 0.8), 5px -5px 20px rgba(226, 25, 45, 0.8), 5px 5px 20px rgba(226, 25, 45, 0.8), -5px 5px 20px rgba(226, 25, 45, 0.8);
			    ;
			  }
			  30% {
			    fill: rgba(226, 25, 45, 1);
			    -5px -5px 20px rgba(226, 25, 45, 0.8), 5px -5px 20px rgba(226, 25, 45, 0.8), 5px 5px 20px rgba(226, 25, 45, 0.8), -5px 5px 20px rgba(226, 25, 45, 0.8);
			  }
			  100% {
			    text-shadow: 0 0 20px rgba(226, 25, 45, 0);
			  }
			}
	  	`);

	  // const g = svg.append("g").attr("transform", `translate(${marginLeft},${marginTop})`);
	  const g = svg.append("g").attr("transform", 'translate(' + marginLeft + ', ' + marginTop + ')');

	  const wc = d3.layout.cloud()
	      .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
	      .words(data)
	      .padding(padding)
	      // .rotate(function () { return ~~(Math.random() * 2) * 90; })
	      .rotate(0)
	      .font(fontFamily)
	      .fontSize(d => Math.sqrt(d.size) * fontScale)
	      .on("word", ({size, clazz, x, y, rotate, text}) => {
	        g.append("text")
	            .attr("font-size", size)
	            .attr("class", clazz)
	            .attr("transform", 'translate(' + x + ', ' + y + ')' + ' rotate(' + rotate + ')')
	            .text(text);
	      });

	  wc.start();
	  invalidation && invalidation.then(() => wc.stop());

	  $('#faces-wordcloud').append(svg.node());

	}

	const names = [
		{'text': 'Yeong-Su Liang', 'size': randomIntFromInterval(1,3)},
		{'text': 'Claire Castillo', 'size': randomIntFromInterval(1,3)},
		{'text': 'Guanlin Zhang', 'size': randomIntFromInterval(1,3)},
		{'text': 'Clement Gutierrez', 'size': randomIntFromInterval(1,3)},
		{'text': 'Sophia M. Gonick', 'size': randomIntFromInterval(1,3)},
		{'text': 'Sofia Harris', 'size': randomIntFromInterval(1,3)},
		{'text': 'Sarah Li', 'size': randomIntFromInterval(1,3)},
		{'text': 'Leon Hong', 'size': randomIntFromInterval(1,3)},
		{'text': 'Aisha Anne Nieves', 'size': randomIntFromInterval(1,3)},
		{'text': 'Constance Ho', 'size': randomIntFromInterval(1,3)},
		{'text': 'Benjamin Quist', 'size': randomIntFromInterval(1,3)},
		{'text': 'Alex Lee', 'size': randomIntFromInterval(1,3)},
		{'text': 'Yijie Wang', 'size': randomIntFromInterval(1,3)},
		{'text': 'James Daris', 'size': randomIntFromInterval(1,3)},
	];

	const index = randomIntFromInterval(0, names.length);
	const participant_name = Qualtrics.SurveyEngine.getEmbeddedData("participant_name");
	names.splice(index, 0, {text: participant_name, 'size': randomIntFromInterval(1,3), 'clazz': 'blink'}); 

	WordCloud(names);

	
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});