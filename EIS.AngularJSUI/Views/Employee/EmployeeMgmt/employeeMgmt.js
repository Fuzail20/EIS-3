appEIS.factory('employeeMgmtService', function ($http) {
    empMgmtObj = {};

    empMgmtObj.getAll = function () {
        var Emps;

        //Emps = $http({
        //    method: 'Get', url: 'https://localhost:44391/api/Employee'}).
        //    then(function (response) {
        //        return response.data;

        //    });
        Emps = $http({
            method: 'Get', url: 'https://localhost:44391/api/Employee' }).
            then(function (response) {
                return response.data;

            });

        return Emps;
    };
    empMgmtObj.createEmployee = function (emp) {
        var Emp;
        Emp = $http({ method: 'Post', url: 'https://localhost:44391/api/Employee', data: emp }).
            then(function (response) {
                return response.data;
            }, function (error) {
                return error.data;
            });
        return Emp;
    };

    empMgmtObj.deleteEmployeeById = function (eid) {
        var Emps;
        Emps = $http({ method: 'Delete', url: 'https://localhost:44391/api/Employee', params: {id:eid} }).
            then(function (response) {
                return response.data;
            });
        return Emps;
    };
    return empMgmtObj;
});


appEIS.controller('employeeMgmtController', function ($scope, employeeMgmtService, utilityService,$window) {
    $scope.msg = "Hi I am in emploee Mgmt Controller and also I changed my code a bit";
    employeeMgmtService.getAll().then(function (result) {
        $scope.Emps = result;
    });

    $scope.Sort = function (col) {
        $scope.Key = col;
        $scope.AscOrDesc = !$scope.AscOrDesc;
    };
    $scope.CreateEmployee = function (Emp, IsValid) {
        if (IsValid) {
            Emp.Password = utilityService.randomPassword();
            employeeMgmtService.createEmployee(Emp).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "You have successfully created " + result.EmployeeId;
                    $scope.Flg = true;
                    employeeMgmtService.getAll().then(function (result) {
                        $scope.Emps = result;
                    });
                    utilityService.myAlert();
                }
                else
                {
                    $scope.serverErrorMsgs = result.ModelState;
                }
               
            });
        }
    };

    $scope.DeleteEmployeeById = function (Emp) {
        if ($window.confirm("Do you want to delete Employee with Id:" + Emp.EmployeeId + "?")) {
            employeeMgmtService.deleteEmployeeById(Emp.EmployeeId).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "You have successfully deleted " + result.EmployeeId;
                    $scope.Flg = true;
                    utilityService.myAlert();
                    employeeMgmtService.getAll().then(function (result) {
                        $scope.Emps = result;
                    });
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };
});
