AppAdmin.factory("AdminService", ["$http", function($http){
    var admin = {};

    var alterDefaults = function(object){
        $http.put('/defaults/' + admin.defaults._id, object).then(function(){
            console.log(object);
        });
    };

    var deleteTheContact = function(deleteId){
      console.log("deleteTheContact deleteID: ", deleteId);
      $http.put("/submit/delete/:id", deleteId).then(function(){
        getContacts();
      });
    };

    var updateTheContact = function(change){
      $http.put("/submit/statusChange/:id", change).then(function(){
        getContacts();
      });
    };

    var updateTheContactBack = function(change){
      $http.put("/submit/statusChangeBack/:id", change).then(function(){
        getContacts();
      });
    };

    return {
        admin: admin,
        alterDefaults : alterDefaults,
        deleteTheContact: deleteTheContact,
        updateTheContact: updateTheContact,
        updateTheContactBack: updateTheContactBack
    };
}]);
