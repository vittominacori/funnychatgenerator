var FunnyChatGenerator = angular.module('FunnyChatGenerator', []);

$(document).ready(function () {
    if (!Window.is_demo) {
        $('#screenshot-modal').modal('show');
    }
});