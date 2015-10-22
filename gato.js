'use strict';

var gato = angular.module('gato',[]);
	gato.controller('GatoController',function($scope){

		$scope.myIcons = [
			{
				name: 'player1',
				icon: 'close',
			},
			{
				name: 'player2',
				icon: 'panorama_fish_eye',
			}
		];

		$scope.myLevels = [
			{
				name:'Fácil',
				isActive: true,
			},
			{
				name: 'Difícil',
				isActive: false,
			}
		];

		$scope.myCells = [
			[
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
				}
			],
			[
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
				}
			],
			[
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
			]
		];

		$scope.activeLevel 	= $scope.myLevels[0]; // Inicia por defecto en facil
		var turnCount 	= 0;
		$scope.gameStatus		= "";
		$scope.playerIcon 	= $scope.myIcons[0];
		$scope.computerIcon 	= $scope.myIcons[1];

		$scope.cellClicked = function(cell){ // circle > panorama_fish_eye
			//displays mark

			checkCell($scope.playerIcon.icon, cell);


			if(checkWinner() != '') calculateMove(checkWinner()) ;

			else {
				if(turnCount == 9) {
					showTie();
				} else {
					// computer move
					if($scope.activeLevel == $scope.myLevels[0]){
						randomMove();
					};
					if($scope.activeLevel == $scope.myLevels[1]){
						var Guess = calculateMove();
						checkCell($scope.computerIcon.icon, Guess.move);
					}
				}
			}
			if(checkWinner() != '') showWinner(checkWinner()) ;
		};

		function showWinner(winner) {
			if(winner == $scope.playerIcon.icon) $scope.gameStatus="Has Ganado!";
			else $scope.gameStatus = "Has Perdido, Intenta de nuevo";
			setGameEnabled(false);
		};

		function checkCell(icon, cell){
			cell.value = icon;
			cell.isDisabled = true;
			turnCount++;
		};

		function randomMove(){
			do {
				var row = getRandomInt(0,2);
				var col = getRandomInt(0,2);
			}
			while($scope.myCells[row][col].value != '');
			checkCell($scope.computerIcon.icon,$scope.myCells[row][col]);
		};

		function calculateMove(){
			var myBest = { score: "", move: "", moves: "" };
			var reply;

			if(turnCount == 9 || checkWinner() != ''){
			    if(checkWinner() == $scope.playerIcon.icon)
					myBest.score = -1;
				else if(checkWinner() == $scope.computerIcon.icon){
				  myBest.score = 1;
				  myBest.moves = turnCount;
				} else {
					myBest.score = 0;
				}
				return myBest;
			}

			if(!computer_turn()){
//user turn
				myBest.score = 2;
//   at least picks one move, even if it loses
			} else {
			//computer turn
			  myBest.score = -2;
			}

			for(var row = 0 ; row < $scope.myCells.length ; row++){
				for(var col = 0; col < $scope.myCells[0].length; col++){
					if($scope.myCells[row][col].value == ''){
						if(!computer_turn()){ //user turn
							checkCell($scope.playerIcon.icon, $scope.myCells[row][col]);
						} else {
							checkCell($scope.computerIcon.icon, $scope.myCells[row][col]);
						}
						reply = calculateMove();
                        undo_move(row, col);
						if ((computer_turn() && (reply.score > myBest.score)) ||
						//computer chooses highest score
		                (!computer_turn() && (reply.score < myBest.score))){
		                //human chooses the lowest score
                          myBest.move = $scope.myCells[row][col];
						  myBest.score = reply.score;
						}
						if (computer_turn() && (reply.score == myBest.score == 1)){
						  if(myBest.moves > reply.moves){
						    myBest.move = $scope.myCells[row][col];
						    myBest.moves = reply.moves;
						  }
						}
					}
				}
			}
			return myBest;
		};

		function computer_turn(){
		    return (turnCount % 2 != 0);
		}

		function undo_move(row, col){
		  $scope.myCells[row][col].value = '';
		  $scope.myCells[row][col].isDisabled = false;
		  turnCount = turnCount - 1;
        }

		function checkWinner(){
			if(turnCount > 4) { //Solo hay ganador hasta el turno 5

				//Horizontal
				for( var row = 0; row < $scope.myCells.length; row++){
					if($scope.myCells[row][0].value == $scope.myCells[row][1].value && $scope.myCells[row][1].value == $scope.myCells[row][2].value) return $scope.myCells[row][0].value;
				}
				//Vertical
				for( var col = 0; col < $scope.myCells.length; col++){
					if($scope.myCells[0][col].value == $scope.myCells[1][col].value && $scope.myCells[1][col].value == $scope.myCells[2][col].value) return $scope.myCells[0][col].value;
				}

				//Diagonal
				if(($scope.myCells[0][0].value == $scope.myCells[1][1].value && $scope.myCells[1][1].value == $scope.myCells[2][2].value) ||
					($scope.myCells[0][2].value == $scope.myCells[1][1].value && $scope.myCells[1][1].value == $scope.myCells[2][0].value))
					return $scope.myCells[1][1].value;

				return '';

			}
			return '';
		};

		function showTie(){
			$scope.gameStatus = "Empate";
		};

		$scope.newGame = function(){
			setGameEnabled(true);
			turnCount = 0;
			$scope.gameStatus = '';
		};

		$scope.changeLevel = function(newLevelIndex){
			$scope.activeLevel = $scope.myLevels[newLevelIndex];
			for(var i = 0 ; i < $scope.myLevels.length ; i++){
				$scope.myLevels[i].isActive = false;
			}
			$scope.myLevels[newLevelIndex].isActive = true;
		};

		function getRandomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function setGameEnabled(game_enabled){
			for(var row = 0 ; row< $scope.myCells.length ; row++){
				for(var col = 0; col < $scope.myCells[0].length; col++){
					if(game_enabled){
						$scope.myCells[row][col].value = '';
						$scope.myCells[row][col].isDisabled = false;
					} else {
						$scope.myCells[row][col].isDisabled = true;
					}
				}
			}
		}

});
