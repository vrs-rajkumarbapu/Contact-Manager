app.directive('serverValidate', ['$http', function ($http) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, ele, attrs, c) {
            //console.log('wiring up ' + attrs.ngModel + ' to controller ' + c.$name);
            scope.$watch('modelState', function () {
                debugger;
                if (scope.modelState == null) return;
                var modelStateKey = attrs.serverValidate || attrs.ngModel;
                modelStateKey = modelStateKey.replace('$index', scope.$index);               
                modelStateKey = modelStateKey.substring(modelStateKey.indexOf(".") + 1, modelStateKey.length);
                var statemodel;
                var ErrorMessage = '';

                angular.forEach(scope.modelState, function (item, key) {
                    debugger;
                    key = key.substring(key.indexOf(".") + 1, key.length);
                    if (modelStateKey == key)
                    {
                        if (item.Errors)
                            ErrorMessage = item.Errors[0].ErrorMessage;
                        else
                            ErrorMessage = '';
                    }
                    
                });
                //for (var i = 0; i < scope.modelState.length; i++) {

                //    if (scope.modelState[i].PropertyName == modelStateKey) {
                //        errormodel = scope.modelState[i];
                //        break;
                //    }
                //}
                 c.$setValidity('server', true);
                 if (ErrorMessage != '') {
                    c.$setValidity('server', false);
                    c.$error.server = { "errorMessage": ErrorMessage };

                } else {
                    c.$setValidity('server', true);
                }


                ele.bind('focus', function (evt) {
                    c.$setValidity('server', true);
                }).bind('blur', function (evt) {
                    c.$setValidity('server', true);
                });
            });

            scope.$watch(attrs.ngModel, function (oldValue, newValue) {
                
                if (oldValue != newValue) {
                    c.$setValidity('server', true);
                    c.$error.server = '';
                }
            });
        }
    };
}]);
