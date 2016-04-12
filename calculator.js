
var _tot_shards = 0;
var _tot_pulls = 0;

var Box = new BoxPack();
var Pack = new ChancePack();
$(document).ready(function() {
	
	$('#selectBox').click(function() {selectBox();});
	$('#selectChance').click(function() {selectChance();});

	Box.reset();
	Pack.reset();
	selectBox();

	$('#num_shards').on('change', calculateNumPulls);

	$('#btnReset').click(function() { reset();});
	$('#btnPull').click(function() { pull();});
	$('#btnSpend').click(function() { spendAll();});

});

function selectBox() {
	var $this = $('#selectBox');
	$this.addClass('active');
	$this.siblings().first().removeClass('active');
	
	$('#boxType').html('Box ' + '<span class="caret"></span>');
	Pack.hide();
	Box.show();
}

function selectChance() {
	var $this = $('#selectChance');
	$this.addClass('active');
	$this.siblings().first().removeClass('active');
	
	$('#boxType').html('Chance ' + '<span class="caret"></span>');
	Box.hide();
	Pack.show();
}

function reset() {
	Box.reset();
	Pack.reset();
	_tot_shards = 0;
	_tot_pulls = 0;
	updateForm();
}
function pull() {
	Box.pull();
	Pack.pull();
	_tot_shards += 60;
	_tot_pulls++;
	updateForm();
}

function calculateNumPulls() {
	var shards = $('#num_shards').val();
	var pulls = Math.floor(shards/60);

	var $spend = $('#btnSpend');

	$spend.html('Buy ' + pulls);
		if (pulls > 0) {
		$('#spend').show();
	} else {
		// 
	}
}

function chanceToPullLegend() {
	var legs = $('#num_legend').val();
	var epics = $('#num_epic').val();

	var tot = legs * 4 + epics * 8;

	return legs/tot;
}

function chanceToQuadEpic() {

}

function chanceToQuadLegend() {
	var chance = chanceToPullLegend();
}

function chanceToQuadIntEpic() {
}

function chanceToQuadIntLegend() {
		var legs = $('#num_legend').val();
}

function updateForm() {
	$('#tot_shards').val(_tot_shards);
	$('#tot_pulls').val(_tot_pulls);
}

function checkDualsAndQuads() {
	$('.card').each(function(index, value) {
		var $this = $(this);
		var drawn = $this.find('.d').data('drawn');
		if (drawn == 0) return 'continue';
		if (drawn == 2 || drawn == 3)
			$this.addClass('dual');
		if (drawn > 3)
			$this.addClass('quad');
		if (drawn==1)
			$this.addClass('single');
		if (drawn == $this.find('.p').data('pop')) {
			$this.addClass('full');
		}
	});
}

function spendAll() {
	var shards = $('#num_shards').val();
	if (shards > 59) {
		setTimeout(function() {
			pull();
			$('#num_shards').val(Number(shards-60));
			calculateNumPulls();
			spendAll();
		}, 500);
	}
}
