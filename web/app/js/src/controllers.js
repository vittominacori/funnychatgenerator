FunnyChatGenerator.controller('CanvasCtrl', ['$scope', '$interval', '$http',
    function ($scope, $interval, $http) {

        $scope.user = {
            name: 'John Doe',
            status: 'online'
        };

        $scope.new_message = {
            text: 'sample text',
            type: 'sent',
            time: '19:08',
            status: 'delivered'
        };

        $scope.messages = [
            {
                text: 'Hey there...',
                type: 'sent',
                time: '19:07',
                status: 'read'
            },
            {
                text: 'Hi man',
                type: 'received',
                time: '19:07',
                status: ''
            },
            {
                text: 'What about you?',
                type: 'received',
                time: '19:08',
                status: ''
            },
            {
                text: 'Good news. I\'m creating funny chats with FunnyChatGenerator',
                type: 'sent',
                time: '19:08',
                status: 'delivered'
            }
        ];

        $scope.image = window.image;
        $scope.current_url = window.current_url;

        $scope.typeChanged = function() {
            $scope.new_message.status = $scope.new_message.type === 'sent' ? 'delivered' : '';
        };

        $scope.addMessage = function() {
            if ($scope.new_message.text !== '') {
                $scope.messages.push(angular.copy($scope.new_message));

                $scope.new_message.text = '';
            }
        };

        $scope.clear = function () {
            $scope.messages = [];
        };

        $scope.takePicture = function() {

            document.location.href = '#';

            html2canvas(document.querySelector("#device")).then(function(canvas) {
                $('#waiting-modal').modal('show');

                $http({
                    method: 'POST',
                    url: 'upload',
                    data: 'img=' + canvas.toDataURL(),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function(res) {
                        $('#waiting-modal').modal('hide');

                        if(res.data.status === 1){
                            $scope.image = res.data.image;
                            $scope.current_url = res.data.page_url;
                            $('#screenshot-modal').modal('show');
                            ga('send', 'event', 'Screenshot', 'created', res.data.file);
                        } else {
                            alert(res.data.message);
                        }
                    });
            });
        };

        $scope.download = function () {
            document.location.href = $scope.image;
        };

        $scope.share = {
            save: function(){
                $scope.takePicture('');
            },
            fb: function(){
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + $scope.current_url);
            },
            tweet: function(){
                window.open('https://twitter.com/intent/tweet?hashtags='+ window.hashtags + '&text=' + window.title + '&url=' + $scope.current_url);
            },
            wa: function(){
                window.open('https://wa.me/?text=' + encodeURIComponent($scope.current_url));
            },
            in: function(){
                window.open('https://www.linkedin.com/shareArticle?mini=true&title=' + window.title + '&summary=' + window.description + '&url=' + $scope.current_url);
            }
        };

    }]);