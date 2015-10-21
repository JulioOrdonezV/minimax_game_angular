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
		$scope.turnCount 		= 0;
		$scope.gameStatus		= "";
		$scope.playerIcon 	= $scope.myIcons[0];
		$scope.computerIcon 	= $scope.myIcons[1];

		$scope.cellClicked = function(cell){ // circle > panorama_fish_eye
			//displays mark

			$scope.checkCell($scope.playerIcon.icon, cell);
			$scope.turnCount++;


			if($scope.checkWinner() != '') $scope.showWinner($scope.checkWinner()) ;

			else {
				if($scope.turnCount == 9) {
					$scope.showTie();
				} else {
					// computer move
					if($scope.activeLevel == $scope.myLevels[0]){
						$scope.randomMove();
					};
					if($scope.activeLevel == $scope.myLevels[1]){
						$scope.calculateMove();
					};
					$scope.turnCount++;
				}
			}

			if($scope.checkWinner() != '') $scope.showWinner($scope.checkWinner()) ;
		};

		$scope.showWinner = function (winner) {
			if(winner == $scope.playerIcon.icon) $scope.gameStatus="Has Ganado!";
			else $scope.gameStatus = "Has Perdido, Intenta de nuevo";
			setGameEnabled(false);
		};

		$scope.checkCell = function(icon, cell){
			cell.value = icon;
			cell.isDisabled = true;
		};

		$scope.randomMove = function(){
			do {
				var row = getRandomInt(0,2);
				var col = getRandomInt(0,2);
			}
			while($scope.myCells[row][col].value != '');
			$scope.checkCell($scope.computerIcon.icon,$scope.myCells[row][col]);
		};

		$scope.calculateMove = function(){

		};

		$scope.checkWinner = function(){
			if($scope.turnCount > 4) { //Solo hay ganador hasta el turno 5

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

		$scope.showTie = function(){
			$scope.gameStatus = "Empate";
		};

		$scope.newGame = function(){
			setGameEnabled(true);
			$scope.turnCount = 0;
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

		function setGameEnabled(status){
			for(var row = 0 ; row< $scope.myCells.length ; row++){
				for(var col = 0; col < $scope.myCells[0].length; col++){
					$scope.myCells[row][col].isDisabled = !status;
					if(status)$scope.myCells[row][col].value = '';
				}
			}
		}

});
