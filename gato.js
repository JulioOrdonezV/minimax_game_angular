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

		$scope.activeLevel 	= $scope.myLevels[0]; // Inicia por defecto en facil
		$scope.turnCount 		= 0;
		$scope.gameStatus		= "";
		$scope.playerIcon 	= $scope.myIcons[0];
		$scope.computerIcon 	= $scope.myIcons[1];

		$scope.cellClicked = function(index){ // circle > panorama_fish_eye
			//displays mark

			$scope.checkCell($scope.playerIcon.icon, index);
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
			for(var i = 0 ; i< $scope.myCells.length ; i++){
				$scope.myCells[i].isDisabled = true;
			}

		};

		$scope.checkCell = function(icon,index){
			$scope.myCells[index].value = icon;
			$scope.myCells[index].isDisabled = true;
		};

		$scope.randomMove = function(){
			do{
				var index = getRandomInt(0,8);
			}while($scope.myCells[index].value != '');
			$scope.checkCell($scope.computerIcon.icon,index);
		};

		$scope.calculateMove = function(){

		};

		$scope.checkWinner = function(){
			if($scope.turnCount > 4) { //Solo hay ganador hasta el turno 5

				//Horizontal
				if($scope.myCells[0].value == $scope.myCells[1].value &&  $scope.myCells[0].value == $scope.myCells[2].value) return $scope.myCells[0].value;
				if($scope.myCells[3].value == $scope.myCells[4].value &&  $scope.myCells[3].value == $scope.myCells[5].value) return $scope.myCells[3].value;
				if($scope.myCells[6].value == $scope.myCells[7].value &&  $scope.myCells[6].value == $scope.myCells[8].value) return $scope.myCells[6].value;


				//Vertical
				if($scope.myCells[0].value == $scope.myCells[3].value &&  $scope.myCells[0].value == $scope.myCells[6].value) return $scope.myCells[0].value;
				if($scope.myCells[1].value == $scope.myCells[4].value &&  $scope.myCells[1].value == $scope.myCells[7].value) return $scope.myCells[1].value;
				if($scope.myCells[2].value == $scope.myCells[5].value &&  $scope.myCells[2].value == $scope.myCells[8].value) return $scope.myCells[2].value;

				//Diagonal
				if($scope.myCells[0].value == $scope.myCells[4].value &&  $scope.myCells[0].value == $scope.myCells[8].value) return $scope.myCells[0].value;
				if($scope.myCells[2].value == $scope.myCells[4].value &&  $scope.myCells[2].value == $scope.myCells[6].value) return $scope.myCells[2].value;

				return '';

			}
			return '';
		};

		$scope.showTie = function(){
			$scope.gameStatus = "Empate";
		};

		$scope.newGame = function(){
			for(var i = 0 ; i< $scope.myCells.length ; i++){
				$scope.myCells[i].isDisabled = false;
				$scope.myCells[i].value = '';
			}
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

});
