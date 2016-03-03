/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/

(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
sym.restart = function () {
	init();
};
sym.correctAnswer = function () {
	TweenMax.to(sym.$('solution'), .5, {
		autoAlpha: 1
	});
}

function init() {
	var correctAnswers = [1, 2, 3, 4, 5, 6, 7, 8];
	var totalHits = correctAnswers.length,
		hits = 0,
		rows = 2,
		columns = 4;
	var testSymbols = sym.$('draggables').children();
	var waitSecs = 1.5;
	sym.finalScore = 0;
	sym.$('counter').fadeIn();
	TweenMax.set([sym.getSymbol('counter').getSymbol('left_side').$('halfling2'), sym.getSymbol('counter').getSymbol('right_side').$('halfling2')], {
		rotation: 0
	});
	TweenMax.set(sym.$('solution'), {
		autoAlpha: 1
	});
	TweenMax.to(sym.getSymbol('counter').getSymbol('right_side').$('halfling2'), waitSecs / 2, {
		rotation: 180,
		ease: Linear.easeNone,
		onComplete: function () {
			TweenMax.to(sym.getSymbol('counter').getSymbol('left_side').$('halfling2'), waitSecs / 2, {
				rotation: 180,
				ease: Linear.easeNone,
				onComplete: function () {
					sym.$('counter').hide();
					sym.getSymbol('comp_evaluator').enableButtons.call();
				}
			});
		}
	});
	shuffleElements(testSymbols);
	TweenMax.to(sym.$('solution'), .5, {
		autoAlpha: 0,
		delay: waitSecs
	});
	for (i = 1; i <= totalHits; i++) {
		var initialTop, initialLeft;
		var glow = $('.glow');
		var symbol = sym.getSymbol('draggables').$('draggable_' + i);
		symbol[0]._appPosition = correctAnswers[i - 1];
		Draggable.create(symbol, {
			type: "top,left",
			cursor: 'pointer',
			onPress: function (e) {
				var draggable = $(e.currentTarget);
				initialLeft = draggable.css("left");
				initialTop = draggable.css("top");
			},
			onDrag: function (pointerEvent) {
				var draggable = $(this.target);
				var wrapper = $('.center-wrapper');
				if (pointerEvent.pageX < window.innerWidth / 2 - wrapper.width() / 2 || pointerEvent.pageX > window.innerWidth / 2 + wrapper.width() / 2 || pointerEvent.pageY < window.innerHeight / 2 - wrapper.height() / 2 || pointerEvent.pageY > window.innerHeight / 2 + wrapper.height() / 2) {
					TweenMax.to(draggable, .1, {
						left: initialLeft,
						top: initialTop
					});
					TweenMax.to(glow, 0, {
						autoAlpha: 1
					});
				}
			},
			onDragStart: function (e) {
				TweenMax.to(glow, .5, {
					autoAlpha: 1,
					repeat: -1,
					yoyo: true,
					ease: Linear.easeInOut
				});
			},
			onDragEnd: function (e) {
				var draggable = $(e.currentTarget);
				var dragName = draggable.data('originalId');
				var dragNumber = parseInt(dragName.replace(/\D/g, ''));
				var actualObject = this;
				var hitsBefore = hits;
				TweenMax.to(glow, 0, {
					autoAlpha: 1
				});
				$.each(testSymbols, function (name, testSymbol) {
					if (actualObject.hitTest(testSymbol, "50%")) {
						hits++;
						console.log('hit', hits);
						switchElements(draggable, $(testSymbol), initialLeft, initialTop);
					};
				});
				if (hitsBefore == hits) {
					console.log('no hit');
					TweenMax.to(draggable, .25, {
						left: initialLeft,
						top: initialTop
					});
				}
			}
		});
	};

	function arrayContains(number, array) {
		return array.indexOf(number) != -1 ? true : false;
	}

	function shuffleElements(elements) {
		var positions = [];
		elements.each(function () {
			var offset = {
				left: $(this).css("left"),
				top: $(this).css("top")
			};
			positions.push(offset);
		});
		positions.sort(function () {
			return Math.random() - 0.5;
		});
		elements.each(function (i) {
			$(this).css({
				left: positions[i].left,
				top: positions[i].top
			});
		});
	}

	function switchElements(element1, element2, iLeft, iTop) {
		TweenMax.to(element1, .15, {
			left: element2.css("left"),
			top: element2.css("top")
		});
		TweenMax.to(element2, .25, {
			left: iLeft,
			top: iTop,
			onComplete: checkSequence
		});
	}

	function checkSequence() {
		var actualSequence = [],
			actualPositions = [];
		$.each(testSymbols, function (i, v) {
			actualSequence.push($(v));
			actualSequence.sort(function (a, b) {
				return Math.floor(a.offset().top) - Math.floor(b.offset().top);
			})
		});
		var actualArr = function (arr, row, col) {
			var newArr = [];
			for (var i = 0; i < row; i++) {
				newArr = newArr.concat(arr.splice(0, col).sort(function (a, b) {
					return Math.floor(a.offset().left) - Math.floor(b.offset().left);
				}))
			}
			return newArr;
		}(actualSequence, rows, columns);
		$.each(actualArr, function (i, v) {
			actualPositions.push(v[0]._appPosition);
		});
		if (actualPositions.join() == correctAnswers.join()) {
			sym.finalScore = 5;
		};
		console.log(sym.finalScore);
	}
}

init();

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'draggables_2'
   (function(symbolName) {   
   
   })("draggables");
   //Edge symbol end:'draggables'

   //=========================================================
   
   //Edge symbol: 'comp_evaluator'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym,e){sym.enableButtons = function () {
	sym.getSymbol('buttons').$('btn_check').css({
		cursor: 'pointer',
		opacity: 1
	}).click(check);
	sym.getSymbol('buttons').$('btn_answer').css({
		cursor: 'pointer',
		opacity: 1
	}).click(correctAnswer);
	sym.getSymbol('buttons').$('btn_restart').css({
		cursor: 'pointer',
		opacity: 1
	}).click(restart);
}

function disableButtons() {
	sym.getSymbol('buttons').$('btn_check').css({
		cursor: 'default',
		opacity: .5
	}).off();
	sym.getSymbol('buttons').$('btn_answer').css({
		cursor: 'default',
		opacity: .5
	}).off();
	sym.getSymbol('buttons').$('btn_restart').css({
		cursor: 'default',
		opacity: .5
	}).off();
}

function restart() {
	sym.getParentSymbol().restart();
}

function correctAnswer() {
	sym.getParentSymbol().correctAnswer();
	sym.getSymbol('buttons').$('btn_check').css({
		cursor: 'default',
		opacity: .5
	}).off();
	sym.getSymbol('buttons').$('btn_answer').css({
		cursor: 'default',
		opacity: .5
	}).off();
}

function check() {
	var finalScore = sym.getParentSymbol().finalScore;
	disableButtons();
	if (finalScore == 5) {
		showModal('Tökéletes!', 'happy');
	} else if (finalScore == 4) {
		showModal('Ügyes vagy, megoldásod nem tökéletes, figyelj jobban!', 'neutral');
	} else if (finalScore == 3) {
		showModal('Szedd össze magad, lesz ez jobb is!', 'neutral');
	} else if (finalScore == 2) {
		showModal('Alig van jó megoldásod, gyakorolj többet!', 'neutral');
	} else if (finalScore == 1) {
		showModal('Sok gyakorlásra van még szükséged!', 'sad');
	} else {
		showModal('Még nem vagy kész, folytasd!', 'neutral');
	}
}

function showModal(message,smiley){var globEase=Back;var smiley=smiley||'neutral';var modal=sym.getSymbol('modal');modal.$(smiley).show();modal.$('text').html(message||'Lorem ipsum...');TweenMax.fromTo(sym.$('blind'),.5,{autoAlpha:0},{display:'block',autoAlpha:1,ease:globEase.easeOut});TweenMax.fromTo(modal.ele,.5,{scale:0,autoAlpha:0},{display:'block',scale:1,autoAlpha:1,ease:globEase.easeOut,onComplete:function(){modal.$('btn_close').css('cursor','pointer').click(function(){sym.enableButtons();$(this).off();TweenMax.to(modal.ele,.5,{scale:0,autoAlpha:0,ease:globEase.easeOut});TweenMax.to(sym.$('blind'),.5,{autoAlpha:0,ease:globEase.easeOut,onComplete:function(){modal.$(smiley).hide();}});});}});}});
      //Edge binding end

   })("comp_evaluator");
   //Edge symbol end:'comp_evaluator'

   //=========================================================
   
   //Edge symbol: 'buttons'
   (function(symbolName) {   
   
   })("buttons");
   //Edge symbol end:'buttons'

   //=========================================================
   
   //Edge symbol: 'btn_restart'
   (function(symbolName) {   
   
   })("btn_restart");
   //Edge symbol end:'btn_restart'

   //=========================================================
   
   //Edge symbol: 'btn_answer'
   (function(symbolName) {   
   
   })("btn_answer");
   //Edge symbol end:'btn_answer'

   //=========================================================
   
   //Edge symbol: 'btn_close'
   (function(symbolName) {   
   
   })("btn_close");
   //Edge symbol end:'btn_close'

   //=========================================================
   
   //Edge symbol: 'modal'
   (function(symbolName) {   
   
   })("modal");
   //Edge symbol end:'modal'

   //=========================================================
   
   //Edge symbol: 'btn_check'
   (function(symbolName) {   
   
   })("btn_check");
   //Edge symbol end:'btn_check'

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'counter'
   (function(symbolName) {   
   
   })("counter");
   //Edge symbol end:'counter'

   //=========================================================
   
   //Edge symbol: 'half_dot'
   (function(symbolName) {   
   
   })("half_dot");
   //Edge symbol end:'half_dot'

   //=========================================================
   
   //Edge symbol: 'halfling'
   (function(symbolName) {   
   
   })("halfling");
   //Edge symbol end:'halfling'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-2603602");

