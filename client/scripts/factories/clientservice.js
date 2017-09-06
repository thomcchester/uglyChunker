App.factory("ClientService", ["$http", function($http){
    var client = {};

    var alterDefaults = function(object){
        $http.put('/defaults/' + object._id, object).then(function(){
            getDefaults();
        });
    };

    var getDefaults = function(){
        $http.get("/defaults").then(function(response){
            client.defaults = response.data[0];
        });
    };

    var submitEmail = function(data){
        $http.post("/submit", data).then(function(response){
            console.log("this was the response from the service submitemail", response);
        });
    };

    /* the following variable and function are for loading initial values
    into the DB if there are none. there should be no need to include
    them into the return object for this factory. */
    var initialValues = {
        monthlyRentTenantDef:1100,
        monthlyRentTenantMin:100,
        monthlyRentTenantMax:10000,
        monthlyRentPersonalDef:1200,
        monthlyRentPersonalMin:200,
        monthlyRentPersonalMax:10000,
        targetPriceDef:266000,
        targetPriceMin:50000,
        targetPriceMax:5000000,
        downPaymentPercentageDef:3,
        downPaymentPercentageMin:0,
        downPaymentPercentageMax:100,
        mortgageRateDef:4.25,
        mortgageRateMin:0,
        mortgageRateMax:20,
        yearsAmmoritizedDef:10,
        yearsAmmoritizedMin:0,
        yearsAmmoritizedMax:100,
        incomeDef:80000,
        incomeMin:10000,
        incomeMax:1000000,
        mortgageYearsDef:30,
        mortgageYearsMin:0,
        mortgageYearsMax:100,
        vacancyDef:5,
        vacancyMin:0,
        vacancyMax:100,
        propertyTaxDef:1500,
        propertyTaxMin:0,
        propertyTaxMax:10000,
        assocDuesDef:0,
        assocDuesMin:0,
        assocDuesMax:10000,
        managementDef:0,
        managementMin:0,
        managementMax:10000,
        miscDef:1000,
        miscMin:0,
        miscMax:100000,
        insuranceAnnualDef:1000,
        insuranceAnnualMin:0,
        insuranceAnnualMax:5000,
        utilsDef:100,
        utilsMin:0,
        utilsMax:10000,
        legalAccountingDef:100,
        legalAccountingMin:0,
        legalAccountingMax:10000,
        taxBracketDef:28,
        taxBracketMin:39.9,
        taxBracketMax:0,
        repairValueDef:1400,
        repairValueMin:0,
        repairValueMax:100000,
        yearsDef:5,
        yearsMin:0,
        yearsMax:100,
        zipCode: 50466,
        renterInsuranceDef:50,
        renterInsuranceMin:0,
        renterInsuranceMax:4000,
        appreciationRateDef:3,
        appreciationRateMin:0,
        appreciationRateMax:100,
        appreciationRateHomeDef:4,
        appreciationRateHomeMin:0,
        appreciationRateHomeMax:100,
        duplexBuyDef:266000,
        duplexBuyMin:50000,
        duplexBuyMax:5000000


    };

    var checkIfThereIsData = function(){
        $http.get('/checkDB').then(function(response){
            var bool = response.data;
            if(bool === false){
                $http.post('/defaults', initialValues).then(function(response){
                    console.log('getbutts')
                    getDefaults();
                });
            }else{
                getDefaults();
            }
        });
    };
    checkIfThereIsData();

    return {
        alterDefaults: alterDefaults,
        client: client,
        getDefaults: getDefaults,
        submitEmail: submitEmail
    };
}]);
