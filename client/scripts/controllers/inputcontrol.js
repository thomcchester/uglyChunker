App.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService) {
    //Independent Variables
    var clientService = ClientService;
    console.log('clientService', clientService)


    $scope.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };



$scope.inputData = {};

$scope.minMax = {};

$scope.getDefaults = function() {
  $http.get("/defaults").then(function(response){
      defaultVariables = response.data[0];
      $scope.minMax = defaultVariables;

      $scope.inputData.monthlyRentPersonal= defaultVariables.monthlyRentPersonalDef;
      $scope.inputData.monthlyRentTenant= defaultVariables.monthlyRentTenantDef;
      $scope.inputData.targetPrice= defaultVariables.targetPriceDef;
      $scope.inputData.downPaymentPercentage= defaultVariables.downPaymentPercentageDef;
      $scope.inputData.mortgageRate= defaultVariables.mortgageRateDef;
      $scope.inputData.yearsAmmoritized= defaultVariables.yearsAmmoritizedDef;
      $scope.inputData.income= defaultVariables.incomeDef;
      $scope.inputData.mortgageYears= defaultVariables.mortgageYearsDef;
      $scope.inputData.vacancy= defaultVariables.vacancyDef;
      $scope.inputData.propertyTax= defaultVariables.propertyTaxDef;
      $scope.inputData.assocDues= defaultVariables.assocDuesDef;
      $scope.inputData.management= defaultVariables.managementDef;
      $scope.inputData.misc= defaultVariables.miscDef;
      $scope.inputData.insuranceAnnual= defaultVariables.insuranceAnnualDef;
      $scope.inputData.utils= defaultVariables.utilsDef;
      $scope.inputData.legalAccounting= defaultVariables.legalAccountingDef;
      $scope.inputData.taxBracket= defaultVariables.taxBracketDef;
      $scope.inputData.repairValue= defaultVariables.repairValueDef;
      $scope.inputData.years= defaultVariables.yearsDef;
      $scope.inputData.maritalStatus = false;
      $scope.inputData.zipCode = defaultVariables.zipCode;
      $scope.inputData.appreciationRate =defaultVariables.appreciationRateDef;
      $scope.inputData.appreciationRateHome =defaultVariables.appreciationRateHomeDef;
      $scope.inputData.renterInsurance = defaultVariables.renterInsuranceDef;
      $scope.inputData.duplexBuy = defaultVariables.duplexBuyDef;

  });
};
$scope.getDefaults();
console.log("duplexBuy", $scope.inputData.duplexBuy)

var service = ClientService;

$scope.$watchCollection('inputData', function(newVal, oldVal){
    console.log(newVal, "newval");
    console.log("duplexBuy", $scope.inputData.duplexBuy);
    var incomeTaxBracket =function(income){
      if(newVal.maritalStatus==false){
        if(newVal.income<=9225){
          incomeTax=10
        }else if(newVal.income<=37450){
          incomeTax=15
        }else if(newVal.income<=90750){
          incomeTax=25
        }else if(newVal.income<=189300){
          incomeTax=28
        }else if(newVal.income<=411500){
          incomeTax=33
        }else if(newVal.income<=411500){
          incomeTax=33
        }else if(newVal.income<=413200){
          incomeTax=35
        }else{
          incomeTax=39.6
        }
      }else{
        if(newVal.income<=18450){
          incomeTax=10
        }else if(newVal.income<=37450*2){
          incomeTax=15
        }else if(newVal.income<=90750*2){
          incomeTax=25
        }else if(newVal.income<=189300*2){
          incomeTax=28
        }else if(newVal.income<=411500*2){
          incomeTax=33
        }else if(newVal.income<=411500*2){
          incomeTax=33
        }else if(newVal.income<=413200*2){
          incomeTax=35
        }else{
          incomeTax=39.6
        }
      }
      return incomeTax;
    }
  var capitalGainsTax= function(){
    var iTB=incomeTaxBracket();
    if(iTB==10){
      cGT=10
    }else if(iTB==15){
      cGT=15
    }else{
      cGT=25;
    }
    return cGT
}

console.log(capitalGainsTax(), "asd" )
  //calculate Principle
  var principle = function(whichKind){
    var hold=whichKind-(whichKind*newVal.downPaymentPercentage/100);
    return hold
  };



  //calculate monthly mortgage payments
  var mortgageMonthlyPayments=function(mortgageTerm,whichKind){
    hold= (newVal.mortgageRate/12/100)*principle(whichKind);
    var interestRateTerm=Math.pow((1+newVal.mortgageRate/12/100),(mortgageTerm*-1));
    monthPay= hold/(1-(interestRateTerm));
    return monthPay
  };

  var monthlyOperatingExpenses=function(whichKind){
    var repairs=.006*whichKind;
    var legal = 100;
    var total= newVal.propertyTax+repairs+newVal.utils+legal+newVal.insuranceAnnual;
    return total/12;
  }


    var balanceFunction = function(howMuchTime,whichKind){
      var rateIncrease=1+newVal.mortgageRate/12/100;
      var rateTime= Math.pow(rateIncrease,howMuchTime);
      var principleRateTime=principle(whichKind)*rateTime;
      var payment = mortgageMonthlyPayments(newVal.mortgageYears*12,whichKind);
      var rateTimeMinusOne=rateTime-1;
      var monthRate= newVal.mortgageRate/12/100;
      var minusBal= (rateTimeMinusOne/monthRate)*payment;
      var balance = principleRateTime-minusBal
      return balance;
    };

    //continous appreciation
    var appreciationFunction = function(howMuchTime,whichKind,whichKindRate){
      var p=principle(whichKind);


        var a=1+whichKindRate/12/100

      var t=howMuchTime;
      var part=p*Math.pow(a,t);
      part=part-principle(whichKind);

      return part;
    };


    var saleFunction = function(howMuchTime,whichKind,whichKindRate){
      var tot=appreciationFunction(howMuchTime,whichKind,whichKindRate)-balanceFunction(howMuchTime,whichKind);
      tot=tot*(1-capitalGainsTax()/100);
      return tot;
  };

  //depreciation total over the time
    var decpreciationFunction= function(howMuchTime){
      var personalPropertyDep=howMuchTime*newVal.duplexBuy*(.05*.2);
        if (personalPropertyDep>=newVal.duplexBuy*.05){
          personalPropertyDep=newVal.duplexBuy*.05
        }

      var buildingValueDep=howMuchTime*newVal.duplexBuy*(.5*.0348);
        if (buildingValueDep>=newVal.duplexBuy*.5){
          buildingValueDep=newVal.duplexBuy*.5
        }

      var landImprovementDep=howMuchTime*newVal.duplexBuy*(.05*.2);
        if (landImprovementDep>=newVal.duplexBuy*.2){
          landImprovementDep=newVal.duplexBuy*.2
        }

      var totDep=landImprovementDep+buildingValueDep+personalPropertyDep;
      var totDep=totDep/12/2;


      return totDep;
    };

    //rental information over whole time TODO NOT WORKING
    var rentFunctionTenant= function(howMuchTime){
      rent=newVal.monthlyRentTenant*howMuchTime;

      insurance=newVal.renterInsurance*howMuchTime;

      rentTot=rent+insurance+newVal.utils*howMuchTime;
      return rentTot
    };

    var rentFunction= function(howMuchTime){
      rent=newVal.monthlyRentPersonal*howMuchTime;
      rent=rent*(1-incomeTaxBracket()/100)

      return rent
    };
    console.log(rentFunction(newVal.years), "rentFunction")




    //buy function over all time
    var buyFunctionMonthCostDuringMortgageTerm= function(whichKind){
        var monthCost=mortgageMonthlyPayments(newVal.mortgageYears*12,whichKind);
        var operatingCosts=monthlyOperatingExpenses(whichKind)
        var tot=operatingCosts+monthCost;
        return tot
    }

    var buyFunctionMonthCostPostMortgageTerm=function(whichKind){
      var tot=monthlyOperatingExpenses(whichKind);
      return tot
    }


    var totalBuy=function(howMuchTime,whichKind,whichKindRate){
      downPayment=newVal.downPaymentPercentage/100*whichKind;
      if(howMuchTime<=newVal.mortgageYears*12){
        normalPay=buyFunctionMonthCostDuringMortgageTerm(whichKind)*howMuchTime
      }else{
        firstPart=buyFunctionMonthCostDuringMortgageTerm(whichKind)*newVal.mortgageYears*12
        secondPart=(newVal.mortgageYears*12-howMuchTime)*buyFunctionMonthCostPostMortgageTerm(whichKind);
        normalPay=firstPart+secondPart;
      }
      totalPay=normalPay+downPayment-appreciationFunction(howMuchTime,whichKind,whichKindRate);
      return totalPay;
    }



    var totDuplex=function(howMuchTime,whichKind,whichKindRate){
      var buySame=totalBuy(howMuchTime,whichKind,whichKindRate);
      var dep = decpreciationFunction(howMuchTime);
      var rent= rentFunctionTenant(howMuchTime);
      var tot= buySame-dep-rent;
      return tot
    }
    console.log(totDuplex(newVal.years*12,newVal.duplexBuy,newVal.appreciationRate), "duplex Function")

      $scope.buy[1].v = Math.floor(totalBuy(newVal.years*12,newVal.targetPrice,newVal.appreciationRateHome));
      console.log($scope.buy[1].v, "buy");
      $scope.rent[1].v = Math.floor(rentFunction(newVal.years*12));
      console.log($scope.rent[1].v, "rent");
      $scope.buyAndRent[1].v = Math.floor(totDuplex(newVal.years*12,newVal.duplexBuy,newVal.appreciationRate));
      console.log($scope.buyAndRent[1].v, "duplex");


      var messageShow = function(){
          console.log("horse hockey");
          console.log($scope.buy,$scope.rent,$scope.buyAndRent);
          if ($scope.buy[1].v < $scope.rent[1] && $scope.buy[1].v < $scope.buyAndRent[1].v) {
              $scope.topMessage = "save money by buying.";
          }
          if ($scope.rent[1].v < $scope.buy[1].v && $scope.rent[1].v < $scope.buyAndRent[1].v) {
              $scope.topMessage = "save money by renting.";

          }
          if ($scope.buyAndRent[1].v < $scope.rent[1].v && $scope.buyAndRent[1].v < $scope.buy[1].v) {
              $scope.topMessage = "earn $" + Math.floor($scope.buyAndRent[1].v)*(-1) + " by investing in a duplex!";
          }
      };
      messageShow();


      $scope.buyValues = [];
      $scope.rentValues = [];
      $scope.buyAndRentValues = [];

      count=0;
      var absoluteFunction= function(){
        for(var i=0;i<newVal.years*12;i++){
          count++;
          $scope.buyValues.push(totalBuy(i,newVal.targetPrice,newVal.appreciationRateHome));
          $scope.buyAndRentValues.push(totDuplex(i,newVal.duplexBuy,newVal.appreciationRate));
          $scope.rentValues.push(rentFunction(i));
        };
      };


      absoluteFunction();


      var dynamicRows = [];
      var populateDynamicRows = function(){
          for (var i = 0; i < newVal.years*12; i++) {
              var newRow = {
                              "c":
                                  [
                                      {
                                          "v": i
                                      },
                                      {
                                          "v": $scope.rentValues[i]
                                      },
                                      {
                                          "v": $scope.buyValues[i]
                                      },
                                      {
                                          "v": $scope.buyAndRentValues[i]
                                      }
                                  ]
              }
              dynamicRows.push(newRow);
          };
          console.log(newRow, "newRow")
      }
      populateDynamicRows();

      $scope.hiddenChartObject = {
          "type": "LineChart",
          "data": {
              "cols": [
                  {
                      "id": "year",
                      "label": "Years",
                      "type": "string"
                  },
                  {
                      "id": "buy-line",
                      "label": "Rent",
                      "type": "number"
                  },
                  {
                      "id": "rent-line",
                      "label": "Buy",
                      "type": "number"
                  },
                  {
                      "id": "buyAndRent-line",
                      "label": "Duplex",
                      "type": "number"
                  }
              ],
              "rows": dynamicRows
          },
          "options": {
              "title": "Cost Of Investment Over Time",
              "isStacked": true,
              "fill": 20,
              "displayExactValues": true,
              "vAxis": {
                  "title": "Return"

              },
              "hAxis": {
                  "title": "Months"
              },
              "animation":{
                  duration: 300,
                  easing: 'out',
              },
              "colors":['lightblue', 'blue', 'rgb(255,64,129)']

          },
          "formatters": {}
      }


});




    ///chart stuffff
    $scope.$watch.years=3;

    $scope.myChartObject = {};

    $scope.myChartObject.type = "ColumnChart";



    // $scope.$watch('monthlyRentPersonal', function(newVal, oldVal) {
    //     $log.info newVal
    // });

    $scope.rent = [
        {v: "Rent"},
        {v: 200},
        {v: 'lightblue'}
    ];

    $scope.buy = [
        {v: "Buy"},
        {v: $scope.outputData},
        {v: 'blue'}
    ];

    $scope.buyAndRent = [
        {v: "Duplex"},
        {v: 600},
        {v: 'rgb(255,64,129)'}
    ];

    $scope.myChartObject.data = {
        "cols": [
            {id: "options", label: "Options", type: "string"},
            {id: "dollars", label: "Dollars", type: "number"},
            {role: "style", type: "string"}
        ],
        "rows": [

            {c: $scope.rent},
            {c: $scope.buy},
            {c: $scope.buyAndRent}
        ]
    };

    $scope.myChartObject.options = {
        'title': 'Cost Comparison',
        animation:{
            duration: 1000,
            easing: 'out',
        },
        legend: "none"
    };


    $scope.submitEmail = function() {
        data = {
            email: $scope.submit.email,
            maritalStatus: $scope.inputData.maritalStatus,
            zipCode: $scope.inputData.zipCode,
            income: $scope.inputData.income,
            targetPropertyPrice: $scope.inputData.targetPropertyPrice,
            followup: ""
        };
        clientService.submitEmail(data);
        $scope.submit.email = "";
    }


}]);
