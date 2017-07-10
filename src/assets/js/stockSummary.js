/*******************************************************************************
 * Copyright 2016 Chaikin Analytics LLC
 *******************************************************************************/
$(document).ready(function() { 
	getHostAddress();
	var inputParameters = getQueryParameters();
	symbol = inputParameters.symbol;
	uid = inputParameters.uid;
	console.log(symbol+" "+uid);
	getSymbolData();
});
var _domain =  "";
var DATA_PATH = "/CPTRestSecure/app";
var symbol = "";
var uid = "";
var isAsync = true;
var description = {
        //new description adding for rating -1 according to specification des 18
	   "-1": "NONE",
		0: "NONE",
		1: "VERY BEARISH",
        2: "BEARISH",
        3: "NEUTRAL",
        4: "BULLISH",
        5: "VERY BULLISH"};


function getHostAddress(){
	_domain = window.location.protocol+"//"+window.location.host;
	//_domain = "http://localhost:8080";
}

function getQueryParameters(){
	var url = location.href;
    if (url == null || url == undefined) {
        url = document.URL;
    }
    var queryParameters = new Object();
    var queryStringPart;
    var url_parts = url.split('?')[1];
	if(url_parts != null || url_parts != undefined){
		url_parts = url_parts.split('&');
	
		for(var i = 0 ; i < url_parts.length ; i++){
			queryStringPart = url_parts[i];
			var stringParts = queryStringPart.split('=');
			if(stringParts[0] == 'symbol' ){
				queryParameters.symbol = stringParts[1];
			}
			if(stringParts[0] == 'environment' ){
				queryParameters.environment = stringParts[1];
			}
			if(stringParts[0] == 'subEnvironment' ){
				queryParameters.subEnvironment = stringParts[1];
			}
			if(stringParts[0] == 'uid' ){
				queryParameters.uid = stringParts[1];
			}
			if(stringParts[0] == 'version' ){
				queryParameters.version = stringParts[1];
			}
			if(stringParts[0] == 'userType' ){
				queryParameters.userType = stringParts[1];
			}
			if(stringParts[0] == 'token' ){
				queryParameters.securityToken = stringParts[1];
			}
			
			
		}
		if (queryParameters.symbol == null || queryParameters.symbol == undefined) {
			queryParameters.symbol = 'AAPL';
		}
		if (queryParameters.uid == null || queryParameters.uid == undefined) {
			queryParameters.uid = null;
		}
		if (queryParameters.version == null || queryParameters.version == undefined) {
			queryParameters.version = null;
		}
		if (queryParameters.environment == null || queryParameters.environment == undefined) {
			queryParameters.environment = 'ipad';
		}
		if(queryParameters.userType == null || queryParameters.userType == undefined){
			queryParameters.userType='user';
		}
		if (queryParameters.securityToken == null || queryParameters.securityToken == undefined) {
			queryParameters.securityToken = null;
		}
    }
	else{
		queryParameters.symbol = 'ON';
		queryParameters.environment = '';
		queryParameters.uid = null;
		queryParameters.version = null;
		queryParameters.userType = 'user';
	}
    return queryParameters;
}

var numberOfCallsCompleted=0;
var totalNoOfApi=5;
function getSymbolData(){
	// uid: uid,
	//initialiseSpinner();
	//showLoader();
	getJSON(_domain+DATA_PATH + "/portfolio/getSymbolData?" + $.param({
	    symbol: symbol.toUpperCase(),
	    components: 'pgr,metaInfo,fundamentalData,EPSData'
	}), function(res){
			numberOfCallsCompleted++;
			if(numberOfCallsCompleted == totalNoOfApi){
				hideLoader();
			}
			appendSymbolData(res);
			GetPGRData(symbolData.symbol,symbolData.industryName,function(){
				appendPgrData();
				numberOfCallsCompleted++;
				if(numberOfCallsCompleted == totalNoOfApi){
					hideLoader();
				}
				
			});
			getSymbolCompititorsData(symbolData.symbol,function(){
				numberOfCallsCompleted++;
				if(numberOfCallsCompleted == totalNoOfApi){
					hideLoader();
				}
			});
			GetResearchReportFundamentalData(symbolData.symbol,function(){
				appendResearchReportFundamentalData();
				numberOfCallsCompleted++;
				if(numberOfCallsCompleted == totalNoOfApi){
					hideLoader();
				}
				
			});
			GetStockSummaryData()
	});

}
function GetStockSummaryData(){
	getJSON(_domain+DATA_PATH + "/stockSummary/getStockSummaryData?" + $.param({
	    symbol: symbol.toUpperCase(),
	    components: 'stockSummaryData,oneYearChartData,fiveYearChartData,oneYearPgrData,fiveYearPgrData'
	}), function(res){

		appendStockSummaryData(res);
		numberOfCallsCompleted++;
		if(numberOfCallsCompleted == totalNoOfApi){
			hideLoader();
		}
	});
}
function appendStockSummaryData(res){
	var data = res.stock_summary_data;	
	symbolData.stock_summary_data = res;
	symbolData.price_book = data.book_value;
	symbolData.pgrText= data.pgr_summary_text;
	symbolData.dividend_per_share = data.dividend_per_share;
	symbolData.payout_ratio = data.payout_ratio;
	symbolData.growth_rate = data.growth_rate;
	
	symbolData.is_etf = data.is_etf;
	symbolData.image_url = data.image_url;

	$("#volume_activity_table").find(".avg_vol_10_days").html(data['avg_vol_10days']);
	$(".PGRcopy-container").find("#pgr_text").html(symbolData.pgrText);

	$("#Corrected_PGR_img").append(`<img src="${pgrCorrectedImages(symbolData['pgr'])}">`)


	$("#financial_assets_liabilities").find(".Book_value").html("$"+parseFloat(symbolData.price_book).toFixed(2));
	$("#financial_valuation").find(".Price_earnings").html(symbolData.price_earning);
	$("#financial_valuation").find(".Price_book").html("$"+symbolData.price_to_book);
	$("#financial_valuation").find(".Price_sales").html(symbolData.price_to_sales);

	$("#financial_dividends").find(".Dividend_per_share").html("$"+parseFloat(symbolData.dividend_per_share).toFixed(2));
	$("#financial_dividends").find(".Payout").html(parseFloat(symbolData.payout_ratio).toFixed(2)+"%");
	$("#financial_dividends").find(".Yield").html(symbolData.yield+"%");
	$("#financial_dividends").find(".Growth_rate").html(parseFloat(symbolData.growth_rate).toFixed(2)+"%");

	
	$("#financial_returns").find(".One_month_return").html(data.one_month_return+"%");
	$("#financial_returns").find(".One_month_return").addClass(changeClass(data.one_month_return))
	$("#financial_returns").find(".Three_month_return").html(data.three_month_return+"%");
	$("#financial_returns").find(".Three_month_return").addClass(changeClass(data.three_month_return))
	appendLogo();
	drawMainChart(symbolData.stock_summary_data,"one_year");
	drawMoneyFlowChart(symbolData.stock_summary_data,"one_year");
}
function appendLogo(){
 var element = $('#stock_summary_logo');
 var template ='';
 // 
 if(symbolData.image_url != ''){
 	template = `<img class="Logo companyLogo" src=${symbolData.image_url}></img><span class="Ticker">${symbolData.symbol}:</span> `
 }else if(symbolData.image_url == '' && symbolData.is_etf == '0'){
 	template = `<img src= "./svgs/logo_none.svg"></img><span class="Ticker">${symbolData.symbol}:</span>`
 		//<div class="baseDefaultCompanyName"><p >sadada</p></div>
 }else if(symbolData.image_url == '' && symbolData.is_etf == '1'){
 	template = `<img src= "./svgs/logo_ETF.svg"></img><span class="Ticker">${symbolData.symbol}:</span>`
 }
 template = template + `Integer non tellus magna. Nunc suscipit aliquet urna, sed molestie lacus auctor vitae. Proin dignissim arcu eget ligula dignissim, id malesuada orci rutrum. Morbi eget nunc et mauris ornare varius. Donec et rutrum dui, quis auctor diam. Morbi ultrices elit in suscipit eleifend. Suspendisse facilisis leo vitae nisi feugiat efficitur. Nullam id libero ut erat molestie ornare. Nunc fringilla euismod neque ut posuere. Suspendisse rhoncus consectetur sapien quis tincidunt.`
 $(element).find('p').append(template)
}
function drawMoneyFlowChart(jsonObj,key){
$("#money-flow-chart").empty();
key = key + '_chart_data';
var chart_data = {
	MoneyFlow : null,
	xAxisData : null,
	timeIndex : []
};
var moneyData = JSON.parse(JSON.stringify(jsonObj[key]['cmf']));
chart_data.MoneyFlow = moneyData.reverse();
var axisData = JSON.parse(JSON.stringify(jsonObj[key]['formatted_dates']));
chart_data.xAxisData = axisData.reverse();

var mainData = [];

for(var i=0;i<chart_data.MoneyFlow.length;i++){
	var obj = {};
	obj.MoneyFlow = parseFloat(chart_data.MoneyFlow[i]);
	obj.xAxisData = chart_data.xAxisData[i];
	obj.timeIndex = i;
	mainData.push(obj);
}

var textStyleConfg={"font-family":" 'Maven Pro',sans-serif","font-size":12,"background":"none","font-color":"#a7a7a7","tick-font-color":"#000","legendTextColor":"white","font-weight":400,"xLabelColor":"white","yLabelColor":"white","chartTitleColor":"white","titleFontSize":15,"gridLineColor":"#E3E3E3"};
var stocChart53=$("#money-flow-chart").stocCharts(textStyleConfg);
stocChart53.buildMoneyFlowChart(mainData);
}

function drawMainChart(jsonObj,key){

	$("#mainChart").empty();
	var data ={
				xAxisLabel :"Years",
				yAxisLabel :"Sale",
				title : "Product Sale",
				yAxisData: null,
				xAxisData : null,
				lineStrokeColor : "#1199FF",
				lineDashedColor : '#FF9C17',
				chaikin_trend : null,
				pgrData : null,
				areaColor : "#E7F5FF"
				}
	var pgrKey = key + '_pgr_data';
	key = key + '_chart_data';
	var pgr = JSON.parse(JSON.stringify(jsonObj[pgrKey]['pgr_data']));			
	data.pgrData = pgr.reverse();
	var yData =  JSON.parse(JSON.stringify(jsonObj[key]['close_price']));
	data.yAxisData = yData.reverse();
	var xData = JSON.parse(JSON.stringify(jsonObj[key]['formatted_dates']));
	data.xAxisData = xData.reverse()
	var chaikintrend =  JSON.parse(JSON.stringify(jsonObj[key]['chaikin_trend_20001']));
	data.chaikin_trend = chaikintrend.reverse()
	//console.log(JSON.stringify(data));
	//'#95d7bb','#fcb322','#e67a77','#aec785'],
	
	var textStyleConfg={"font-family":" 'Maven Pro',sans-serif","font-size":12,"background":"none","font-color":"#a7a7a7","tick-font-color":"#000","legendTextColor":"white","font-weight":400,"xLabelColor":"white","yLabelColor":"white","chartTitleColor":"white","titleFontSize":15,"gridLineColor":"#E3E3E3"};
	var stocChart52=$("#mainChart").stocCharts(textStyleConfg);
	stocChart52.activeAreaChartAnalysis(data);



}
$(document).ready(function () {
   /*$("#radLinePanel").click(function(){
      drawMainChart(symbolData.stock_summary_data);
   });*/
   $("input[name='optradio']").on("change", function () {
   	if(this.value == '1'){
   		drawMainChart(symbolData.stock_summary_data,"one_year");
   	}else{
   		drawMainChart(symbolData.stock_summary_data,"five_year");
   	}

});
})
function pgrRating(rating){
	var pgrTemplateObj ={
		sliderClass : null,
		sliderWidth : null,
		sliderLabel : null
	}
	if(rating==1){
		pgrTemplateObj.sliderClass = 'slider-veryBearish';
		pgrTemplateObj.width = 0;
		pgrTemplateObj.sliderLabel = 'Very Bearish';
	}else if(rating==2){
		pgrTemplateObj.sliderClass = 'slider-bearish';
		pgrTemplateObj.width = 25;
		pgrTemplateObj.sliderLabel = 'Bearish';
	}else if(rating==3){
		pgrTemplateObj.sliderClass = 'slider-neutral';
		pgrTemplateObj.width = 50;
		pgrTemplateObj.sliderLabel = 'Neutral';
	}else if(rating==4){
		pgrTemplateObj.sliderClass = 'slider-bullish';
		pgrTemplateObj.width = 75;
		pgrTemplateObj.sliderLabel = 'Bullish';
	}else if(rating==5){
		pgrTemplateObj.sliderClass = 'slider-veryBullish';
		pgrTemplateObj.width = 100;
		pgrTemplateObj.sliderLabel = 'Very Bullish';
	}
	return pgrTemplateObj;
}

function appendPGRTemplate(rating){
	var pgrTemplateObj = pgrRating(rating);
	var sliderTemplate = `<div class=${pgrTemplateObj.sliderClass}></div>
	<div class="sliderBar" role="progressbar" aria-valuenow="${pgrTemplateObj.width}" aria-valuemin="0" aria-valuemax="100" style="width:${pgrTemplateObj.width}%">
	<span class="sr-only">${pgrTemplateObj.sliderLabel}</span></div>`;
	return sliderTemplate
}
function appendResearchReportFundamentalData(){
	var element = $("#company_detail_container")
	var data = symbolFundamentalDataObject.companyDetails;
	$("#company_profile_summary").html(data.Profile)
	$(element).find(".company_name").html(data.CompanyName)
	$(element).find(".company_street1").html(data.Address1);
	$(element).find(".company_city_state").html(data.City+", "+data.StateCode+" "+data.ZipCode+", "+data.CountryCode)
	$(element).find(".company_phone").html(data.PhoneNumber);
	$(element).find("#company_web").html(data.URL)
	$(element).find("#company_web").attr('href',data.URL)
	$(element).find(".company_employees").html(data.EmployeesCount);
	$(element).find(".company_sector").html(data.Sector);

	element = $("#financial_assets_liabilities");
	$(element).find(".Current_ratio").html(symbolFundamentalDataObject.currentRatio);
	$(element).find(".LT_Debt_Equity").html(symbolFundamentalDataObject.LTDebtEquity);
	$(element).find(".Percent_earned_on_equity").html(parseFloat(symbolData.ROE).toFixed(2)+"%");
	
	element = $("#expertsEstimate-table");
	data = symbolFundamentalDataObject.EarningEstimateRevisions;
	$(element).find(".current_qtr_curr").html(data['Current Qtr'][0]);
	$(element).find(".current_qtr_7days").html(data['Current Qtr'][1]);
	$(element).find(".current_qtr_pct_change").html(data['Current Qtr'][2]);

	$(element).find(".next_qtr_curr").html(data['Next Qtr'][0]);
	$(element).find(".next_qtr_7days").html(data['Next Qtr'][1]);
	$(element).find(".next_qtr_pct_change").html(data['Next Qtr'][2]);

	$(element).find(".current_fy_curr").html(data['Current FY'][0]);
	$(element).find(".current_fy_30days").html(data['Current FY'][1]);
	$(element).find(".current_fy_pct_change").html(data['Current FY'][2]);

	element = $("#expertsAnalyst-table");
	data = symbolFundamentalDataObject.AnalystRecommendations;
	$(element).find(".mean_this_week").html(data['Mean this Week']);
	$(element).find(".mean_last_week").html(data['Mean Last Week']);
	$(element).find(".change").html(data['Change']);
	$(element).find(".mean_5_weeks_ago").html(data['Mean 5 Weeks Ago']);

	element = $("#earningsGrowth-table");
	data = symbolFundamentalDataObject.revenueEarningsGrowth;
	
	$(element).find("thead").append(`<th></th>`);
	for(i=0;i<data['labels'].length;i++){
		var template = `<th><span class="">${data['labels'][i]}</span></th>`
		$(element).find("thead").append(template);
	}

	$(element).find(".Revenue_1_years").html('$'+data['Revenue(M)'][0]);
	$(element).find(".Revenue_2_years").html('$'+data['Revenue(M)'][1]);
	$(element).find(".Revenue_3_years").html('$'+data['Revenue(M)'][2]);
	$(element).find(".Revenue_4_years").html('$'+data['Revenue(M)'][3]);
	$(element).find(".Revenue_current").html('$'+data['Revenue(M)'][4]);


	$(element).find(".Rev_pct_growth_1_years").html(data['Rev % Growth'][0]);
	$(element).find(".Rev_pct_growth_1_years").addClass(changeClass(data['Rev % Growth'][0]));
	$(element).find(".Rev_pct_growth_2_years").html(data['Rev % Growth'][1]);
	$(element).find(".Rev_pct_growth_2_years").addClass(changeClass(data['Rev % Growth'][1]));
	$(element).find(".Rev_pct_growth_3_years").html(data['Rev % Growth'][2]);
	$(element).find(".Rev_pct_growth_3_years").addClass(changeClass(data['Rev % Growth'][2]));
	$(element).find(".Rev_pct_growth_4_years").html(data['Rev % Growth'][3]);
	$(element).find(".Rev_pct_growth_4_years").addClass(changeClass(data['Rev % Growth'][3]));
	$(element).find(".Rev_pct_growth_current").html(data['Rev % Growth'][4]);
	$(element).find(".Rev_pct_growth_current").addClass(changeClass(data['Rev % Growth'][4]));

	$(element).find(".EPS_1_years").html(data['EPS'][0]);
	$(element).find(".EPS_2_years").html(data['EPS'][1]);
	$(element).find(".EPS_3_years").html(data['EPS'][2]);
	$(element).find(".EPS_4_years").html(data['EPS'][3]);
	$(element).find(".EPS_current").html(data['EPS'][4]);

	$(element).find(".EPS_pct_growth_1_years").html(data['EPS % Growth'][0]);
	$(element).find(".EPS_pct_growth_1_years").addClass(changeClass(data['EPS % Growth'][0]));
	$(element).find(".EPS_pct_growth_2_years").html(data['EPS % Growth'][1]);
	$(element).find(".EPS_pct_growth_2_years").addClass(changeClass(data['EPS % Growth'][1]));
	$(element).find(".EPS_pct_growth_3_years").html(data['EPS % Growth'][2]);
	$(element).find(".EPS_pct_growth_3_years").addClass(changeClass(data['EPS % Growth'][2]));
	$(element).find(".EPS_pct_growth_4_years").html(data['EPS % Growth'][3]);
	$(element).find(".EPS_pct_growth_4_years").addClass(changeClass(data['EPS % Growth'][3]));
	$(element).find(".EPS_pct_growth_current").html(data['EPS % Growth'][4]);
	$(element).find(".EPS_pct_growth_current").addClass(changeClass(data['EPS % Growth'][4]));


	element = $("#earningsSurprise-table");
	data = symbolFundamentalDataObject.EPSSurprise;
	

	$(element).find(".Latest_qtr_estimate").html(data['Latest Qtr'][0]);
	$(element).find(".Latest_qtr_actual").html(data['Latest Qtr'][1]);
	$(element).find(".Latest_qtr_difference").html(data['Latest Qtr'][2]);
	$(element).find(".Latest_qtr_difference").addClass(changeClass(data['Latest Qtr'][2]));
	$(element).find(".Latest_qtr_per_diff").html(data['Latest Qtr'][3]+"%");
	$(element).find(".Latest_qtr_per_diff").addClass(changeClass(data['Latest Qtr'][3]));

	$(element).find(".1_qtr_estimate").html(data['1 Qtr Ago'][0]);
	$(element).find(".1_qtr_actual").html(data['1 Qtr Ago'][1]);
	$(element).find(".1_qtr_difference").html(data['1 Qtr Ago'][2]);
	$(element).find(".1_qtr_difference").addClass(changeClass(data['1 Qtr Ago'][2]));
	$(element).find(".1_qtr_per_diff").html(data['1 Qtr Ago'][3]+"%");
	$(element).find(".1_qtr_per_diff").addClass(changeClass(data['1 Qtr Ago'][3]));
	
	$(element).find(".2_qtr_estimate").html(data['2 Qtr Ago'][0]);
	$(element).find(".2_qtr_actual").html(data['2 Qtr Ago'][1]);
	$(element).find(".2_qtr_difference").html(data['2 Qtr Ago'][2]);
	$(element).find(".2_qtr_difference").addClass(changeClass(data['2 Qtr Ago'][2]));
	$(element).find(".2_qtr_per_diff").html(data['2 Qtr Ago'][3]+"%");
	$(element).find(".2_qtr_per_diff").addClass(changeClass(data['2 Qtr Ago'][3]));

	$(element).find(".3_qtr_estimate").html(data['3 Qtr Ago'][0]);
	$(element).find(".3_qtr_actual").html(data['3 Qtr Ago'][1]);
	$(element).find(".3_qtr_difference").html(data['3 Qtr Ago'][2]);
	$(element).find(".3_qtr_difference").addClass(changeClass(data['3 Qtr Ago'][2]));
	$(element).find(".3_qtr_per_diff").html(data['3 Qtr Ago'][3]+"%");
	$(element).find(".3_qtr_per_diff").addClass(changeClass(data['3 Qtr Ago'][3]));


	element = $("#epsQuarterly-table");
	data = symbolFundamentalDataObject.EPSQuarterlyResults.quaterlyData;
	
	$(element).find(".2_years_ago_qtrLabel").html(data[0][0]);
	$(element).find(".2_years_ago_qtr1").html(data[0][1]);
	$(element).find(".2_years_ago_qtr1").addClass(changeClass(data[0][1]));
	$(element).find(".2_years_ago_qtr2").html(data[0][2]);
	$(element).find(".2_years_ago_qtr2").addClass(changeClass(data[0][2]));
	$(element).find(".2_years_ago_qtr3").html(data[0][3]);
	$(element).find(".2_years_ago_qtr3").addClass(changeClass(data[0][3]));
	$(element).find(".2_years_ago_qtr4").html(data[0][4]);
	$(element).find(".2_years_ago_qtr4").addClass(changeClass(data[0][4]));
	
	$('#epsYearly-table').find(".2_years_ago_totalLabel").html(data[0][0]);
	$('#epsYearly-table').find(".2_years_ago_total").html(data[0][5]);
	$('#epsYearly-table').find(".2_years_ago_total").addClass(changeClass(data[0][5]));

	$(element).find(".1_years_ago_qtrLabel").html(data[1][0]);
	$(element).find(".1_year_ago_qtr1").html(data[1][1]);
	$(element).find(".1_year_ago_qtr1").addClass(changeClass(data[1][1]));
	$(element).find(".1_year_ago_qtr2").html(data[1][2]);
	$(element).find(".1_year_ago_qtr2").addClass(changeClass(data[1][2]));
	$(element).find(".1_year_ago_qtr3").html(data[1][3]);
	$(element).find(".1_year_ago_qtr3").addClass(changeClass(data[1][3]));
	$(element).find(".1_year_ago_qtr4").html(data[1][4]);
	$(element).find(".1_year_ago_qtr4").addClass(changeClass(data[1][4]));

	$('#epsYearly-table').find(".1_year_ago_totalLabel").html(data[1][0]);
	$('#epsYearly-table').find(".1_year_ago_total").html(data[1][5]);
	$('#epsYearly-table').find(".1_year_ago_total").addClass(changeClass(data[1][5]));

	$(element).find(".current_qtrLabel").html(data[2][0]);
	$(element).find(".current_qtr1").html(data[2][1]);
	$(element).find(".current_qtr1").addClass(changeClass(data[2][1]));
	$(element).find(".current_qtr2").html(data[2][2]);
	$(element).find(".current_qtr2").addClass(changeClass(data[2][2]));
	$(element).find(".current_qtr3").html(data[2][3]);
	$(element).find(".current_qtr3").addClass(changeClass(data[2][3]));
	$(element).find(".current_qtr4").html(data[2][4]);
	$(element).find(".current_qtr4").addClass(changeClass(data[2][4]));

	$('#epsYearly-table').find(".current_totalLabel").html(data[2][0]);
	$('#epsYearly-table').find(".current_total").html(data[2][5]);
	$('#epsYearly-table').find(".current_total").addClass(changeClass(data[2][5]));

	$(element).find(".current_FY_end").html(symbolFundamentalDataObject.EPSQuarterlyResults['label']);
	$('#epsYearly-table').find(".current_FY_end").html(symbolFundamentalDataObject.EPSQuarterlyResults['label']);


	element = $("#price_activity_table");
	data = symbolFundamentalDataObject.priceActivity2;
	
	$(element).find(".pct_chg_4_weeks").html(data['% Change Price - 4 Weeks']);
	$(element).find(".pct_chg_4_weeks").addClass(changeClass(data['% Change Price - 4 Weeks']));

	$(element).find(".pct_chg_24_weeks").html(data['% Change Price - 24 Weeks']);
	$(element).find(".pct_chg_24_weeks").addClass(changeClass(data['% Change Price - 24 Weeks']));

	$(element).find(".chg_4_weeks_rel_sp").html(data['% Change Price - 4 Wks Rel to S&P']);
	$(element).find(".chg_4_weeks_rel_sp").addClass(changeClass(data['% Change Price - 4 Wks Rel to S&P']));

	$(element).find(".chg_24_weeks_rel_sp").html(data['% Change Price - 24 Wks Rel to S&P']);
	$(element).find(".chg_24_weeks_rel_sp").addClass(changeClass(data['% Change Price - 24 Wks Rel to S&P']));
	
	element = $("#volume_activity_table");
	data = symbolFundamentalDataObject.volumeActivity;
	console.log(data)
	$(element).find(".avg_vol_20_days").html(data['Average Volume 20 Days']);
	$(element).find(".avg_vol_90_days").html(data['Average Volume 90 Days']);
	$(element).find(".money_flow_persistency").html(data['Chaikin Money Flow Persistency']);
	

	/*console.log(data);
	var column = [],label =['x'],x =['Revenue'];
	
	for(var i=0 ; i<data['labels'].length;i++){
		label.push(data['labels'][i]);
		x.push(parseFloat(data['Revenue(M)'][i].replace(/[%,$]/g , "")));
	}
	column.push(label);
	column.push(x)
	drawChartThree(column);*/
//	estimateRevisionChart({EarningEstimateRevisions : symbolFundamentalDataObject.EarningEstimateRevisions,AnalystRecommendations : symbolFundamentalDataObject.AnalystRecommendations},"chart-experts-estimate");
//	estimateRevisionChart2({EarningEstimateRevisions : symbolFundamentalDataObject.EarningEstimateRevisions,AnalystRecommendations : symbolFundamentalDataObject.AnalystRecommendations},"chart-experts-estimate2");
}
var ratingMap = ["WEAK", "NEUTRAL", "STRONG"];
function changeClass(rating){
	rating = parseFloat(rating.replace(/[%,$]/g , ""));
	
	if(rating<0){
		return 'weak';
	}else if(rating > 0){
		return 'strong';
	}else{
		return '';
	}
}
function formatTechnicalRating(rating) {
	/*DES-213 Technical Rank = -1*/
	/*if rating is less than or equal to zero then return NONE for technical Rating*/
	if (rating <= 0) {
		return "NONE";
	} else {
		return ratingMap[rating - 1];
	}
};
function formatIndustryRating(rating) {
		if (!isNaN(rating)) {
			getIndustryRatingColor(rating);
			return (rating > 50) ? "STRONG" : "WEAK";
		}
        else {
        	getIndustryRatingColor(rating);
			return rating;
		}
		
};
function getRatingColor(rating) {
		/*DES-213 Technical Rank = -1*/
		/*if rating is less than or equal to zero then return WHITE COLOR  for technical Rating*/
		if (rating <= 0) {
			/*DES-199 ETFs: Industry Rating - 'None' for ETFs and symbols with no industry*/
			/*changed color from white to grey*/
			return { color: "grey" };
		} else {
			return {
				color: ["#fa1400", "#ff9000", "#00d906"][rating - 1]
			};
		}
    };

   function getIndustryRatingColor(rating) {
		if (isNaN(rating)) {
			/*DES-199 ETFs: Industry Rating - 'None' for ETFs and symbols with no industry*/
			/*changed color from white to grey*/
			$("#Industry_rating").addClass('noneColor')
			//return { color: "grey" };
		}
		else {
			return {
				color: (rating > 50) ? $("#Industry_rating").addClass('strong') : $("#Industry_rating").addClass('weak')
			};
		}
    };
function appendPgrData(){
	var template = appendPGRTemplate(symbolDataObject.financialStrengthRate);
	var element = $("#pgr-slider-section");
	$(element).find("#pgr-financials-section").append(template);

	template = appendPGRTemplate(symbolDataObject.earningsPerformanceRate);
	$(element).find("#pgr-earnings-section").append(template);

	template = appendPGRTemplate(symbolDataObject.priceVolumeActivityRate);
	$(element).find("#pgr-technicals-section").append(template);

	template = appendPGRTemplate(symbolDataObject.investorSentimentRate);
	$(element).find("#pgr-experts-section").append(template);

	template = appendPGRTemplate(symbolDataObject.debtEquityRatioRate);
	$("#financials-slider-section").find("#financials-DebtEquity-section").append(template);

	template = appendPGRTemplate(symbolDataObject.priceToBookValueRate);
	$("#financials-slider-section").find("#financials-bookprice-section").append(template);

	template = appendPGRTemplate(symbolDataObject.returnOnInvestmentRate);
	$("#financials-slider-section").find("#financials-returnequity-section").append(template);

	template = appendPGRTemplate(symbolDataObject.priceToSalesRatioRate);
	$("#financials-slider-section").find("#financials-pricesale-section").append(template);

	template = appendPGRTemplate(symbolDataObject.businessValueRate);
	$("#financials-slider-section").find("#financials-freecashflow-section").append(template);

// Earnings section
	template = appendPGRTemplate(symbolDataObject.earningsStabilityRate);
	$("#earnings-slider-section").find("#earnings-growth-section").append(template);

	template = appendPGRTemplate(symbolDataObject.epsSurpriseRate);
	$("#earnings-slider-section").find("#earnings-surprise-section").append(template);

	template = appendPGRTemplate(symbolDataObject.earningsTrendRate);
	$("#earnings-slider-section").find("#earnings-trend-section").append(template);

	template = appendPGRTemplate(symbolDataObject.projectedPeRatioRate);
	$("#earnings-slider-section").find("#earnings-projected-section").append(template);

	template = appendPGRTemplate(symbolDataObject.earningsConsistencyRate);
	$("#earnings-slider-section").find("#earnings-consistency-section").append(template);

// Technical section
	
	template = appendPGRTemplate(symbolDataObject.relativeStrengthVsMarketRate);
	$("#technicals-slider-section").find("#technicals-relstrength-section").append(template);

	template = appendPGRTemplate(symbolDataObject.chaikinVolumeAccumulationRate);
	$("#technicals-slider-section").find("#technicals-CMFrating-section").append(template);

	template = appendPGRTemplate(symbolDataObject.priceTrendRate);
	$("#technicals-slider-section").find("#technicals-pricestrength-section").append(template);

	template = appendPGRTemplate(symbolDataObject.priceTrendRocRate);
	$("#technicals-slider-section").find("#technicals-price-trendROC").append(template);

	template = appendPGRTemplate(symbolDataObject.volumeTrendRate);
	$("#technicals-slider-section").find("#technicals-volumetrend-section").append(template);

// Experts section
	template = appendPGRTemplate(symbolDataObject.earningEstimatesRevisionRate);
	$("#experts-slider-section").find("#earnings_estimate_trend_rating").append(template);

	template = appendPGRTemplate(symbolDataObject.shortInterestRate);
	$("#experts-slider-section").find("#short_interest_rating").append(template);

	template = appendPGRTemplate(symbolDataObject.insiderActivityRate);
	$("#experts-slider-section").find("#insider_activity_rating").append(template);

	template = appendPGRTemplate(symbolDataObject.analystOptionsRate);
	$("#experts-slider-section").find("#analyst_rating_trend_rating").append(template);

	template = appendPGRTemplate(symbolDataObject.relativeStrengthVsIndustryRate);
	$("#experts-slider-section").find("#industry_rel_strength_rating").append(template);



	resultPGR();
}
function GetPGRData(symbol,industry,callback) {
		
    $.ajax({
        type: "GET",
        url: _domain+DATA_PATH+ "/researchReportServices/getPgrDataAndContextSummary?symbol=" + symbol+"&industry="+industry,
        crossDomain: true,
        async: isAsync,
		beforeSend: function (request) {
			/*if(securityToken != null && securityToken != ''){
				request.setRequestHeader("token",securityToken);
			}*/
		},
        success: function(response) {//On Successful service call
			
			var parsedJsonArray=jQuery.parseJSON(response)
			//alert(response.pgrData[0].isPgrCorrected);
            var JSONResponse = parsedJsonArray["pgrData"][0];//eval("(" + response["pgrData"][0] + ")");
            
			symbolDataObject.isPgrCorrected = JSONResponse["isPgrCorrected"];
			symbolDataObject.pgrValue = JSONResponse["pgr_value"];
			symbolDataObject.correctedPGR = JSONResponse["corrected_pgr"];
			
			symbolDataObject.financialStrength = JSONResponse["financial_strength"];
			symbolDataObject.debtEquityRatio = JSONResponse["debt_equity_ratio"];
			symbolDataObject.priceToBookValue = JSONResponse["price_to_book_value"];
			symbolDataObject.returnOnInvestment = JSONResponse["return_on_investment"];
			symbolDataObject.priceToSalesRatio = JSONResponse["price_to_sales_ratio"];
			symbolDataObject.businessValue = JSONResponse["business_value"];
			
			symbolDataObject.earningsPerformance = JSONResponse["earnings_performance"];
			symbolDataObject.epsSurprise = JSONResponse["eps_surprise"];
			symbolDataObject.projectedPeRatio = JSONResponse["projected_pe_ratio"];
			symbolDataObject.earningsTrend = JSONResponse["earnings_trend"];
			symbolDataObject.earningsStability = JSONResponse["earnings_stability"];
			symbolDataObject.earningsConsistency = JSONResponse["earnings_consistency"];
			
			symbolDataObject.priceVolumeActivity = JSONResponse["price_volume_activity"];
			
			symbolDataObject.priceTrend = JSONResponse["price_trend"];
			symbolDataObject.priceTrendRoc = JSONResponse["price_trend_roc"];
			symbolDataObject.relativeStrengthVsMarket = JSONResponse["relative_strength_vs_market"];
			symbolDataObject.chaikinVolumeAccumulation = JSONResponse["chaikin_volume_accumulation"];
			symbolDataObject.volumeTrend = JSONResponse["volume_trend"];
			
			
			symbolDataObject.investorSentiment = JSONResponse["investor_sentiment"];
			
			symbolDataObject.earningEstimatesRevision = JSONResponse["earning_estimates_revision"];
			symbolDataObject.shortInterest = JSONResponse["short_interest"];
			symbolDataObject.insiderActivity = JSONResponse["insider_activity"];
			symbolDataObject.analystOptions = JSONResponse["analyst_options"];
			symbolDataObject.relativeStrengthVsIndustry = JSONResponse["relative_strength_vs_industry"];
			
			// set ratings
			
			symbolDataObject.isPgrCorrected = JSONResponse["isPgrCorrected"];
			symbolDataObject.pgrValueRate = JSONResponse["pgr_value_rate"];
			symbolDataObject.correctedPGRRate = JSONResponse["corrected_pgr_rate"];
			
			symbolDataObject.financialStrengthRate = JSONResponse["financial_strength_rate"];
			symbolDataObject.debtEquityRatioRate = JSONResponse["debt_equity_ratio_rate"];
			symbolDataObject.priceToBookValueRate = JSONResponse["price_to_book_value_rate"];
			symbolDataObject.returnOnInvestmentRate = JSONResponse["return_on_investment_rate"];
			symbolDataObject.priceToSalesRatioRate = JSONResponse["price_to_sales_ratio_rate"];
			symbolDataObject.businessValueRate = JSONResponse["business_value_rate"];
			
			symbolDataObject.earningsPerformanceRate = JSONResponse["earnings_performance_rate"];
			symbolDataObject.epsSurpriseRate = JSONResponse["eps_surprise_rate"];
			symbolDataObject.projectedPeRatioRate = JSONResponse["projected_pe_ratio_rate"];
			symbolDataObject.earningsTrendRate = JSONResponse["earnings_trend_rate"];
			symbolDataObject.earningsStabilityRate = JSONResponse["earnings_stability_rate"];
			symbolDataObject.earningsConsistencyRate = JSONResponse["earnings_consistency_rate"];
			
			symbolDataObject.priceVolumeActivityRate = JSONResponse["price_volume_activity_rate"];
			
			symbolDataObject.priceTrendRate = JSONResponse["price_trend_rate"];
			symbolDataObject.priceTrendRocRate = JSONResponse["price_trend_roc_rate"];
			symbolDataObject.relativeStrengthVsMarketRate = JSONResponse["relative_strength_vs_market_rate"];
			symbolDataObject.chaikinVolumeAccumulationRate = JSONResponse["chaikin_volume_accumulation_rate"];
			symbolDataObject.volumeTrendRate = JSONResponse["volume_trend_rate"];
			
			
			symbolDataObject.investorSentimentRate = JSONResponse["investor_sentiment_rate"];
			//symbolDataObject.creationDate=JSONResponse["pgr_date"];
			
			symbolDataObject.earningEstimatesRevisionRate = JSONResponse["earning_estimates_revision_rate"];
			symbolDataObject.shortInterestRate = JSONResponse["short_interest_rate"];
			symbolDataObject.insiderActivityRate = JSONResponse["insider_activity_rate"];
			symbolDataObject.analystOptionsRate = JSONResponse["analyst_options_rate"];
			symbolDataObject.relativeStrengthVsIndustryRate = JSONResponse["relative_strength_vs_industry_rate"];
			
			var pgrContextSummaryResponse=parsedJsonArray.pgrContextSummary[0];
			updatePgrContextSummary(pgrContextSummaryResponse);
			
			var financialContextSummaryResponse=parsedJsonArray.financialContextSummary[0];
			updateFinancialContextSummary(financialContextSummaryResponse);
			
			var earningsContextSummaryResponse=parsedJsonArray.earningsContextSummary[0];
			updateEarningsContextSummary(earningsContextSummaryResponse);

			var expertOpnionsContextSummaryResponse=parsedJsonArray.expertOpnionsContextSummary[0];
			updateExpertOpnionsContextSummary(expertOpnionsContextSummaryResponse);

			var priceVolumeContextSummaryResponse=parsedJsonArray.priceVolumeContextSummary[0];
			updatePriceVolumeContextSummary(priceVolumeContextSummaryResponse);
			
			/*
			
			var pgrArcClass=pgrArcImageMap[symbolDataObject.correctedPGRRate];
			$("#pgrArcLarge").attr("class",pgrArcClass);
			*/
			if(callback){
				callback();
			}

        },
        error: function(error) {
		
          /*  showError();
            document.getElementById("industry").innerHTML = "";        
           
			document.getElementById("companyName").innerHTML = "";            
			document.getElementById("creationDate").innerHTML = "";
            GetPrognosisDataText(p_list_id);*/
        }
    });
}


	function getJSON(url,callback){
		$.ajax({
	        type: "GET",
	        url: url,
	        dataType: "json",
	        crossDomain: true,
	        async: isAsync,
			beforeSend: function (request) {
				/*if(securityToken != null && securityToken != ''){
					request.setRequestHeader("token",securityToken);
				}*/
			},
	        success: function(response) {//On Successful service call
	   			
				callback(response);
	        },
	        error: function(error) {
	          /* showError();*/
			   callback(null);
	        }
    	});
	}

	function calculateMarketCap(num){
		return	num < 1000 ? ((num).toFixed(2) + "m") : (num/1000).toFixed(2) + "b"
	}
	function roundOff(num){
		return Math.round(num * 100) / 100;
	}
	function appendSymbolData(response){
		var metaInfo = response.metaInfo[0];
		var fundamentalData = response.fundamentalData;
		if(metaInfo != undefined){
			symbolData.symbol = metaInfo.symbol;
			symbolData.company = metaInfo.name;
			symbolData.change = metaInfo.Change;
			symbolData.percentageChange = metaInfo['Percentage '];
			symbolData.lastPrice = metaInfo.Last;
			symbolData.industryName = metaInfo.industry_name;
			symbolData.marketCap = calculateMarketCap(metaInfo.marketCap);
			symbolData.yield = fundamentalData.Yield;
			symbolData.pgr = metaInfo.PGR;
			if (metaInfo["industry_ListID "] == 0) {
					symbolData.industry = formatIndustryRating("NONE");
			}
			else {

				symbolData.industry = formatIndustryRating(metaInfo.listRating);
			}
			symbolData.trends = formatTechnicalRating(metaInfo['TechnicalRating ']);
			if(symbolData.trends =='NONE'){
				$('#Trends_rating').addClass('noneColor');
			}else{
				$('#Trends_rating').addClass((symbolData.trends).toLowerCase());	
			}
			
			symbolData.raw_pgr = metaInfo.raw_PGR;
			symbolData.ROE = fundamentalData.ROE;
			symbolData.price_earning = parseFloat(fundamentalData["P/E"]).toFixed(2);
			symbolData.price_to_book = parseFloat(fundamentalData["Price/Book"]).toFixed(2);
			symbolData.price_to_sales = parseFloat(fundamentalData["Price/Sales"]).toFixed(2);
		}
		else{
			symbolData.symbol = 'ON'
		}

		var element = $("#stockDetail");

		// first section
		$(element).find(".stockName #Company_name").html(symbolData.company);
		$(element).find(".stockName #Ticker").html(symbolData.symbol);

		$(element).find(".stockPrice #Last_price").html("$"+symbolData.lastPrice);
		$(element).find(".stockPrice #Net_change").html(symbolData.change);
		$(element).find(".stockPrice #Percent_change").html("("+symbolData.percentageChange+"%)");


		$(element).find(".stockIndustry #Industry").html(symbolData.industryName);
		$(element).find(".stockIndustry #Sector").html("Communications Discretionary");//symbolDataObject.sector

		$(element).find(".stockAdditional #Market_cap").html(symbolData.marketCap);
		$(element).find(".stockAdditional #Yield").html(symbolData.yield+"%");

		//second section
		document.getElementById("pgrStatus").innerHTML = ratingLabel(symbolData.pgr);
		$(element).find(".industryRating-container #Industry_rating").html(symbolData.industry);
		$(element).find(".industryRating-container #Trends_rating").html(symbolData.trends);
		$("#pgrStatus").addClass(getPGRClass(symbolData.pgr));

		
	}

function getPGRClass(rating){

	if(typeof rating == 'number'){
		if(rating == 1){
		return 'veryBearish';
		}else if(rating == 2){
			return 'bearish';
		}else if(rating == 3){
			return 'neutral';
		}else if(rating == 4){
			return 'bullish';
		}else if(rating == 5){
			return 'veryBullish';
		}else{
			return '';
		}
	}else{
		if(rating == 'Very Bearish'){
		return 'veryBearish';
		}else if(rating == 'Bearish'){
			return 'bearish';
		}else if(rating == 'Neutral'){
			return 'neutral';
		}else if(rating == 'Bullish'){
			return 'bullish';
		}else if(rating == 'Very Bullish'){
			return 'veryBullish';
		}else{
			return '';
		}
	}

}


function GetResearchReportFundamentalData(symbol,callback) {
      
    $.ajax({
        type: "GET",
        url: _domain+DATA_PATH + "/researchReportServices/getResearchReportData?symbol=" + symbol,
        crossDomain: true,
        async: isAsync,
		beforeSend: function (request) {
			//console.log(symbol+":"+environment+":"+subEnvironment+":"+version+":"+uid);
			/*request.setRequestHeader("symbol",symbol);
			request.setRequestHeader("environment", environment);
			request.setRequestHeader("subEnvironment", subEnvironment);
			request.setRequestHeader("version", version);
			request.setRequestHeader("uid", uid);
			if(securityToken != null && securityToken != ''){
				request.setRequestHeader("token",securityToken);
			}*/
		},
        success: function(response) {//On Successful service call
            var JSONResponse = eval("(" + response + ")");
            symbolFundamentalDataObject.company = JSONResponse["CompanyName"];
			symbolFundamentalDataObject.price = JSONResponse["Price"];
			symbolFundamentalDataObject.industry = JSONResponse["Industry"];
			symbolFundamentalDataObject.date = JSONResponse["Date"];
			symbolFundamentalDataObject.tradingDate = JSONResponse["TradingDate"];	
			
			/*
			var companyName = document.getElementById("companyName");
			if (symbolExists) {
                companyName.innerHTML = symbolFundamentalDataObject.company+" ("+symbol+")";
            }
            else {
                companyName.innerHTML = "";
            }*/
			/*document.getElementById("industry").innerHTML = "Industry: "+symbolFundamentalDataObject.industry ;	
			document.getElementById("creationDate").innerHTML = "Generated: "+symbolFundamentalDataObject.date ;	*/
			
			var asset = JSONResponse["Assets and Liabilities"];
			
			symbolFundamentalDataObject.currentRatio=parseFloat(asset["Current Ratio"]).toFixed(2);
			symbolFundamentalDataObject.LTDebtEquity = parseFloat(asset["LT Debt/Equity"]).toFixed(2);
			
			var valuation = JSONResponse["Valuation"];
			symbolFundamentalDataObject.priceBook=parseFloat(valuation["Price/Book"]).toFixed(2);
			symbolFundamentalDataObject.priceSales = parseFloat(valuation["Price/Sales"]).toFixed(2);
			
			var returns = JSONResponse["Returns"];
			console.log(returns);
			symbolFundamentalDataObject.returnOnEquity=parseFloat(returns["Return on Equity"]).toFixed(2);
			symbolFundamentalDataObject.returnOnInvest = parseFloat(returns["Return on Invest"]).toFixed(2);
			$("#financial_returns").find(".Return_on_investment").html(symbolFundamentalDataObject.returnOnInvest+"%");
			$("#financial_returns").find(".Return_on_equity").html(symbolFundamentalDataObject.returnOnEquity+"%");
			// For 5 Year Revenue and Earnings Growth table
			symbolFundamentalDataObject.revenueEarningsGrowth = JSONResponse["Revenue&EarningsGrowth"]; 
			//For EPS Estimates table
			symbolFundamentalDataObject.EPSEstimates = JSONResponse["EPS Estimates"]; 
			
			//For EPS Surprise table
			symbolFundamentalDataObject.EPSSurprise = JSONResponse["EPS Surprises"]; 
			
			//For EPS Quarterly Results table
			symbolFundamentalDataObject.EPSQuarterlyResults = JSONResponse["EPS Quarterly Results"]; 
			
			// Data for Price Activities tables
			
			symbolFundamentalDataObject.priceActivity1 = JSONResponse["PriceActivity1"]; 
			
			symbolFundamentalDataObject.priceActivity2 = JSONResponse["PriceActivity2"]; 
			symbolFundamentalDataObject.volumeActivity = JSONResponse["VolumeActivity"]; 
			symbolFundamentalDataObject.newsStroies = JSONResponse["News"]; 
			
			symbolFundamentalDataObject.EarningEstimateRevisions = JSONResponse["Earning Estimate Revisions"]; 
			symbolFundamentalDataObject.AnalystRecommendations = JSONResponse["Analyst Recommendations"]; 
			symbolFundamentalDataObject.EPSSummary = JSONResponse["EPS Estimates Revision Summary"]; 
			symbolFundamentalDataObject.companyDetails = JSONResponse["Details"]; 
			if(callback){
				callback();
			}
		
	     },
        error: function(error) {
		
            showError();
            callback()
        }
    });
}

function getSymbolCompititorsData(symbol,callback){
//$("#competitorsHeader").html(symbol+"'s Competitors in "+symbolFundamentalDataObject.industry);
$.ajax({
        type: "GET",
        url: _domain+DATA_PATH + "/researchReportServices/getTickerCompetitors?symbol=" + symbol,
        crossDomain: true,
        async: isAsync,
		beforeSend: function (request) {
			/*if(securityToken != null && securityToken != ''){
				request.setRequestHeader("token",securityToken);
			}*/
		},
        success: function(response) {//On Successful service call
            var JSONResponse = eval("(" + response + ")");
            var compititors = JSONResponse["compititors"];
            updateSymbolCompititorTable(compititors);
			callback();
        },
        error: function(error) {
           showError();
		   callback();
        }
    });

}
function showError(){
}
function pgrCorrectedImages(rating){
	var imageUrl = "images/";
	if(rating==1){
		return imageUrl+"Arc-Large_verybearish.svg"
	}
	else if(rating==2){
		return imageUrl+"Arc-Large_Bearish.svg"
	}else if(rating==3){
		return imageUrl+"Arc-Large_Neutral.svg"
	}else if(rating==4){
		return imageUrl+"Arc-Large_Bullish.svg"
	}else if(rating==5){
		return imageUrl+"Arc-Large_verybullish.svg"
	}else{
		return imageUrl+"Arc-Large_None.svg"
	}

}

function compititorTableImages(rating){
	var imageUrl = "images/";
	if(rating==1 || rating==2){
		return imageUrl+"pgr-small-veryBearish.svg"
	}
	else if(rating==4 || rating==5){
		return imageUrl+"pgr-small-bullish.svg"
	}else{
		return imageUrl+"pgr-small-neutral.svg"
	}

}
function updateSymbolCompititorTable(compititors){
	$("#industry-name").html(symbolData.industryName.toUpperCase());
	
	var datatemp = compititors[0];
	if(datatemp!=undefined){
		symbolData.PEG = datatemp.PEG;
	$("#financial_valuation").find(".PEG").html(symbolData.PEG);
	var row = `<tr style="border-bottom:1px solid #efefef;">
				<td class="dataLabel" style="padding-bottom:15px;"><span style="margin-right:5px;" class="current_rating"><img src="${compititorTableImages(datatemp['corrected_pgr_rate'])}"></span><span class="current_ticker">${datatemp.symbol}</span></td>
				<td  style="padding-bottom:15px;"><span class="${changeClass(datatemp['Historic EPS growth'])} current_eps_growth">${datatemp['Historic EPS growth']}</span></td>
				<td  style="padding-bottom:15px;"><span class="current_profit">${datatemp['Profit Margin']}</span></td>
				<td  style="padding-bottom:15px;"><span class="current_PE">${datatemp['PE']}</span></td>
				<td  style="padding-bottom:15px;"><span class="current_revenue">${datatemp['Revenue(M)']}</span></td>
			</tr>`
	$("#competitor-experts-table").append(row);
	for(var i=1; i<compititors.length; i++){
		if(i>3){
			break;
		}
		datatemp = compititors[i];
		var compititorNumber = "competitor"+i;
		row = `<tr>
				<td class="dataLabel" style="padding-top:15px;"><span class="${compititorNumber}_rating" style="margin-right:5px;"><img src="${compititorTableImages(datatemp['corrected_pgr_rate'])}"></span><span class="${compititorNumber}_ticker">DISH</span></td>
				<td style="padding-top:15px;"><span class="${changeClass(datatemp['Historic EPS growth'])} ${compititorNumber}_eps_growth">${datatemp['Historic EPS growth']}</span></td>
				<td style="padding-top:15px;"><span class="${compititorNumber}_profit">${datatemp['Profit Margin']}</span></td>
				<td style="padding-top:15px;"><span class="${compititorNumber}_PE">${datatemp['PE']}</span></td>
				<td style="padding-top:15px;"><span class="${compititorNumber}_revenue">${datatemp['Revenue(M)']}</span></td>
			</tr>`;
		$("#competitor-experts-table").append(row);
	}

	}
	
}
	function ratingLabel(rating) {
		return description[rating];
    };
		

    /*function getJSON(url, success, discardPreviousRequests) {
        previousSuccesses[url] = success;
        $.ajax({
            url: url,
            dataType: "json",
            crossDomain: true,
            statusCode: {
                403: function(data) {

                    success("ForceLogout");
                }
            },
            beforeSend: function(request) {
                request.setRequestHeader("environment", "desktop");
                request.setRequestHeader("version", "1.3.4");
                request.setRequestHeader("uid", uid);
                //CFD-51
                if (isTrialUser) {
                    request.setRequestHeader("subEnvironment", "chaikinPowerSuite");
                }
            },

            xhrFields: {
                withCredentials: true
            },

            complete: function(xhr, status) {

                if (status === 'error' || !xhr.responseText) {
                    //                    console.log("Error: " + textStatus);
                    //                    var as = $injector.get('AuthService');
                    //                    as.logout();
                } else {
                    var data = $.parseJSON(xhr.responseText);

                    if (discardPreviousRequests) {
                        if (success == previousSuccesses[url]) {
                            success(data, status, xhr);
                        }
                    } else {
                        success(data, status, xhr);
                    }
                }
            }
        });

    }	*/

    function updatePgrContextSummary(pgrContextSummaryResponse){
	
		var JSONResponse = pgrContextSummaryResponse;
       	//document.getElementById("pgrStatus").innerHTML = JSONResponse["status"];
		
		document.getElementById("pgrMainSentence").innerHTML = JSONResponse["mainSentence"];
		document.getElementById("pgrAdditonalSentence").innerHTML = JSONResponse["additonalSentence"];
		//document.getElementById("pgrNeutralSentence").innerHTML = JSONResponse["neutralSentence"];
			
	}

	function updateFinancialContextSummary(financialContextSummaryResponse){
		var JSONResponse = financialContextSummaryResponse;
		document.getElementById("FSRStatus").innerHTML = JSONResponse["status"];
		$("#FSRStatus").addClass(getPGRClass(JSONResponse["status"]));
		document.getElementById("FSRGeneralSentence").innerHTML = JSONResponse["generalSentence"];
		document.getElementById("FSRExplanatorySentence").innerHTML = JSONResponse["explanatorySentence"];
	}

	function updateEarningsContextSummary(earningsContextSummaryResponse){
		var JSONResponse = earningsContextSummaryResponse;
		document.getElementById("EPRStatus").innerHTML = JSONResponse["status"];
		$("#EPRStatus").addClass(getPGRClass(JSONResponse["status"]));
		document.getElementById("EPRGeneralSentence").innerHTML = JSONResponse["generalSentence"];
		document.getElementById("EPRExplanatorySentence").innerHTML = JSONResponse["explanatorySentence"];			
	}

	function updatePriceVolumeContextSummary(priceVolumeContextSummaryResponse){
		var JSONResponse = priceVolumeContextSummaryResponse;
		document.getElementById("PVAStatus").innerHTML = JSONResponse["status"];
		$("#PVAStatus").addClass(getPGRClass(JSONResponse["status"]));
		document.getElementById("PVAGeneralSentence").innerHTML = JSONResponse["generalSentence"];
		document.getElementById("PVAExplanatorySentence").innerHTML = JSONResponse["explanatorySentence"];			
	}

	function updateExpertOpnionsContextSummary(expertOpnionsContextSummaryResponse){
		var JSONResponse = expertOpnionsContextSummaryResponse;
		document.getElementById("ExpertOpinionsStatus").innerHTML = JSONResponse["status"];
		$("#ExpertOpinionsStatus").addClass(getPGRClass(JSONResponse["status"]));
		document.getElementById("ExpertOpinionsGeneralSentence").innerHTML = JSONResponse["generalSentence"];
		document.getElementById("ExpertOpinionsExplanatorySentence").innerHTML = JSONResponse["explanatorySentence"];
	}

function showLoader(){
	$('#reportLoader').show();
}

function hideLoader(){
	$('#reportLoader').hide();
}
function initialiseSpinner(){
	var opts = {
        lines: 11, // The number of lines to draw
        length: 12, // The length of each line
        width: 3, // The line thickness
        radius: 8, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 35, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#C0C0C0', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 68, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '100px', // Top position relative to parent in px*/
        left: '210px' // Left position relative to parent in px
        	
    };
    var target = document.getElementById('reportLoader');
    var spinner = new Spinner(opts).spin(target);
}
    function resultPGR(){
    	  var bars = $('.sliderBar');

        $.each(bars, function(index, div) {
            // get raw width
            var rawWidth = div.style.width;
            // parse width to int
            var width = parseInt(rawWidth.slice(0, -1));

            if (width <= 25) {
                /* Old browsers */
                $(this).css({
                        background: "#EF5A00"
                    })
                    /* FF3.6-15 */
                $(this).css({
                        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 100%)"
                    })
                    /* Chrome10-25,Safari5.1-6 */
                $(this).css({
                    background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 100%)"
                });
                /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                $(this).css({
                        background: "linear-gradient(to right, #e00000 0%,#ef5a00 100%)"
                    })
                    /* IE6-9 */
                $(this).css({
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#ef5a00',GradientType=1 )"
                })
            } else if (width > 25 && width <= 50) {
                /* Old browsers */
                $(this).css({
                        background: "#ffbe00"
                    })
                    /* FF3.6-15 */
                $(this).css({
                        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 50%, #ffbe00 100%)"
                    })
                    /* Chrome10-25,Safari5.1-6 */
                $(this).css({
                    background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 50%,#ffbe00 100%)"
                });
                /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                $(this).css({
                        background: "linear-gradient(to right, #e00000 0%,#ef5a00 50%,#ffbe00 100%)"
                    })
                    /* IE6-9 */
                $(this).css({
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#ffbe00',GradientType=1 )"
                })
            } else if (width > 50 && width <= 75) {
                /* Old browsers */
                $(this).css({
                        background: "#61C600"
                    })
                    /* FF3.6-15 */
                $(this).css({
                        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 33%, #ffbe00 66%, #61c600 100%)"
                    })
                    /* Chrome10-25,Safari5.1-6 */
                $(this).css({
                    background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 33%,#ffbe00 66%,#61c600 100%)"
                });
                /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                $(this).css({
                        background: "linear-gradient(to right, #e00000 0%,#ef5a00 33%,#ffbe00 66%,#61c600 100%)"
                    })
                    /* IE6-9 */
                $(this).css({
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#61c600',GradientType=1 )"
                })
            } else if (width == 100) {
                /* Old browsers */
                $(this).css({
                        background: "#24a300"
                    })
                    /* FF3.6-15 */
                $(this).css({
                        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 25%, #ffbe00 50%, #61c600 75%, #24a300 100%)"
                    })
                    /* Chrome10-25,Safari5.1-6 */
                $(this).css({
                    background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 25%,#ffbe00 50%,#61c600 75%,#24a300 100%)"
                });
                /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                $(this).css({
                        background: "linear-gradient(to right, #e00000 0%,#ef5a00 25%,#ffbe00 50%,#61c600 75%,#24a300 100%)"
                    })
                    /* IE6-9 */
                $(this).css({
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#24a300',GradientType=1 )"
                })
            }
        });
    }