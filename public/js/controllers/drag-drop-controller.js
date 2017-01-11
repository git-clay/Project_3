// It makes sure that the clone element doesn’t grow to take up the whole screen (because its size is not limited by its parent anymore).
// It hides it by setting its opacity to 0.
$scope.startCallback = function (event, ui) {
	var $draggable = $(event.target);
	ui.helper.width($draggable.width());
	ui.helper.height($draggable.height());
	$draggable.css('display', 'none');
};
// This callback does two things:

$scope.revertCard = function (valid) {
	if (!valid) {
		var that = this;
		setTimeout(function () {
			$(that).css('display', 'block');
		}, 500);
	}
	return !valid;
};

// This callback does two things:
// It updates the model so that the card is displayed on the lane it was dropped on.
// It prevents dropping the card on the lane it was on before dragging.

$scope.dropCallback = function (event, ui) {
	var $lane = $(event.target);
	var $card = ui.draggable;
	if ($card.scope().card.lane != $lane.scope().lane.id) {
		$card.scope().card.lane = $lane.scope().lane.id;
	}
	else {
		
		return false;
	}
};
