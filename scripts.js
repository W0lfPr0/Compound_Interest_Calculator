var initialInvestment;
var weeklyContribution;
var estimatedInterestRate;
var lengthOfTimeInMonths;
var language;

var HeaderNames;
var HeaderNamesEnglish        = ["Week"  ,"Initial Invest"   ,"Contr","Weekly Profit"   ,"Total Profit"];
var HeaderNamesSpanish = ["Semana","Inversión Inicial","Contr","Ganancia Semanal","Ganancia Total"];

function CalculateWeeklyProfit(initialInvestment, estimatedInterestRate){
    var weeklyProfit = (initialInvestment * estimatedInterestRate).toFixed(2);
    return parseFloat(weeklyProfit); 
}

function CalculateWeeklyTotal(initialInvestment, weeklyProfit) {    
    var weeklyTotal =  (parseFloat(initialInvestment) +  parseFloat(weeklyProfit)).toFixed(2);
    return parseFloat(weeklyTotal);
}

function AddWeeklyContribution(weeklyTotal, weeklyContribution) {
    var addedWeekleyContribution = (parseFloat(weeklyTotal) + parseFloat(weeklyContribution)).toFixed(2);
    return parseFloat(addedWeekleyContribution);
}

function CalculateWeeksOnMonths(lengthOfTimeInMonths ) {
    var weekOnMonths = (lengthOfTimeInMonths * 4).toFixed(2);
    return parseFloat(weekOnMonths);
}

function ConvertToDecimalInterestRate (estimatedInterestRate){
    var decimalInterestRate = (estimatedInterestRate/100).toFixed(3);
    return parseFloat(decimalInterestRate);
}

function DisplayAnyAlert(text){
    alert(text);
}

function USDollarFormatter (number){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
}

function GetUserInput(){
    initialInvestment     = document.getElementById('InitialInvestmentInput').value;
    weeklyContribution    = document.getElementById('WeeklyContributionInput').value;
    lengthOfTimeInMonths  = document.getElementById('LengthOfTimeInMonthsInput').value;
    estimatedInterestRate = document.getElementById('EstimatedInterestRateInput').value;
    language              = document.getElementById('Lang').value;
}

function Calculate(){
    
    GetUserInput();

    var ListOfProfit = [];

    var decimalInterestRate     = ConvertToDecimalInterestRate(estimatedInterestRate)
    var lengthOfTimeInWeeks     = CalculateWeeksOnMonths(lengthOfTimeInMonths)
    
    var weeklyProfit            = 0;
    var weeklyTotal             = 0;
    
    for (var i = 0; i < lengthOfTimeInWeeks; i++){
        
        var profit = new Profit();

        if (i!=0){
            initialInvestment = AddWeeklyContribution(weeklyTotal, weeklyContribution);  
            profit._weeklyContribution    = weeklyContribution;          
        }

        weeklyProfit = CalculateWeeklyProfit(initialInvestment, decimalInterestRate);
        weeklyTotal  = CalculateWeeklyTotal(initialInvestment, weeklyProfit);        
        
        profit._weekNumber            = (i+1);
        profit._initialInvestment     = initialInvestment;
        

        profit._decimalInterestRate   = decimalInterestRate;
        profit._estimatedInterestRate = estimatedInterestRate;
        profit._weeklyProfit          = weeklyProfit;
        profit._weeklyTotal           = weeklyTotal;

        ListOfProfit.push(profit);
    }
    PrintTableValues(ListOfProfit);
}

function PrintTableValues (ListOfProfit){
    
    var table  = document.getElementById('ResultsTable');
    table.innerHTML = "";
    
    var thead = document.createElement('thead');
    var tr    = document.createElement('tr');
    
    if (language =="EN"){
        HeaderNames = HeaderNamesEnglish
    }else {
        HeaderNames = HeaderNamesSpanish
    }    
        
    HeaderNames.forEach(headerName => {    
        var th = document.createElement('th')
        th.setAttribute("scope","col");
        var cellData = document.createTextNode(headerName);
        th.appendChild(cellData);
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
    tBody = document.createElement('tbody');

    ListOfProfit.forEach(profit => {
        
        var dataArray = [document.createTextNode(profit._weekNumber), 
                  document.createTextNode(USDollarFormatter(profit._initialInvestment)),
                  document.createTextNode(profit._weeklyContribution),
                  document.createTextNode(USDollarFormatter(profit._weeklyProfit)),
                  document.createTextNode(USDollarFormatter(profit._weeklyTotal))];
        
        var tr =document.createElement('tr')

        dataArray.forEach(data =>{            
            var td = document.createElement('td');
            td.setAttribute("scope","row");
            td.appendChild(data);
            tr.appendChild(td);
        });
        
        tBody.appendChild(tr);

    });
    table.appendChild(tBody);

    
    
}


