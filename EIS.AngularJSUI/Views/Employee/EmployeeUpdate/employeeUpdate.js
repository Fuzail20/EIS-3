
appEIS.factory('employeeUpdateService', function ($http) {
    var empUpdateObj = {};

    empUpdateObj.getByEid = function (eid) {
        var Emp;
        Emp = $http({ method: 'Get', url: 'https://localhost:44391/api/Employee', params: { id: eid } }).
            then(function (response) {
                return response.data;
            });
        return Emp;
    };
    empUpdateObj.updateEmployee = function (emp) {
        var Emp;
        Emp = $http({ method: 'Put', url: 'https://localhost:44391/api/Employee', data:emp }).
            then(function (response) {
                return response.data;
            }, function (error) {
                    return error.data;
            });
        return Emp;
    }

    return empUpdateObj;
})


appEIS.controller('employeeUpdateController', function ($scope, $routeParams, employeeUpdateService, utilityService) {
    $('#profilePanel a').click(function (e) {
        e.preventDefault();
    });
    $scope.eid = $routeParams.EmployeeId;
    $scope.getByEid = employeeUpdateService.getByEid($scope.eid).then(function (result) {
        $scope.Emp = result;
        $scope.Emp.DOJ = new Date($scope.Emp.DOJ);
    });
    $scope.UpdateEmployee = function (Emp, IsValid) {
        if (IsValid) {
            employeeUpdateService.updateEmployee(Emp).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "You have successfully Updated " + result.EmployeeId;
                    $scope.Flg = true;
                    $scope.serverErrorMsgs = "";
                    utilityService.myAlert();
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };

});
