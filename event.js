angular.module('Events', ['ui.router'])
.factory('eventFactory', [
    function() {
        var o = {
            events: []
        };
        return o;
    }
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })
        .state('events', {
            url: '/events/{id}',
            templateUrl: '/events.html',
            controller: 'EventsCtrl'
        });
        $urlRouterProvider.otherwise('home');
    }
])

.controller('MainCtrl',[
    '$scope',
    '$stateParams',
    'eventFactory', 
    function($scope, $stateParams, eventFactory){
        $scope.events = eventFactory.events;
        
        $scope.addEvent = function(){
            if($scope.formContent === '') { return; }
            
            $scope.events.push({
                title: $scope.titleContent,
                upvotes: 0,
                attendees: $scope.attendeesContent.split(','),
                questions: []
            });
            $scope.titleContent = '';
            $scope.attendeesContent = '';
        };
    }
])

.controller('EventsCtrl', [
    '$scope',
    '$stateParams',
    'eventFactory',
    function($scope, $stateParams, eventFactory){
        $scope.event = eventFactory.events[$stateParams.id];
      
        $scope.addQuestion = function() {
            if($scope.body === '') { return; }
            $scope.event.questions.push({
                body: $scope.body,
                upvotes: 0
            });
            $scope.body = '';
        };
    
        $scope.incrementUpvotes = function(question) {
            question.upvotes += 1;
        };
    }
]);