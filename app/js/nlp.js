


var keyupTimer;			// Keyup timer
var textAreaVal; 		// NLP Text Area
var position; 			// Global cursor position
var productTerms	 	= ['10 Year', '15 Year', '20 Year', '25 Year', '30 Year'];
var productNames	 	= ['CONVENTIONAL FIXED', 'CONVENTIONAL 97% LTV', 'CONVENTIONAL 7/1 ARM', 'CONVENTIONAL 5/1 ARM (2/2/5)', 'CONV FIXED HOME READY', 'CONF FIXED TX CASH OUT (A6)', 'HIGH BALANCE CONVENTIONAL FIXED', 'VA FIXED', 'NON-CONFORMING VA FIXED', 'FHA FIXED', 'NON-CONFORMING FHA', 'FHA 5/1 ARM', 'FHA FIXED 30-YR DISASTER ASST HURRICANES', 'FHA FIXED 30-YR DISASTER ASST', 'NON-CONFORMING FHA FIXED 30 YR', 'RURAL DEVELOPMENT', 'BUILDER CONVENTIONAL 5/1 ARM (2/2/5)', 'BUILDER CONVENTIONAL 97% FIXED', 'BUILDER NON-CONFORMING VA FIXED', 'BUILDER NON-CONFORMING FHA 30YR', 'BUILDER CONVENTIONAL FIXED', 'BUILDER VA FIXED', 'BUILDER FHA FIXED', 'BUILDER RURAL DEVELOPMENT', 'BUILDER CONVENTIONAL 7/1 ARM', 'BUILDER NON-CONFORMING FHA FIXED', 'BUILDER NON-CONFORMING VA'];
//var loanPurpose 	 	= ['purchase', 'purchasing', 'refinance', 'buy', 'buying'];
var propertyTypeArray 	= ['Single Family Home', 'Condo', 'Townhome', 'Duplex'];
var loanPurpose 		= ['Primary Residence', 'Second Home', 'Vacation Home'];
var loanAmountKW 		= ['price', 'total', 'amount'];
var termArrays 			= ['productTerms', 'productNames', 'loanPurpose', 'propertyTypeArray'];
var stateAbbreviations 	= ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'];
var lookupWords 		= {};
var freeFormObj 		= {};
var globalObj 			= {'tfAddress':null, 'tfCityState':null, 'tfZipCode':null, 'tfCounty':null, 'tfProductType':null, 'tfProductName':null, 'tfLoanTerm':null, 'tfLoanPurpose':null, 'tfPropertyType':null, 'tfLoanType':null, 'tfLoanAmount':null, 'tfDownPaymentAmount':null, 'tfLTV':null};

var scenariosObj 		= { 
							'adminFeeBuyout': true, 
							'amortizationTerm': 0, 
							'amortizationType': 'FIXED', 
							'cashOut': true, 
							'combinedLtv': 0, 
							'conforming': true, 
							'debtToIncome': 0, 
							'documentationType': 'FULL_ALT', 
							'downPaymentAssistance': true, 
							'escrowsWaived': 'FULL', 
							'externalSupplierId': 'string', 
							'fico': 0, 
							'floatDown': true, 
							'highCombinedLtv': 0, 
							'interestOnly': true, 
							'latePayments': 'ONE', 
							'lien': 'FIRST', 
							'loanAmount': 0, 
							'loanPurpose': 'REFINANCE', 
							'loanSupplierRelationship': 'UNKNOWN', 
							'lockTerm': 0, 
							'ltv': 0, 
							'mortgageInsurancePercent': 0, 
							'mortgageInsuranceType': 'FAMC_LENDER_PAID', 
							'ownerType': 'string', 
							'ownershipType': 'PRIMARY_RESIDENCE', 
							'productSubType': 'string', 
							'productType': 'string', 
							'propertyCounty': 'string', 
							'propertyState': 'ALABAMA', 
							'propertyType': 'SINGLE_FAMILY_RESIDENCE', 
							'rateReservation': true, 
							'servicingRetained': true, 
							'subordinateLoanAmount': 0, 
							'tradeLoanType': 'ASSIGNMENT_OF_TRADE', 
							'underwritingType': 'DESKTOP_UNDERWRITER', 
							'units': 'ONE'
						};

var scenariosResponse = {"transactionId":"d7a00165-694f-4cd5-82b8-ea24b6b40e2a","pricedProducts":[{"productName":"fha-conforming-fixed","serviceResolvesLoanSupplyPricing":{"transactionId":"d7a00165-694f-4cd5-82b8-ea24b6b40e2a","grid":[{"pricingCellId":"N/A","loanSupplierPrice":"\u0001û","lockTerm":75,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥","lockTerm":75,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£u","lockTerm":60,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001<","lockTerm":45,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦V","lockTerm":90,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Í","lockTerm":30,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ñ","lockTerm":45,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤ß","lockTerm":45,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ó","lockTerm":90,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\"","lockTerm":30,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001x","lockTerm":60,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001³","lockTerm":60,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¡","lockTerm":15,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\"","lockTerm":60,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦\u0000","lockTerm":60,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001³","lockTerm":30,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001P","lockTerm":75,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¡\u001C","lockTerm":45,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢\u0016","lockTerm":75,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢","lockTerm":60,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\u0001","lockTerm":45,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥Ù","lockTerm":75,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001L","lockTerm":30,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001(","lockTerm":15,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢{","lockTerm":15,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¼","lockTerm":75,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Â","lockTerm":45,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001³","lockTerm":90,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦ë","lockTerm":75,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ÿ","lockTerm":30,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ª","lockTerm":45,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Ï","lockTerm":75,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001§h","lockTerm":60,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001x","lockTerm":90,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¹","lockTerm":15,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001L","lockTerm":90,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢","lockTerm":30,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0004","lockTerm":90,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«ø","lockTerm":60,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001~","lockTerm":15,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\\","lockTerm":15,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ó","lockTerm":60,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£u","lockTerm":90,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦V","lockTerm":30,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Õ","lockTerm":45,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001§h","lockTerm":30,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤ù","lockTerm":15,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001","lockTerm":75,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦V","lockTerm":60,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001","lockTerm":45,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0004","lockTerm":30,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦\u0000","lockTerm":30,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u00016","lockTerm":75,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0006","lockTerm":15,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0004","lockTerm":60,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001R","lockTerm":15,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Ó","lockTerm":15,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤","lockTerm":75,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¡þ","lockTerm":45,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢ø","lockTerm":75,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤\n","lockTerm":15,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ªþ","lockTerm":15,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤|","lockTerm":45,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤","lockTerm":45,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u00019","lockTerm":60,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Í","lockTerm":90,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\"","lockTerm":90,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£","lockTerm":45,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«{","lockTerm":75,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ó","lockTerm":30,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«ø","lockTerm":30,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢","lockTerm":90,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u00019","lockTerm":90,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«ø","lockTerm":90,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001§h","lockTerm":90,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001x","lockTerm":30,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Í","lockTerm":60,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦n","lockTerm":15,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ÿ","lockTerm":60,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001?","lockTerm":15,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001V","lockTerm":45,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥","lockTerm":75,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\u0005","lockTerm":15,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£u","lockTerm":30,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥v","lockTerm":75,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u00019","lockTerm":30,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦\u0000","lockTerm":90,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«","lockTerm":45,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001L","lockTerm":60,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ÿ","lockTerm":90,"interestRate":"\u0017\f","coupon":"\u0013"}],"eventTime":1508331265935,"metadata":{"eventSource":"svc-scnd-price-conf-fxd-fha","reasons":[{"fieldName":"loanType","type":"EXACT","values":["FHA"]},{"fieldName":"conforming","type":"EXACT","values":["true"]},{"fieldName":"amortizationType","type":"EXACT","values":["Fixed"]}]}},"serviceResolvesProductAdjustment":{"scenarioResultId":"c7610914-a659-44d9-9e89-2193ac2f1981","transactionId":"d7a00165-694f-4cd5-82b8-ea24b6b40e2a","adjustments":[],"eligibilityErrors":[],"eventTime":1508331266032},"eventTime":1508331266034},{"productName":"conv-conforming-fixed","serviceResolvesLoanSupplyPricing":{"transactionId":"d7a00165-694f-4cd5-82b8-ea24b6b40e2a","grid":[{"pricingCellId":"N/A","loanSupplierPrice":"\u0001û","lockTerm":75,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥","lockTerm":75,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£u","lockTerm":60,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001<","lockTerm":45,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦V","lockTerm":90,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Í","lockTerm":30,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ñ","lockTerm":45,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤ß","lockTerm":45,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ó","lockTerm":90,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\"","lockTerm":30,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001x","lockTerm":60,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001³","lockTerm":60,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¡","lockTerm":15,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\"","lockTerm":60,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦\u0000","lockTerm":60,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001³","lockTerm":30,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001P","lockTerm":75,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¡\u001C","lockTerm":45,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢\u0016","lockTerm":75,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢","lockTerm":60,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\u0001","lockTerm":45,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥Ù","lockTerm":75,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001L","lockTerm":30,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001(","lockTerm":15,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢{","lockTerm":15,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¼","lockTerm":75,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Â","lockTerm":45,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001³","lockTerm":90,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦ë","lockTerm":75,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ÿ","lockTerm":30,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ª","lockTerm":45,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Ï","lockTerm":75,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001§h","lockTerm":60,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001x","lockTerm":90,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¹","lockTerm":15,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001L","lockTerm":90,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢","lockTerm":30,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0004","lockTerm":90,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«ø","lockTerm":60,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001~","lockTerm":15,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\\","lockTerm":15,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ó","lockTerm":60,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£u","lockTerm":90,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦V","lockTerm":30,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Õ","lockTerm":45,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001§h","lockTerm":30,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤ù","lockTerm":15,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001","lockTerm":75,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦V","lockTerm":60,"interestRate":"\u0011ø","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001","lockTerm":45,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0004","lockTerm":30,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦\u0000","lockTerm":30,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u00016","lockTerm":75,"interestRate":"\u0011­","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0006","lockTerm":15,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥\u0004","lockTerm":60,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001R","lockTerm":15,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Ó","lockTerm":15,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤","lockTerm":75,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¡þ","lockTerm":45,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢ø","lockTerm":75,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤\n","lockTerm":15,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ªþ","lockTerm":15,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤|","lockTerm":45,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¤","lockTerm":45,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u00019","lockTerm":60,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Í","lockTerm":90,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\"","lockTerm":90,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£","lockTerm":45,"interestRate":"\u0015","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«{","lockTerm":75,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥ó","lockTerm":30,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«ø","lockTerm":30,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¢","lockTerm":90,"interestRate":"\rk","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u00019","lockTerm":90,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«ø","lockTerm":90,"interestRate":"\u0014´","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001§h","lockTerm":90,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001x","lockTerm":30,"interestRate":"\u0011b","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001Í","lockTerm":60,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦n","lockTerm":15,"interestRate":"\u0010\u0004","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ÿ","lockTerm":60,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001?","lockTerm":15,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001V","lockTerm":45,"interestRate":"\u000F ","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥","lockTerm":75,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001\u0005","lockTerm":15,"interestRate":"\u0017\f","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001£u","lockTerm":30,"interestRate":"\u0010h","coupon":"\u0011"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¥v","lockTerm":75,"interestRate":"\u0016]","coupon":"\u000F "},{"pricingCellId":"N/A","loanSupplierPrice":"\u00019","lockTerm":30,"interestRate":"\u0016Ú","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001¦\u0000","lockTerm":90,"interestRate":"\u0015Ç","coupon":"\u0013"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001«","lockTerm":45,"interestRate":"\u0014","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001L","lockTerm":60,"interestRate":"\u0011{","coupon":"\r¬"},{"pricingCellId":"N/A","loanSupplierPrice":"\u0001ÿ","lockTerm":90,"interestRate":"\u0017\f","coupon":"\u0013"}],"eventTime":1508331265935,"metadata":{"eventSource":"svc-scnd-price-conf-fxd-conv","reasons":[{"fieldName":"loanType","type":"EXACT","values":["CONV"]},{"fieldName":"conforming","type":"EXACT","values":["true"]},{"fieldName":"amortizationType","type":"EXACT","values":["Fixed"]}]}},"serviceResolvesProductAdjustment":{"scenarioResultId":"68a17ff7-9069-4c82-893c-3289acb3cb37","transactionId":"d7a00165-694f-4cd5-82b8-ea24b6b40e2a","adjustments":[{"amount":"\u0000","priceAmount":"ü\u0018","rateAmount":"\u0000","adjustmentType":"PRICE","reasons":[]}],"eligibilityErrors":[],"eventTime":1508331266037},"eventTime":1508331266037}]};
//console.log(scenariosResponse)
//$('#output').html(scenariosResponse.pretty())

//var jsonObj = JSON.parse(scenariosResponse);
//var jsonPretty = JSON.stringify(scenariosResponse, null, '\t');
//console.log(jsonPretty)
//$("#output").text(jsonPretty);


//curl -X GET "https://cortez.prod.swarm.franklinamerican.com/api-scenario/product/scenario/afb5fd47-09d0-496b-8f78-ffe1ab8f816f" -H "accept: application/json" -k

/*
$.ajax({
	url: "https://cortez.prod.swarm.franklinamerican.com/api-scenario/product/scenario/afb5fd47-09d0-496b-8f78-ffe1ab8f816f",
	beforeSend: function(xhr) { 
	  xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password")); 
	},
	type: 'GET',
	dataType: 'json',
	contentType: 'application/json',
	processData: false,
	//data: '{"foo":"bar"}',
	success: function (data) {
	  alert(JSON.stringify(data));
	},
	error: function(e){
		console.log(e)
	}
});
*/ 

var loanData = {
  "adminFeeBuyout": null,
  "amortizationTerm": null,
  "amortizationType": null,
  "cashOut": null,
  "combinedLtv": null,
  "conforming": true,
  "debtToIncome": null,
  "documentationType": null,
  "downPaymentAssistance": null,
  "escrowsWaived": null,
  "externalSupplierId": null,
  "fico": 800,
  "floatDown": null,
  "highCombinedLtv": null,
  "interestOnly": null,
  "latePayments": null,
  "lien": null,
  "loanAmount": 100000,
  "loanPurpose": "PURCHASE",
  "loanSupplierRelationship": "WHOLESALE",
  "lockTerm": null,
  "ltv": null,
  "mortgageInsurancePercent": null,
  "mortgageInsuranceType": null,
  "ownerType": null,
  "ownershipType": "PRIMARY_RESIDENCE",
  "productSubType": null,
  "productType": null,
  "propertyCounty": null,
  "propertyState": "TENNESSEE",
  "propertyType": "SINGLE_FAMILY_RESIDENCE",
  "rateReservation": null,
  "servicingRetained": null,
  "subordinateLoanAmount": null,
  "tradeLoanType": null,
  "underwritingType":null,
  "units": null
}


$.ajax({
	url: 'http://cortez.prod.swarm.franklinamerican.com/api-scenario/product/scenario/1878b2ba-237a-412b-b2d5-8613feba411c',
	type: 'GET',
	dataType: 'json',
	success: function(data){
		console.log(data);
		var jsonPretty = JSON.stringify(data, null, '\t');
		//console.log(jsonPretty)
		$("#output").text(jsonPretty);
	},
	error: function(e){
		console.log(e)
	}
});

/*

$.ajax({
	url: 'http://cortez.prod.swarm.franklinamerican.com/api-scenario/product/scenario/',
	headers: {
	"Accept": "application/json",
	"Content-Type": "application/json"
	},
	type: 'POST',
	data: "{\n" +
	"  \"adminFeeBuyout\": null,\n" +
	"  \"amortizationTerm\": null,\n" +
	"  \"amortizationType\": null,\n" +
	"  \"cashOut\": null,\n" +
	"  \"combinedLtv\": null,\n" +
	"  \"conforming\": true,\n" +
	"  \"debtToIncome\": null,\n" +
	"  \"documentationType\": null,\n" +
	"  \"downPaymentAssistance\": null,\n" +
	"  \"escrowsWaived\": null,\n" +
	"  \"externalSupplierId\": null,\n" +
	"  \"fico\": 800,\n" +
	"  \"floatDown\": null,\n" +
	"  \"highCombinedLtv\": null,\n" +
	"  \"interestOnly\": null,\n" +
	"  \"latePayments\": null,\n" +
	"  \"lien\": null,\n" +
	"  \"loanAmount\": 100000,\n" +
	"  \"loanPurpose\": \"PURCHASE\",\n" +
	"  \"loanSupplierRelationship\": \"WHOLESALE\",\n" +
	"  \"lockTerm\": null,\n" +
	"  \"ltv\": null,\n" +
	"  \"mortgageInsurancePercent\": null,\n" +
	"  \"mortgageInsuranceType\": null,\n" +
	"  \"ownerType\": null,\n" +
	"  \"ownershipType\": \"PRIMARY_RESIDENCE\",\n" +
	"  \"productSubType\": null,\n" +
	"  \"productType\": null,\n" +
	"  \"propertyCounty\": null,\n" +
	"  \"propertyState\": \"TENNESSEE\",\n" +
	"  \"propertyType\": \"SINGLE_FAMILY_RESIDENCE\",\n" +
	"  \"rateReservation\": null,\n" +
	"  \"servicingRetained\": null,\n" +
	"  \"subordinateLoanAmount\": null,\n" +
	"  \"tradeLoanType\": null,\n" +
	"  \"underwritingType\":null,\n" +
	"  \"units\": null\n" +
	"}",
	success: function (data) {
		console.log('IT WORKS');
		console.log(data);
	},
	error: function (e) {
		console.log('IT FAILS');
		console.log(e)
	}
});

*/


function init(){
	new Medium({
		element: document.getElementById('nlpForm2'),
		mode: Medium.richMode,
		autoHR: false,
		placeholder: "To begin, start typing with natural language.",
		/*,
		beforeInsertHtml: function () {
			position = getCaretCharacterOffsetWithin($('#nlpForm2').get(0));
		}*/
	});

	$('#nlpForm2').keyup(function(e) {
		position = getCaretCharacterOffsetWithin($('#nlpForm2').get(0));
		if(e.keyCode == 91 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) return;
		clearTimeout(keyupTimer);
		keyupTimer = setTimeout(function() {
			parseTextArea();
			setCaretPosition($('#nlpForm2').get(0), position);
		}, 1000);
	});

	createLookupArray();
}

function createLookupArray(){
	console.log('createLookupArray')
	$.each(termArrays, function (index, value) {
		var arrayName = termArrays[index].toString();
		$.each(window[value], function (index, value) {
			lookupWords[value] = arrayName;
		});
	});
	console.log(lookupWords);
}

function resetResultFields(){
	$("dl dd").each(function(index) { $(this).html("&nbsp;"); });
}

function pastedContent(){ //Detect if content was pasted
	freeFormObj = {}; //Reset OBJ
	resetResultFields();
}

function getCaretCharacterOffsetWithin(element) {
	var caretOffset = 0;
	var doc = element.ownerDocument || element.document;
	var win = doc.defaultView || doc.parentWindow;
	var sel;
	if (typeof win.getSelection != "undefined") {
		sel = win.getSelection();
		if (sel.rangeCount > 0) {
			var range = win.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			caretOffset = preCaretRange.toString().length;
		}
	} else if ((sel = doc.selection) && sel.type != "Control") {
		var textRange = sel.createRange();
		var preCaretTextRange = doc.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}

function setCaretPosition(element, offset) {
	var range = document.createRange();
	var sel = window.getSelection();
	var currentNode = null;
	var activeNode = null;
	var currOffset = offset;

	for(var i = 0; i < element.childNodes.length; i++) {
		currentNode = element.childNodes[i];
		for(var c = 0; c < currentNode.childNodes.length; c++) {
			if(currentNode.childNodes[c].hasChildNodes()){
				activeNode = currentNode.childNodes[c].childNodes[0];
			}else{
				activeNode = currentNode.childNodes[c];
			}
			if(currOffset <= activeNode.length){
				//break;
			}else{
				currOffset -= activeNode.length;
			}
		}
	}
	if(currOffset > range) {
		currOffset = activeNode.length;
	}
	if (activeNode != null) {
		range.setStart(activeNode, currOffset);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}
}


init();
renderChart();

function renderChart(){

	/*Chart.pluginService.register({
		beforeDraw: function(chart) {
			var width = chart.chart.width,
				height = chart.chart.height,
				ctx = chart.chart.ctx;

			ctx.restore();
			var fontSize = (height / 114).toFixed(2);
			ctx.font = fontSize + "em sans-serif";
			ctx.textBaseline = "middle";

			var text = "Text",
				textX = Math.round((width - ctx.measureText(text).width) / 2),
				textY = height / 2;

			ctx.fillText(text, textX, textY);
			ctx.save();
		}
	});*/

	Chart.pluginService.register({
		beforeDraw: function (chart) {
			if (chart.config.options.elements.center) {
				//Get ctx from string
				var ctx = chart.chart.ctx;

				//Get options from the center object in options
				var centerConfig = chart.config.options.elements.center;
				var fontStyle = centerConfig.fontStyle || 'Arial';
				var txt = centerConfig.text;
				var color = centerConfig.color || '#000';
				var sidePadding = centerConfig.sidePadding || 20;
				var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
				//Start with a base font of 30px
				ctx.font = "20px " + fontStyle;

				//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
				var stringWidth = ctx.measureText(txt).width;
				var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

				// Find out how much the font can grow in width.
				var widthRatio = elementWidth / stringWidth;
				var newFontSize = Math.floor(20 * widthRatio);
				var elementHeight = (chart.innerRadius * 2);

				// Pick a new font size so it will not be larger than the height of label.
				var fontSizeToUse = Math.min(newFontSize, elementHeight);

				//Set font settings to draw it correctly.
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
				var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
				ctx.font = fontSizeToUse+"px " + fontStyle;
				ctx.fillStyle = color;

				//Draw text in center
				ctx.fillText(txt, centerX, centerY);
			}
		}
	});
	//doughnut
	var ctxD = document.getElementById("doughnutChart").getContext('2d');
	var myLineChart = new Chart(ctxD, {
		type: 'doughnut',
		data: {
			labels: ["P&I", "Unknown", "Insurance", "Taxes"],
			datasets: [
				{
					data: [300, 50, 100, 40],
					backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
					hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
				}
			]
		},
		options: {
			responsive: true,
			cutoutPercentage: 80,
			legend: {
				display: false
			},
			elements: {
				center: {
					text: '$1,308',
					color: '#333',
					fontStyle: 'Arial',
					sidePadding: 20,
					fontSizeToUse: 10
				}
			},
			pieceLabel: {
				render: 'label',
				fontColor: '#000',
				position: 'outside'
			}
		}    
	});
}




function searchArray(array, id, itemText){
	var found = false;
	var tempArray = [];
	console.log(array)
	array.forEach(function(item, index) {
		console.log("searchArray itemText", itemText)
		console.log("searchArray item", item)
		

		itemText = $.trim(itemText.toLowerCase());
		item = $.trim(item.toLowerCase());
		if(itemText.indexOf(item) >= 0){
			found = true;
			tempArray.push(item);
		}
	});
	if(found){
		tempArray.sort(function(a, b){ return b.length - a.length; });
		updateObj(id, tempArray[0]);
		replaceContent(id, tempArray[0], tempArray[0]);
		//return true;
	}
}

function _parseTextArea(){
	console.log("parseTextArea");

	var str = $('#nlpForm2').text();
	if(str.length == 0) resetResultFields();
	var doc = nlp(str)//.normalize();
	var items = doc.clauses().data();
	var inc = 0;
	var tempFreeFormObj = {};
	
	items.forEach(function (arrayItem) {
		var tempObj = {}; // Reset tempObj
		var splitString = arrayItem.text.split("and"); // Logically break at an 'and' in a clause
		if(splitString.length > 1){
			splitString.forEach(function (entry) {
				var tempArrayObj = {};
				tempArrayObj.text = entry;
				tempFreeFormObj[inc] = tempArrayObj;
				inc += 1;
			});
		}else{
			tempObj.text = arrayItem.text;
			tempFreeFormObj[inc] = tempObj;
			inc += 1;
		}
	});

	console.log("tempFreeFormObj", tempFreeFormObj);

	$.each(tempFreeFormObj,function(index){
		var itemText = tempFreeFormObj[index].text;
		console.log("itemText", itemText);

		if(freeFormObj[index] && "type" in freeFormObj[index]){
			if(freeFormObj[index].text == itemText){ //text has not changed. exit parse for this phrase
				//return true;
			}else{ //Reset the globalObj for this item.
				globalObj[freeFormObj[index].type] = null;
				$('#parsedResults #'+freeFormObj[index].type).html("&nbsp;");
				$('#nlpForm2 #'+freeFormObj[index].type).contents().unwrap();
			}
		}



	})


	//termArrays
}

function parseTextArea(){
	console.log("parseTextArea");
	
	var str = $('#nlpForm2').text();
	if(str.length == 0) resetResultFields();
	var doc = nlp(str)//.normalize();
	var items = doc.clauses().data();
	var inc = 0;
	var tempFreeFormObj = {};
	
	console.log("terms", doc.terms().data());
	console.log("clauses", doc.clauses().data());
	console.log("statements", doc.statements().data());
	console.log("sentences", doc.sentences().data());

	items.forEach(function (arrayItem) {
		var tempObj = {}; // Reset tempObj
		var splitString = arrayItem.text.split("and"); // Logically break at an 'and' in a clause
		if(splitString.length > 1){
			splitString.forEach(function (entry) {
				var tempArrayObj = {};
				tempArrayObj.text = entry;
				tempFreeFormObj[inc] = tempArrayObj;
				inc += 1;
			});
		}else{
			tempObj.text = arrayItem.text;
			tempFreeFormObj[inc] = tempObj;
			inc += 1;
		}
	});

	console.log("tempFreeFormObj", tempFreeFormObj);

	$.each(tempFreeFormObj,function(index){
		var itemText = tempFreeFormObj[index].text;
		console.log("itemText", itemText);

		if(freeFormObj[index] && "type" in freeFormObj[index]){
			if(freeFormObj[index].text == itemText){ //text has not changed. exit parse for this phrase
				//return true;
			}else{ //Reset the globalObj for this item.
				globalObj[freeFormObj[index].type] = null;
				$('#parsedResults #'+freeFormObj[index].type).html("&nbsp;");
				$('#nlpForm2 #'+freeFormObj[index].type).contents().unwrap();
			}
		}

		if(searchArray(propertyTypeArray, "tfPropertyType", itemText)) return true;
		if(searchArray(productNames, "tfProductType", itemText)) return true;
		if(searchArray(productTerms, "tfLoanTerm", itemText)) return true;

		loanPurpose.forEach(function(item) {
			if(itemText.toLowerCase().indexOf(item.toLowerCase()) >= 0){
				updateObj('tfLoanPurpose', item);
				replaceContent('tfLoanPurpose', item, item);
				tempFreeFormObj[index].type = "tfLoanPurpose";
				return true;
			}
		});

		/*
		searchArray(propertyTypeArray, "tfPropertyType", itemText);
		searchArray(productNames, "tfProductType", itemText);
		searchArray(productTerms, "tfLoanTerm", itemText);
		*/

		if(itemText.toLowerCase().indexOf(" down") >= 0){
			console.log("Most likely contains information about the down payment")
			if(nlp(itemText).has('#NumericValue? #Money? #Percent?')){ //Has a number in the statement
				//Check for down payment
				//console.log("test " + $('#tfDownPaymentAmount').html())
				if(nlp(itemText).has('#Percent') && $('#tfDownPaymentAmount').html()=='&nbsp;'){ //Probably the down payment
					var downPayment = "";
					if(nlp(itemText).match('#Percent').out()){
						downPayment = $.trim(nlp(itemText).match('#Percent').out());
					}
					
					updateObj('tfDownPaymentAmount', downPayment);
					replaceContent('tfDownPaymentAmount', downPayment, downPayment);
					tempFreeFormObj[index].type = "tfDownPaymentAmount";		
					return true;
				}
				
				if(nlp(itemText).has('#Money? #Value? #NumericValue?') && $('#tfDownPaymentAmount').html()=='&nbsp;'){ //Probably the down payment
					var downPayment = "";
					downPayment = $.trim(nlp(itemText).match('#Money? #Value? #NumericValue?').out());
					updateObj('tfDownPaymentAmount', downPayment);
					replaceContent('tfDownPaymentAmount', downPayment, downPayment);
					tempFreeFormObj[index].type = "tfDownPaymentAmount";		
					return true;
				}
			}
		}

		loanAmountKW.forEach(function(item) {
			if(itemText.toLowerCase().indexOf(item.toLowerCase()) >= 0){
				var loanAmount = null;;
				var origStr;
				var splitString = itemText.split(/\s{1}/);
				
				splitString.forEach(function (str) {
					if(loanAmount != null) return;
					
					origStr = str;			
					var orig = str;
					str = str.replace(/\W/g, '');
					var multiplier = $.trim(str).substr(-1).toLowerCase();
					
					if(multiplier == "k"){
						origStr = orig;
						loanAmount = parseFloat(str) * 1000;
					}else{
						if(!nlp(str).has('#Value')) return;
						loanAmount = str;
					}
				})

				if(!loanAmount) return;

				var toDollar = numeral(Number(loanAmount)).format('$0,0');
				
				updateObj('tfLoanAmount', toDollar);
				replaceContent('tfLoanAmount', origStr, origStr);
				tempFreeFormObj[index].type = "tfLoanAmount";		
				return true;
			} 
		});

		var address = findAddresses(itemText);
		if(itemText.toLowerCase().indexOf(address.toLowerCase()) >= 0){
			//console.log("itemText : " + itemText);
			//console.log("address : " + address);
			//console.log("address")
			//var parsed = parseAddress.parseLocation(address);
			//console.log(address)
			//console.log(parsed)
			//var result = getZipCode(parsed.city, parsed.state);
			//var address = parsed.number + " " + parsed.street + " " + parsed.type;
			//var citystatezip = parsed.city + parsed.state;
			
			updateObj('tfAddress', address);
			replaceContent('tfAddress', address, address);
			tempFreeFormObj[index].type = "tfAddress";
			return true;
		}

		//console.log(itemText)
		
			
		//var itemText = itemText.replace(",", "");
		
		//var str = "Dallas, TX";
		//var re = /^[A-Z][a-zA-Z]+,[ ]?[A-Z]{2}$/;
		//console.log(str + ": " + re.test(str));

		//stateAbbreviations
		//itemText.replace(/\./g,' ')
		itemText = $.trim(itemText.replace(/\./g,''));
		//console.log("searchAddress : " + itemText)
		var re = /(^|[ ,])[A-Z]{2}($|[ ,?.])/;
		//console.log(itemText.search(re))
		if(itemText.search(re) > 0){
			updateObj('tfAddress', itemText);
			replaceContent('tfAddress', itemText, itemText);
			tempFreeFormObj[index].type = "tfAddress";	
			return true;
		}

		/*
		return

		var splitString = itemText.split(/\s{1}/);
		splitString.forEach(function (str) {
			console.log("str : ", str)
			url = "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=US&q=" + str;
			$.getJSON(url, function(response) { 
				console.log(response);
				if(response[0].length > 2){
					var cityArray = response;
					for (var i=0; i < cityArray.length; i++) {
						var cityState = cityArray[i].replace(", United States", "")
						var cityStateStripped = cityArray[i].replace(", ", "");

						console.log("cityState : " + cityState)
						console.log("itemText : " + itemText)
						//itemText.split(/\s{1}/);

						if(itemText.replace(/\s{1}/, "").toLowerCase().indexOf(cityState.toLowerCase()) >= 0){
							console.log("WE HAVE A MACTH");
							updateObj('tfAddress', toDollar);
							replaceContent('tfAddress', origStr, origStr);
							tempFreeFormObj[index].type = "tfAddress";
							return true;
						}
					}
				}
			});
		})
		*/
	});
	
	freeFormObj = tempFreeFormObj;
}

function replaceContent(id, strIn, strOut){
	if(!id || !strIn || !strOut) return;

	$("#nlpForm2").html(function(index, text) {
		//if($('#nlpForm2 #'+id).length){ return; }
		//console.log("replaceContent");
		//console.log(id);
		//console.log(strIn);
		//console.log(strOut);
		return text.replace(new RegExp(strIn.replace("$","\\$").replace("(","\\(").replace(")","\\)"), "ig"), "<b id='"+id+"' class='medium-b'>" + strOut + '</b>')
	});
}

function updateObj(id, value){
	//console.log('updateObj');
	//console.log(id, value);
	globalObj[id] = value; //Store data in globalObj
	$('#parsedResults #'+id).text(value);
	//console.log("globalObj", globalObj)
}

function findAddresses(data){
	//console.log("findAddresses");
	data = data.replace(/(\r\n|\n|\r)/gm," ");
	
	return "1188 Hillcrest Lane Woodridge IL";

	$.ajax({
		type: "POST",
		url: "https://us-extract.api.smartystreets.com?auth-id=973ddc4a-5d09-11d7-72ed-dcb0e14cf0c5&auth-token=pLDAiq8YQ0nkinS0z7kp",
		 data: JSON.stringify(data),// now data come in this function
		 contentType: "application/json; charset=utf-8",
		 crossDomain: true,
		 dataType: "json",
		 success: function (data, status, jqXHR) {
			//alert("success");// write success in " "
			console.log("findAddresses SUCCESS")
			console.log(data)
			


			if(data.addresses.length > 0){
				address = data.addresses[0].text;

				replaceContent('tfAddress', address, address);

				console.log(address);
				//Get State and Zip
				$('#propertyAddress').text(address);
				var parsed = parseAddress.parseLocation(address);
				console.log(parsed);
				//var result = getZipCode(parsed.city, parsed.state);
				//console.log("RESULTS");
				//console.log(result);
			}else{
				//var doc = nlp(textAreaVal).normalize();
				//if(doc.has('#Region? #Place')){ //Has a Place / Region... Probably and Address
				//	console.log("HAS PLACE / REGION");
				//	console.log(doc.match("#Region? #Place").out("text"));
				//}
			}
		},
		error: function (jqXHR, status) {
			// error handler
			console.log("ERROR - BUY ACCOUNT")
			console.log($("#nlpForm2").html());

			replaceContent('tfAddress', '1188 Hillcrest Lane Woodridge IL', "1188 HILLCREST LANE WOODRIDGE IL");
			$('#propertyAddress').text('1188 Hillcrest Lane Woodridge IL');

			//alert('fail' + status.code);
		}
	});
}

function getZipCode(city, state){
	//console.log("city : " + city);
	//console.log("state : " + state);
	var response;
	return "60517";
	
	
	var url = "https://us-zipcode.api.smartystreets.com/lookup?city="+city+"&state="+state+"&auth-token=17146743704008037&callback=?"; 
	$.getJSON(url, function(response) { 
		console.log("ZIPCODE RESULT");
		console.log(response);

		console.log(JSON.stringify(response));
		
		$('#propertyState').text(response[0].zipcodes[0].state_abbreviation);
		$('#propertyZipCode').text(response[0].zipcodes[0].zipcode);
		$('#propertyCounty').text(response[0].zipcodes[0].county_name);

	});
	

	/*response = [{"input_index":0,"city_states":[{"city":"Woodridge","state_abbreviation":"IL","state":"Illinois","mailable_city":true}],"zipcodes":[{"zipcode":"60517","zipcode_type":"S","default_city":"Woodridge","county_fips":"17043","county_name":"Dupage","state_abbreviation":"IL","state":"Illinois","latitude":41.74659,"longitude":-88.04385,"precision":"Zip5","alternate_counties":[{"county_fips":"17197","county_name":"Will","state_abbreviation":"IL","state":"Illinois"}]}]}]
	$('#propertyState').text(response[0].zipcodes[0].state_abbreviation);
	$('#propertyZipCode').text(response[0].zipcodes[0].zipcode);
	$('#propertyCounty').text(response[0].zipcodes[0].county_name);
	*/
	//return result;
}


jQuery.event.special.touchstart = {
	setup: function( _, ns, handle ){
		if ( ns.includes("noPreventDefault") ) {
			this.addEventListener("touchstart", handle, { passive: false });
		} else {
			this.addEventListener("touchstart", handle, { passive: true });
		}
	}
};



var searchCity = false;
var templateFunc = function (value) {
	// `value` is an element of callbacked array.
	//if(searchCity == true){
	//	return "<a id='cityState'>" + value + "</a>";
	//}else{
		return "<a>" + value + "</a>";
	//}
};

$('#nlpForm2').textcomplete([{
	//words: [{'30 Year Mortgage': 'product'}, {'Fixed': 'type'}, {'ARM': 'type'}, {'20 Year ARM': 'product'}],
	match: /\b(\w{2,})$/,
	search: function (term, callback) {
		//callback($.map(this.words, function (word) {
		//	return word.indexOf(term) === 0 ? word : null;
		//}));
		console.log(term)
		if(term.length > 3){
			url = "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=US&q=" + term;
			$.getJSON(url, function(response) { 
				if(response[0].length > 2){
					searchCity = true;
					callback($.map(response, function (word) {
					if(response[0].length > 2){
						var cityArray = [];
						for (var i=0; i < response.length; i++) {
							var cityState = response[i].replace(", United States", "")
							cityArray.push(cityState);
						}
					}
					return cityArray;
				}));
				}else{
					searchCity = false;
				}
			})
		}

		var lookupArray = [];

		$.each(lookupWords, function(index, value){
			var exists = index.toLowerCase().indexOf(term.toLowerCase())
			if(exists >= 0){
				var lookupType = value;
				if(lookupArray.indexOf(lookupType) === -1){
					lookupArray.push(lookupType);
				}
			}
		});

		var myArrays = [];
		$.each(lookupArray, function(index, value){
			myArrays.push(window[lookupArray[index]])
		})
		
		var mergedArray = [].concat.apply([], myArrays); 
		mergedArray.sort();

		callback($.map(mergedArray, function (word) {
		//callback($.map(this.words, function (word) {
			//console.log("WORD")
			//console.log(word)
			//console.log(typeof(word))
			//console.log(Object.keys(word)[0].toLowerCase())
			//console.log(word[Object.keys(word)[0]])
			
			//var match = Object.keys(word)[0].toLowerCase();

			
			//console.log("***");
			//console.log(match)
			//console.log(term.toLowerCase())
			//console.log(match.indexOf(term.toLowerCase()))

			var match = word.toLowerCase();
			//return match.indexOf(term.toLowerCase()) === 0 ? Object.keys(word)[0] : null;
			//return match.indexOf(term.toLowerCase()) === 0 ? word : null;
			return match.indexOf(term.toLowerCase()) >= 0 ? word : null;

			/*
				Organize by primary 30 first
				Followed by rest of products
			*/
			//return word;
		}));
	},
	index: 1,
	replace: function (word) {
		//if(searchCity){
		//	return "<b id='tfCityState' class='medium-b'>" + word + '</b> ';
		//}else{
			return word.replace(",","") + ', ';
		//} 
	},
	template: templateFunc,
	cache: true
}]);





$('table.click-chart td').click(function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active');
	}else{
		$(this).addClass('active');
	}
})

$(function () {

  $('[data-toggle="tooltip"]').tooltip();
  
})


