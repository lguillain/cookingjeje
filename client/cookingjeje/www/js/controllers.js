angular.module('cookingjeje.controllers', [])

  .controller('AppCtrl', ['menuFactory', '$scope', '$ionicModal', 'baseURL', '$state', function(menuFactory, $scope, $ionicModal, baseURL, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.baseURL = baseURL;

    // Form data for the login modal
    $scope.event = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/createevent.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.creationForm = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeCreation = function() {
      $scope.creationForm.hide();
      console.log('closeCreation');
    };

    // Open the login modal
    $scope.create = function() {
      $scope.creationForm.show();
    };


      // Perform the login action when the user submits the login form
      $scope.doCreation = function() {
        menuFactory.getEvents().save($scope.event);
        $scope.event = {
          name:$scope.event.name, description:$scope.event.description,
          maxParticipants:$scope.event.maxParticipants, image:'../img/bratwurst.png', location:$scope.event.location, date:$scope.event.date,
          clientId:0};

        $state.go($state.current, {}, {reload: true});

        console.log($scope.event);

        $scope.closeCreation();
      };

  }])

/*  .controller('MenuController', ['$scope', 'menuFactory', 'baseURL', '$ionicListDelegate', function($scope, menuFactory, baseURL, $ionicListDelegate) {

    $scope.baseURL = baseURL;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";


    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };



  }])*/


/*  .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {

    $scope.sendFeedback = function() {

      console.log($scope.feedback);

      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        $scope.invalidChannelSelection = false;
        feedbackFactory.save($scope.feedback);
        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.feedback.mychannel="";
      //  $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])*/





  // implement the IndexController and About Controller here

  /*.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 'baseURL', function($scope, menuFactory, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leader = corporateFactory.get({id:3});
    $scope.showDish = false;
    $scope.message="Loading ...";
    $scope.dish = menuFactory.getDishes().get({id:0})
      .$promise.then(
        function(response){
          $scope.dish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
        }
      );
    $scope.promotion = menuFactory.getPromotion().get({id:0});

  }])*/


  .controller('EventController', ['$scope', '$state', 'menuFactory', 'baseURL', '$ionicPopup', function($scope, $state, menuFactory, baseURL, $ionicPopup) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    menuFactory.getEvents().query(
      function(response) {
        $scope.events = response;
        $scope.showMenu = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      });

    $scope.toggleDelete = function () {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
      console.log($scope.shouldShowDelete);
    }

    $scope.deleteEvent = function (eventid) {

      var confirmPopup = $ionicPopup.confirm({
        title: '<h3>Confirm Delete</h3>',
        template: '<p>Are you sure you want to delete this event?</p>'
      });


      confirmPopup.then(function (res) {
        if (res) {
          console.log('Ok to delete');
          menuFactory.getEvents().delete({id: eventid});

          $state.go($state.current, {}, {reload: true});
          $window.location.reload();
          console.log('reloaded');
        } else {
          console.log('Canceled delete');
        }
      });

      $scope.shouldShowDelete = false;


    }

  }])

/*  .filter('myEventFilter', function () {
    return function (events) {
      var out = [];
      for (var i = 0; i < events.length; i++) {
          if (events[i].admin === "dennis")
            out.push(events[i]);
        }
      return out;
    }})*/

;
