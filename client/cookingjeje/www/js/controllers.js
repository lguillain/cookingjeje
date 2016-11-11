angular.module('cookingjeje.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

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
    };

    // Open the login modal
    $scope.create = function() {
      $scope.creationForm.show();
    };


      // Perform the login action when the user submits the login form
      $scope.doCreation = function() {
        menuFactory.getEvents().save($scope.event);
        $scope.event = {
          name:"German Bratwurst1", description:"Das ist die erste tolle german Bratwurst",
          maxParticipants:15, image:'../img/bratwurst.png', location:"Hall III", date:'2016-11-09T00:00:00.000Z',
          id:56, clientId:0};

      };

  })

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


  .controller('EventController', ['$scope', 'menuFactory', 'baseURL', function($scope, menuFactory, baseURL) {

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

    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };




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
