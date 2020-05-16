var FunnyChatGenerator = angular.module('FunnyChatGenerator', []);

$(document).ready(function () {
    if (!window.is_demo) {
        $('#screenshot-modal').modal('show');
    }
});