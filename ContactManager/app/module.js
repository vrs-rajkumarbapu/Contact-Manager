var webAPIURL = "http://localhost:63008";// web api URL
var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    'Access-Control-Allow-Headers': 'true',
    'Access-Control-Allow-Credendtials': 'true',
    'Content-Type': 'application/json;charset=utf-8'
};//Header to access web api
//Create the application module named 'contactDetailApp'
window.app = angular.module('contactDetailApp', ['ngRoute', 'ngResource', 'ngCookies', 'toaster']);

//route configuration for the demo controller
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/demo', { templateUrl: '/home/demo', controller: 'DemoController' })
}]);

//demo controller
app.controller('DemoController', function ($scope, toaster, dataService) {   
    $scope.show = true;   // to show or hide sections of the page 
    function loadRecords() {
        var contactdetaildata = dataService.get();
        contactdetaildata.then(function (pdata) {
            $scope.contactdetaildata = pdata.data;           
            $scope.show = true;
        },
        function (error) {
            alert('error');
        });
    };//To load all contacts stored in the database
    function clearText() {
        $scope.modelState = [];
        $scope.contactdetail = { ID: 0, FirstName: '', LastName: '', Email: '', Born: '', Cellphone: '', IsActive: false };
        $scope.show = false;
    }//To clear input controls and error messages
    function getDateFormat(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDay())
    }//TO get date format
    loadRecords();
    $scope.add = function () {
        clearText();
        $scope.modelState = [];
    }//Prepare to add new contact
    $scope.save = function () {
        $scope.contactdetail.LastUpdated = new Date();
        if ($scope.contactdetail && $scope.contactdetail.Born)
            $scope.contactdetail.Born = getDateFormat($scope.contactdetail.Born);
        var saveData = $scope.contactdetail;
        if (saveData.ID > 0) {
            var updateContactdetail = dataService.put(saveData);
            updateContactdetail.then(function (prmData) {
                alert('Data updated');
                loadRecords();
                clearText();
            }, function (error) {
                $scope.modelState = error.data;
                alert('An error occured');
            });
        }
        else {
            var saveContactdetail = dataService.post(saveData);
            saveContactdetail.then(function (pdata) {
                loadRecords();
                clearText();

            }, function (error) {
                debugger;
                $scope.modelState = error.data;
            });


        }

    };//To save a contact into database
    $scope.edit = function (data) {
        $scope.show = false;
        $scope.contactdetail = angular.copy(data);
        $scope.contactdetail.Born = new Date($scope.contactdetail.Born);
    };//To edit a contact into database
    $scope.delete = function (data) {
        if (confirm('Are you Sure?')) {
            var deleteContactdetail = dataService.delete(data);
            deleteContactdetail.then(function (pd) {
                alert('Data Deleted Successfully');
                clearText();
                loadRecords();
                
            }, function (error) {
                alert('An error Occured');
            });
        }
    };//To delete a contact from database
    $scope.cancel = function () {
        $scope.contactmanagerform.$setPristine();        
        $scope.show = true;
       
    };//To cancel add/edit action in UI
});

//data service for the contactDetailApp module
angular.module('contactDetailApp').service('dataService', ['$http', function ($http) {    
    var baseUrl = webAPIURL + "/api/contacts/";

    this.post = function (contactdetail) {
        var request = $http({
            method: 'post',
            url: baseUrl,
            data: contactdetail
        });
        return request;
    }// http post method to post a contact to the server for save.
    this.put = function (contactdetail) {
        var request = $http({
            method: 'put',
            url: baseUrl,
            data: contactdetail
        });
        return request;
    }// http put method to put a contact to the server for edit.
    this.delete = function (contactdetail) {
        var request = $http({
            method: 'delete',
            url: baseUrl + contactdetail.ID
        });
        return request;
    }// http delete method to delete a contact from the database through server.
    this.get = function () {
        return $http.get(baseUrl);
    }// http get method to get list of all contacts saved in database.
}]);

//directive to check the input is numeric
app.directive('numeric', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {

            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                else if (val.trim() == '')
                    return true;
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});