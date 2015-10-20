(function(){

	var app = angular.module('gato',[]);

	app.controller('GatoController',function(){
		this.myCells 		= cells;
		this.myLevels 		= levels;
		this.myIcons  		= icons;
		this.activeLevel 	= this.myLevels[0]; // Inicia por defecto en facil
		this.turnCount 		= 0;
		this.gameStatus		= "";
		this.playerIcon 	= this.myIcons[0];
		this.computerIcon 	= this.myIcons[1];

		this.cellClicked = function(index){ // circle > panorama_fish_eye
			//displays mark
			
			this.checkCell(this.playerIcon.icon, index);
			this.turnCount++;

			
			if(this.checkWinner() != '') this.showWinner(this.checkWinner()) ;

			else {
				if(this.turnCount == 9) {
					this.showTie();
				} else {
					// computer move
					if(this.activeLevel == this.myLevels[0]){ 
						this.randomMove();
					};
					if(this.activeLevel == this.myLevels[1]){
						this.calculateMove();
					};
					this.turnCount++;
				}
			}

			if(this.checkWinner() != '') this.showWinner(this.checkWinner()) ;
		};

		this.showWinner = function (winner) {
			if(winner == this.playerIcon.icon) this.gameStatus="Has Ganado!";
			else this.gameStatus = "Has Perdido, Intenta de nuevo";
			for(var i = 0 ; i< this.myCells.length ; i++){
				this.myCells[i].isDisabled = true;
			}

		};

		this.checkCell = function(icon,index){
			this.myCells[index].value = icon;
			this.myCells[index].isDisabled = true;
		};

		this.randomMove = function(){
			do{
				var index = getRandomInt(0,8);
			}while(this.myCells[index].value != '');
			this.checkCell(this.computerIcon.icon,index);
		};

		this.calculateMove = function(){

		};

		this.checkWinner = function(){
			if(this.turnCount > 4) { //Solo hay ganador hasta el turno 5
			
				//Horizontal
				if(this.myCells[0].value == this.myCells[1].value &&  this.myCells[0].value == this.myCells[2].value) return this.myCells[0].value;
				if(this.myCells[3].value == this.myCells[4].value &&  this.myCells[3].value == this.myCells[5].value) return this.myCells[3].value;
				if(this.myCells[6].value == this.myCells[7].value &&  this.myCells[6].value == this.myCells[8].value) return this.myCells[6].value;

				
				//Vertical
				if(this.myCells[0].value == this.myCells[3].value &&  this.myCells[0].value == this.myCells[6].value) return this.myCells[0].value;
				if(this.myCells[1].value == this.myCells[4].value &&  this.myCells[1].value == this.myCells[7].value) return this.myCells[1].value;
				if(this.myCells[2].value == this.myCells[5].value &&  this.myCells[2].value == this.myCells[8].value) return this.myCells[2].value;

				//Diagonal
				if(this.myCells[0].value == this.myCells[4].value &&  this.myCells[0].value == this.myCells[8].value) return this.myCells[0].value;
				if(this.myCells[2].value == this.myCells[4].value &&  this.myCells[2].value == this.myCells[6].value) return this.myCells[2].value;

				return '';
				
			}
			return '';
		};

		this.showTie = function(){
			this.gameStatus = "Empate";
		};

		this.newGame = function(){
			for(var i = 0 ; i< this.myCells.length ; i++){
				this.myCells[i].isDisabled = false;
				this.myCells[i].value = '';
			}
			this.turnCount = 0;
			this.gameStatus = '';
		};

		this.changeLevel = function(newLevelIndex){
			this.activeLevel = this.myLevels[newLevelIndex];
			for(var i = 0 ; i < this.myLevels.length ; i++){
				this.myLevels[i].isActive = false;
			}
			this.myLevels[newLevelIndex].isActive = true;
		};

		function getRandomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

	});


//Objetos

	var icons = [
		{
			name: 'player1',
			icon: 'close',
		},
		{
			name: 'player2',
			icon: 'panorama_fish_eye',
		}
	];

	var levels = [
		{
			name:'Fácil',
			isActive: true,
		},
		{
			name: 'Difícil',
			isActive: false,
		}
	];

	var cells = [
		{
			name: 'top_left',
			value: '',
			isDisabled:false,
		},
		{
			name: 'top_center',
			value: '',
			isDisabled:false,
		},
		{
			name: 'top_right',
			value: '',
			isDisabled:false,
		},
		{
			name: 'center_left',
			value: '',
			isDisabled:false,
		},
		{
			name: 'center_center',
			value: '',
			isDisabled:false,
		},
		{
			name: 'center_center',
			value: '',
			isDisabled:false,
		},
		{
			name: 'bottom_left',
			value: '',
			isDisabled:false,
		},
		{
			name: 'bottom_center',
			value: '',
			isDisabled:false,
		},
		{
			name: 'bottom_right',
			value: '',
			isDisabled:false,
		}

	];

})();