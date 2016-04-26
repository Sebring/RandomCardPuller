function RandomCardPuller() {
	var self = this;
	console.log("RandomCardPuller -version 0.8.3");

	self.showBox = ko.observable(true);
	self.showPack = ko.observable(false);
	self.shardsAvailable = ko.observable();
	self.shardsSpent = ko.observable(0);
	self.pullsAvailable = ko.computed(function() {
		return Math.floor(self.shardsAvailable()/60) || 0;
	});
	self.pullsTotal = ko.computed(function() {
		return Number(self.shardsSpent()/60);
	});

	self.box = {};
	self.pack = {};

	if (typeof _box_data == 'undefined') {
			console.log('No data found');
			return;
	}
	if (typeof _box_data.box !== 'undefined') {
		self.box = new Box(_box_data.box, 1);
	} else console.log('No box found');

	if (typeof _box_data.pack !== 'undefined') {
		self.pack = new Box(_box_data.pack, 2);
	} else console.log('No chance pack found');

	self.pull = function() {
		//console.log('RCP - pull')
		var boxIndex = self.box.pull();
		var packIndex = self.pack.pull();
		self.shardsSpent(self.shardsSpent()+60);

		highlightCard(boxIndex, packIndex);
	}

	self.reset = function() {
		self.box.reset();
		self.pack.reset();
		self.shardsSpent(0);
	}

	self.toggleBox = function() {
		self.showBox(!self.showBox());
		toggleButtons(self.showBox(), self.showPack());
	}
	self.togglePack = function() {
		self.showPack(!self.showPack());
		toggleButtons(self.showBox(), self.showPack());
	}

	self.spendAll = function() {
		if (self.pullsAvailable()) {
			setTimeout(function() {
				self.pull();
				self.shardsAvailable(self.shardsAvailable()-60);
				self.spendAll();
			}, 500);
		}
	}

};

ko.applyBindings(new RandomCardPuller());

function Card(data) {
	var self = this;

	self.id = data.id;
	self.name = data.name;
	self.rarity = data.rarity;
	self.portrait = data.pic;
	self.population = ko.computed(function() {
		return self.rarity==3? 8 : 4;
	});
	self.drawn = ko.observable(0);
	self.available = ko.computed(function() {
		return self.population - self.drawn();
	});
	self.bg = ko.computed(function() {
		return 'http://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/' + self.portrait+'.jpg';
	});
};

function Box(data, type) {
	var self = this;

	console.log('Create box: ' + data.name);

	self.name = data.name;
	self.type = type;
	self.isBox = ko.computed(function() {
		return self.type===1;
	});
	self.isChancePack = ko.computed(function() {
		return self.type===2;
	});
	self.cards = ko.observableArray([]);

	for (var i=0;i<data.cards.length;i++) {
		self.cards.push(new Card(data.cards[i]));
	}

	self.pull = function() {
		var index = self.getRandom();
		return self.pullCard(index);
	}

	self.pullCard = function(i) {
		
		// CHANCE
		if (self.isChancePack) {
			self.cards()[i].drawn(self.cards()[i].drawn()+1);
			return i;
		}

		// BOX
		var p=0;
		$.each(self.cards(), function(index) {
			p += this.population() - this.drawn();
			if (p!=0 && p >= i) {
				this.drawn(this.drawn()+1);
				return index;
			}
		});
	}

	self.getRandom = function() {
		return Math.floor(Math.random() * self.getAvailable());
	}

	self.getAvailable = function() {
		
		// CHANCE
		if (self.isChancePack) {
			return self.cards().length;
		}

		// BOX
		var pop = 0;
		$.each(self.cards(), function() {
			var p = this.population() - this.drawn();
			pop += p;
		});
		return pop;
	}

	self.reset = function() {
		$.each(self.cards(), function() {
			this.drawn(0);
		});
	}

};
