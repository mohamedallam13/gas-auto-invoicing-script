; (function (root, factory) {
  root.REMPTZ_INVOICING_LOGIC = factory()
})(this, function () {

  const REMPTZ_INVOICING_LOGIC = {}

  var toCompanyInvoiceArr = [];
  var toDeveloperInvoiceArr = [];

  var writeBackArrayCompanies;
  var writeBackArrayDev;

  var companiesHeader;
  var devHeader;

  var invoicingDateObj
  var euCountries
  var nowObj

  const THRESHOLD_MONTH_DAY = 15;

  const VAT_RATES_BY_CODE = {
    "R": 0.19,
    "I": 0,
    "N": 0.19
  }

  /*
  Pricing policy
  IF partner has open policy pricing THEN add all developer salaries AND add service fee per developer at the end
  example_ developer 1 - 2000EUR; developer 2 1500 EUR, 2x monthly service fee = 2x500EUR or 300EUR or whatever the amount = total amount 2000+1500+1000 (2x500)
  IF partner has retail price THEN add all developer invoicing amount 
  example: developer 1 - 3000EUR; developer 2 2500EUR, total amount = 5500EUR
  
  Starting dates:
  If developer started after 15th of month, then add his charging to the following month
  example: if started 18th august, then next invoice is 18th Aug - 30th Sep. if developer monthly salary is 2000EUR, then calculate working days / total days * salary of august + salary of Sep. if calendar days have a better calc in our favor switch to cal days calc. 
  
  If developer started before 15th of month, add the month to the same month
  example: if started 10th august, then Aug  invoice is 10th Aug - 30th Aug. if developer monthly salary is 2000EUR, then calculate working days / total days * salary of august + salary of Sep.if calendar days have a better calc in our favor switch to cal days calc. 
  
  Charge recruitment fee 30 days after starting date of developer. so probably the invoice of following month of hiring.
  example: if developer hired Aug'21, charge agreed recruitment fee in Sep'21 
  
  Discounts:
  If partner has discount on monthly service fee when open pricing policy THEN dicount% * monthly service * number of engaged developers
  If partner has discount on recruitment fee of 2000EUR, then discount% * recruitment fee . this is one-off so can be added manually if logic would be too comlpicated
  
  */

  function createInvoicesArrays(companiesObjValues, devObjValues, companiesHeader, devHeader, invoicingDateObj, nowObj, euCountries, writeBackArrayCompanies, writeBackArrayDev, ) {
    setGlobals(invoicingDateObj, nowObj, euCountries, companiesHeader, devHeader, writeBackArrayCompanies, writeBackArrayDev);
    var groupedDevelopers = getGroupedDevelopers(devObjValues);
    var selectedCompanies = getSelectedCompanies(companiesObjValues);
    selectedCompanies.forEach(companyObj => {
      var companyInvoiceNum = getCompanyInvoiceNumber(companyObj);
      getLocale(companyObj);
      var developersForThisCompany = groupedDevelopers[companyObj.company_name];
      if (!developersForThisCompany) {
        return;
      }
      var thisMonthsBilledDevelopers = createDevelopersBilling(developersForThisCompany);
      if (thisMonthsBilledDevelopers.length == 0) {
        return;
      }
      createInvoice(companyObj, companyInvoiceNum, thisMonthsBilledDevelopers);
    })
    return { toCompanyInvoiceArr: toCompanyInvoiceArr, toDeveloperInvoiceArr: toDeveloperInvoiceArr }
  }

  function getSelectedCompanies(companiesObjValues) {
    return companiesObjValues.filter(row => row.opt_out == "FALSE");
  }

  function setGlobals(invDateObj, nwObj, eu, compHead, devHead, wbArrayComp, wbArrayDev) {
    invoicingDateObj = invDateObj;
    nowObj = nwObj
    euCountries = eu;
    writeBackArrayCompanies = wbArrayComp;
    writeBackArrayDev = wbArrayDev;
    companiesHeader = compHead;
    devHeader = devHead;
  }

  function getGroupedDevelopers(devObjValues) {
    var groupedDevelopers = _.groupBy(devObjValues, "dev_hiring_company");
    delete groupedDevelopers[""];
    delete groupedDevelopers["None Yet"];
    return groupedDevelopers;
  }

  function getLocale(companyObj) {
    companyObj.locale = companyObj.company_language == "DE" ? "de-DE" : "en-US"
  }

  function createInvoice(companyObj, companyInvoiceNum, thisMonthsBilledDevelopers) {
    var companyInvoiceObj = new CompanyInvoiceObj(companyObj, companyInvoiceNum);
    var lastLineNum = createInvoicesLines(thisMonthsBilledDevelopers, companyInvoiceObj);
    addExtraLines(companyInvoiceObj, lastLineNum);
    getAfterTaxAmounts(companyInvoiceObj);
    toCompanyInvoiceArr.push(companyInvoiceObj);
  }

  function createDevelopersBilling(developersForThisCompany) {
    var thisMonthsBilledDevelopers = [];
    developersForThisCompany.forEach(developerObj => {
      var startingDateObj = new Utils.DateTimeObj("dd.MM.YYYY", developerObj.dev_starting_date);
      developerObj.startingDateObj = startingDateObj;

      var monthDiff = invoicingDateObj.month - startingDateObj.month;
      var yearDiff = invoicingDateObj.fullYear - startingDateObj.fullYear;

      if (isMonthThatFollowsInSameYear(yearDiff, monthDiff) || isMonthThatFollowsInFollowingYear(yearDiff, monthDiff) || (notSameMonth(monthDiff) && beforeThreshold(startingDateObj))) {
        augmentBilling(developerObj);
        thisMonthsBilledDevelopers.push(developerObj);
        return;
      }
      if (notSameMonth(monthDiff) && afterThreshold(startingDateObj)) {
        addParitalDays(developerObj);
        var companyBillAmount = parseFloat(developerObj.dev_invoiced_salary_to_company) + developerObj.company_charged_fraction_value;
        var devBillAmount = parseFloat(developerObj.dev_invoiced_salary_to_company) + developerObj.company_charged_fraction_value;
        var timeQuantity = "1 Month + " + developerObj.workedWorkingDays + (developerObj.workedWorkingDays == 1 ? " day" : " days");
        augmentBilling(developerObj, companyBillAmount, devBillAmount, timeQuantity);
        thisMonthsBilledDevelopers.push(developerObj);

      } else if (sameMonth(monthDiff) && beforeThreshold(startingDateObj)) {
        addParitalDays(developerObj);
        var companyBillAmount = parseFloat(developerObj.company_charged_fraction_value)
        var devBillAmount = parseFloat(developerObj.hiring_fraction_value)
        var timeQuantity = developerObj.workedWorkingDays + (developerObj.workedWorkingDays == 1 ? " day" : " days");
        augmentBilling(developerObj, companyBillAmount, devBillAmount, timeQuantity);
        thisMonthsBilledDevelopers.push(developerObj);
      }
    })
    return thisMonthsBilledDevelopers;
  }

  function augmentBilling(developerObj, companyBillAmount, devBillAmount, timeQuantity) {
    developerObj.companyBillAmount = companyBillAmount || parseFloat(developerObj.dev_invoiced_salary_to_company);
    developerObj.devBillAmount = devBillAmount || parseFloat(developerObj.dev_hiring_salary);
    developerObj.billFrom = invoicingDateObj.timestamp;
    developerObj.billTo = invoicingDateObj.lastDayDateFormatted;
    developerObj.timeQuantity = timeQuantity || "1 Month";
  }

  function isMonthThatFollowsInFollowingYear(yearDiff, monthDiff) {
    return (yearDiff > 0 && monthDiff > -10);
  }

  function isMonthThatFollowsInSameYear(yearDiff, monthDiff) {
    return (yearDiff == 0 && monthDiff > 1);
  }

  function notSameMonth(monthDiff) {
    return monthDiff != 0;
  }

  function sameMonth(monthDiff) {
    monthDiff == 0;
  }

  function beforeThreshold(startingDateObj) {
    return startingDateObj.day <= THRESHOLD_MONTH_DAY
  }

  function afterThreshold(startingDateObj) {
    return startingDateObj.day > THRESHOLD_MONTH_DAY
  }

  function addParitalDays(developerObj) {
    var startingDateObj = developerObj.startingDateObj;
    var dateFractionObj = getBestRate(startingDateObj);
    var dateFraction = dateFractionObj.dateFraction;
    var workedWorkingDays = dateFractionObj.workedWorkingDays;
    developerObj.company_charged_fraction_value = dateFraction * developerObj.dev_invoiced_salary_to_company;
    developerObj.hiring_fraction_value = dateFraction * developerObj.dev_hiring_salary;
    developerObj.workedWorkingDays = workedWorkingDays;
  }

  function getBestRate(startingDateObj) {
    var startingDate = new Date(startingDateObj.date)
    var startingMonthLastDayDate = new Date(startingDateObj.lastDayDate)
    var startingMonthFirstDayDate = new Date(startingDateObj.firstDayDate)
    var workedWorkingDays = Utils.getWorkingDays(startingDate, startingMonthLastDayDate);
    var totalWorkingDays = Utils.getWorkingDays(startingMonthFirstDayDate, startingMonthLastDayDate);
    var wdDateFraction = workedWorkingDays / totalWorkingDays;
    var workedCalendarDays = startingDateObj.lastDayOfMonth - startingDateObj.day;
    var totalCalendarDays = startingDateObj.lastDayOfMonth - startingDateObj.firstDayDate.getDate() + 1;
    var calDateFraction = workedCalendarDays / totalCalendarDays;
    var dateFraction = calDateFraction > wdDateFraction ? calDateFraction : wdDateFraction;
    return { dateFraction: dateFraction, workedWorkingDays: workedWorkingDays };
  }


  function createInvoicesLines(developersForThisCompany, companyInvoiceObj) {
    var companyInvoiceLine = 1;
    developersForThisCompany.forEach(developerObj => {
      var companyInvoiceLineObj = new CompanyInvoiceLine(developerObj, companyInvoiceObj, companyInvoiceLine);
      companyInvoiceObj.lines.push(companyInvoiceLineObj);
      var devInvoiceLineObj = createDeveloperInvoice(companyInvoiceObj, developerObj);
      toDeveloperInvoiceArr.push(devInvoiceLineObj);
      companyInvoiceLine++
    })
    return companyInvoiceLine;
  }

  function createDeveloperInvoice(companyInvoiceObj, developerObj) {
    var devInvoiceNumber = getDevInvoiceNumber(developerObj);
    var developerInvoiceObj = new DeveloperInvoice(companyInvoiceObj, developerObj, devInvoiceNumber);
    return developerInvoiceObj;
  }

  function addExtraLines(companyInvoiceObj, lastLineNum) {
    lastLineNum = addRecruitmentFees(companyInvoiceObj, lastLineNum);
    lastLineNum = addServiceFees(companyInvoiceObj, lastLineNum);
    addGeneralDiscountLine(companyInvoiceObj);
    return lastLineNum;
  }

  function CompanyInvoiceObj(companyObj, companyInvoiceNum) {
    Object.assign(this, companyObj);
    this.companyRowInSheet = companyObj.rowInSheet;
    this.invDate = nowObj.timestamp;
    this.invNum = companyInvoiceNum;
    this.name = this.company_name;
    this.taxType = getTaxType(companyObj);
    this.taxRate = VAT_RATES_BY_CODE[this.taxType];
    this.taxRateDisplay = this.taxRate * 100;
    this.companyGrossAmount = 0;
    this.companyNetAmount = 0;
    this.lines = [];
  }

  function CompanyInvoiceLine(developerObj, companyInvoiceObj, companyInvoiceLine) {
    Object.assign(this, developerObj);
    this.developerRowInSheet = developerObj.rowInSheet;
    companyInvoiceObj.companyNetAmount += this.companyBillAmount;
    this.lineType = "developerLine";
    this.invLineNum = companyInvoiceLine;
    this.lineDescription = developerObj.dev_main_position + "\n" + developerObj.billFrom + ":" + developerObj.billTo;
    this.lineQuantity = developerObj.timeQuantity;
    this.unitPrice = this.dev_invoiced_salary_to_company;
    this.lineAmount = Utils.numToAmountSimple(this.companyBillAmount, companyInvoiceObj.locale);
  }

  function getAfterTaxAmounts(companyInvoiceObj) {
    companyInvoiceObj.taxAmount = Utils.numToAmountSimple(companyInvoiceObj.companyNetAmount * companyInvoiceObj.taxRate, companyInvoiceObj.locale);
    companyInvoiceObj.companyGrossAmount = Utils.numToAmountSimple(companyInvoiceObj.companyNetAmount * (1 + companyInvoiceObj.taxRate), companyInvoiceObj.locale);
    companyInvoiceObj.companyNetAmount = Utils.numToAmountSimple(companyInvoiceObj.companyNetAmount, companyInvoiceObj.locale);
  }


  function DeveloperInvoice(companyObj, developerObj, devInvoiceNumber) {
    Object.assign(this, companyObj, developerObj);
    this.developerRowInSheet = developerObj.rowInSheet;
    this.invDate = nowObj.timestamp;
    this.name = this.dev_first_name + " " + this.dev_last_name;
    this.invNum = devInvoiceNumber;
    this.dev_full_name = this.dev_first_name + " " + this.dev_middle_names + " " + this.dev_last_name;
    this.paymentTerms = this.dev_payment_terms || "Within 5 days";
    this.dev_invoicing_address = getdevInvoicingAddress(this);
    this.taxRate = 0;
    this.taxRateDisplay = this.taxRate * 100;
    this.devNetAmount = 0;
    var devInvoiceLine = 1;
    this.lines = [
      new DeveloperInvoiceLine(this, devInvoiceLine)
    ]
    this.devNetAmount = Utils.numToAmountSimple(this.devNetAmount)
  }

  function DeveloperInvoiceLine(devInvoiceObj, devInvoiceLine) {
    devInvoiceObj.devNetAmount += devInvoiceObj.devBillAmount;
    this.invLineNo = devInvoiceLine;
    this.lineAmount = Utils.numToAmountSimple(devInvoiceObj.devBillAmount);
    this.unitPrice = devInvoiceObj.dev_hiring_salary;
    this.lineQuantity = devInvoiceObj.timeQuantity;
    this.lineDescription = devInvoiceObj.dev_main_position + " from " + devInvoiceObj.billFrom + " to " + devInvoiceObj.billTo
  }

  function getdevInvoicingAddress(devInvoiceObj) {
    var address = devInvoiceObj.dev_street_number;
    var district = devInvoiceObj.dev_district_area != devInvoiceObj.dev_governorate_city_state ? devInvoiceObj.dev_district_area : ""
    var city = devInvoiceObj.dev_governorate_city_state;
    var country = devInvoiceObj.dev_country;
    var addressArr = [address, district, city, country]
    var addressString = addressArr.filter(row => row != "").join(",");
    return addressString;
  }



  /* 
  VAT:

    IF partner is in DE then add 19% VAT to invoice price and calc total invoice AND invoice in German
    IF partner not in DE but in EU then DO NOT ADD VAT and add UID (EU tax number) for reverse charging and write *Invoice not subject to German VAT AND invoice in EN
    IF partner not in DE AND not in EU then DO NOT ADD VAT and DO NOT add UID (EU tax number) for reverse charging AND write *Invoice not subject to German VAT AND invoice in EN
  
  */

  function getTaxType(companyObj) {
    var country = companyObj.company_country;
    if (country == "Germany") {
      return "R"
    }
    if (!isEu(country)) {
      return "N"
    }
    if (isEu(country)) {
      if (hasVatId(companyObj)) {
        return checkVatId(companyObj)
      } else {
        return "R"
      }
    }
  }

  function checkVatId(companyObj) {
    // var vatObj = new VATvalid.VATObj(
    //   obj["Vat Id"],
    //   obj["3rd Party country"],
    //   obj.rem_merchant_name,
    //   [obj.merch_street, obj.merch_street, obj.merch_city],
    //   obj.rem_merchant_id)

    var vatValidity = true //VATvalid.checkVatId(vatObj, obj.process)[0]
    switch (vatValidity) {
      case true:
        return "I"
      case false:
        return "R"
      case null:
        return "error"
    }
  }

  function hasVatId(obj) {
    return obj.company_vat_id != ""
  }

  function isEu(country) {
    return euCountries.indexOf(country) > -1
  }

  /*
INVOICE NAMING CONVENTION
Developer invoice:
invoice number: yymmfirstletterfirstnamefirst2letterslastname001
example mohamed allam invoicee of aug21 = 2108MALL001

Adjustement:
invoice number: yymmfirst3letterfirstnamefirst3letterslastname001
example mohamed allam invoicee of aug21 = 2108MOHALL001
 
Partner invoice:
invoice number: first3letterofclient-yyyymmdd-1
example: raisenow invoice of aug'21 = RAI-210815-1
*/

  function getCompanyInvoiceNumber(companyObj) {
    var prefix = companyObj.company_name.slice(0, 3).toString().toUpperCase();
    var year = invoicingDateObj.fullYear.toString().slice(-2);
    var month = (parseInt(invoicingDateObj.month) + 1).toString();
    var day = invoicingDateObj.day;
    var invCount = getCompanyInvCount();
    var companyInvoiceNum = prefix + "-" + _.padStart(year, 2, "0") + _.padStart(month, 2, "0") + day + "-" + invCount;
    return companyInvoiceNum;
  }

  function getDevInvoiceNumber(developerObj) {
    var prefix = (developerObj.dev_first_name.slice(0, 3) + developerObj.dev_last_name.slice(0, 3)).toString().toUpperCase();
    var year = invoicingDateObj.fullYear.toString().slice(1, 3);
    var month = parseInt(invoicingDateObj.month) + 1
    var invCount = getDevInvCount();
    var devInvoiceNumber = _.padStart(year, 2, "0") + _.padStart(month, 2, "0") + prefix + _.padStart(invCount, 3, "0");
    return devInvoiceNumber;
  }

  function getCompanyInvCount() {
    return 1;
  }

  function getDevInvCount() {
    return 1;
  }

  function addServiceFees(companyInvoiceObj, lastLineNum) {
    var pricingPolicy = companyInvoiceObj.pricing_policy;
    if (pricingPolicy == "Retail") {
      return;
    }
    var companyRowInSheet = companyInvoiceObj.companyRowInSheet;
    var devLines = companyInvoiceObj.lines.filter(line => line.lineType = "developerLine");
    var createServiceLine = new ServiceLine(devLines, companyInvoiceObj, lastLineNum);
    companyInvoiceObj.lines.push(createServiceLine);
    addToUpdateArray(writeBackArrayCompanies, companiesHeader, companyRowInSheet, "sf_onetime_discount");
    return lastLineNum++
  }

  function ServiceLine(devLines, companyInvoiceObj, lastLineNum) {
    var serviceFeesDiscount = companyInvoiceObj.rf_onetime_discount != "" ? extractDiscountValue(companyInvoiceObj.rf_onetime_discount) : 0;
    var feesValue = companyInvoiceObj.service_fees * devLines.length * (1 - serviceFeesDiscount);
    companyInvoiceObj.companyNetAmount += feesValue;
    this.lineType = "serviceLine";
    this.lineDescription = serviceFeesDiscount == 0 ? "Service Fee" : "Service Fee (" + (serviceFeesDiscount * 100).toFixed(2) + "%" + " discount)";
    this.lineQuantity = devLines.length;
    this.invLineNum = lastLineNum;
    this.unitPrice = companyInvoiceObj.service_fees;
    this.lineAmount = Utils.numToAmountSimple(feesValue, companyInvoiceObj.locale);
  }

  function addRecruitmentFees(companyInvoiceObj, lastLineNum) {
    var recurringBool = false;
    var companyRowInSheet = companyInvoiceObj.companyRowInSheet;
    var devLines = companyInvoiceObj.lines.filter(line => line.lineType = "developerLine");
    var recruitmentFeesValidLines = getValidRecruitmentLines(devLines, recurringBool);
    if (recruitmentFeesValidLines.length == 0) {
      return
    }
    // var recruitmentLine = new RecruitmentLine(recruitmentFeesValidLines, companyInvoiceObj, lastLineNum);
    // companyInvoiceObj.lines.push(recruitmentLine);  Old One line recruitment fees
    // lastLineNum++
    lastLineNum = createLines(recruitmentFeesValidLines, companyInvoiceObj, lastLineNum)
    addRecruitmentLineChecks(recruitmentFeesValidLines);
    addToUpdateArray(writeBackArrayCompanies, companiesHeader, companyRowInSheet, "rf_onetime_discount");
    return lastLineNum
  }

  function getValidRecruitmentLines(lines, recurringBool) {
    return lines.filter(line => {
      var startingDate = line.startingDateObj.date;
      var invoicingDate = invoicingDateObj.date;
      var due = Utils.dateDifference(startingDate, invoicingDate) > 30 ? true : false;
      var recruitmentNotChargedBool = (line.recruitment_fees_check == "" && line.dev_recruitment_fees != "") || recurringBool;
      return due && recruitmentNotChargedBool;
    })
  }

  function addRecruitmentLineChecks(recruitmentFeesValidLines) {
    recruitmentFeesValidLines.forEach(row => {
      var rowInSheet = row.developerRowInSheet;
      addToUpdateArray(writeBackArrayDev, devHeader, rowInSheet, "recruitment_fees_check", "CHARGED");
    })
  }

  function createLines(recruitmentFeesValidLines, companyInvoiceObj, lastLineNum) {
    recruitmentFeesValidLines.forEach(recrutimentFeesValid => {
      var recruitmentLine = new RecruitmentLine(recrutimentFeesValid, companyInvoiceObj, lastLineNum);
      companyInvoiceObj.lines.push(recruitmentLine);
      lastLineNum++;
    })
    return lastLineNum
  }

  function RecruitmentLine(recrutimentFeesValid, companyInvoiceObj, lastLineNum) {
    var recruitmentFeesDiscount = recrutimentFeesValid.dev_recrutiment_fees_discount != "" ? extractDiscountValue(recrutimentFeesValid.dev_recrutiment_fees_discount) : 0;
    var feesValue = parseFloat(recrutimentFeesValid.dev_recruitment_fees);
    companyInvoiceObj.companyNetAmount += feesValue;
    this.lineType = "recruitmentFee";
    this.lineDescription = recruitmentFeesDiscount == 0 ? "Recruitment Fee ( " + recrutimentFeesValid.dev_first_name + " )"
      : "Recruitment Fee ( " +  recrutimentFeesValid.dev_first_name + " / " + (recruitmentFeesDiscount * 100).toFixed(2) + "%" + " discount)";
    this.lineQuantity = 1;
    this.invLineNum = lastLineNum;
    this.unitPrice = feesValue.toFixed(2);
    this.lineAmount = Utils.numToAmountSimple(feesValue, companyInvoiceObj.locale);
  }

  // function RecruitmentLine(recruitmentFeesValidLines, companyInvoiceObj, lastLineNum) {
  //   var recruitmentFeesDiscount = companyInvoiceObj.rf_onetime_discount != "" ? extractDiscountValue(companyInvoiceObj.rf_onetime_discount) : 0;
  //   var feesValue = companyInvoiceObj.recruitment_fees * recruitmentFeesValidLines.length * (1 - recruitmentFeesDiscount);
  //   companyInvoiceObj.companyNetAmount += feesValue;
  //   this.lineType = "recruitmentFee";
  //   this.lineDescription = recruitmentFeesDiscount == 0 ? "Recruitment Fee" : "Recruitment Fee (" + (recruitmentFeesDiscount * 100).toFixed(2) + "%" + " discount)";
  //   this.lineQuantity = recruitmentFeesValidLines.length;
  //   this.invLineNum = lastLineNum;
  //   this.unitPrice = companyInvoiceObj.recruitment_fees;
  //   this.lineAmount = Utils.numToAmountSimple(feesValue, companyInvoiceObj.locale);
  // }
  // Old One line recruitment fees

  function addGeneralDiscountLine(companyInvoiceObj) {
    var generalDiscountValue = companyInvoiceObj.general_onetime_discount;
    if (generalDiscountValue == "") {
      return;
    }
    generalDiscountValue = extractDiscountValue(generalDiscountValue);
    var discountedValue = companyInvoiceObj.companyNetAmount * generalDiscountValue;
    companyInvoiceObj.companyNetAmount = companyInvoiceObj.companyNetAmount - discountedValue
    var generalDiscountLine = new GeneralDiscountLine(companyInvoiceObj, generalDiscountValue, discountedValue)
    companyInvoiceObj.lines.push(generalDiscountLine);
    addToUpdateArray(writeBackArrayCompanies, companiesHeader, companyInvoiceObj.companyRowInSheet, ["general_onetime_discount", "general_discount_description"]);

  }

  function GeneralDiscountLine(companyInvoiceObj, generalDiscountValue, discountedValue) {
    this.lineType = "generalDicount";
    this.lineDescription = companyInvoiceObj.general_discount_description != "" ? "Discount: " + companyInvoiceObj.general_discount_description : "Discount";
    this.lineQuantity = "";
    this.invLineNum = "";
    this.unitPrice = (generalDiscountValue * 100).toFixed(2) + "%";
    this.lineAmount = "-" + Utils.numToAmountSimple(discountedValue, companyInvoiceObj.locale);
  }

  function addToUpdateArray(updateArray, header, rowInSheet, heads, values) {
    values = values || [];
    var rowIndex = rowInSheet - 1;
    if (!Array.isArray(heads)) {
      heads = [heads];
    }
    if (!Array.isArray(values)) {
      values = [values];
    }
    heads.forEach((head, i) => {
      var columnIndex = header.indexOf(head);
      var value = values[i] || "";
      updateArray[rowIndex][columnIndex] = value;
    })

  }

  function extractDiscountValue(generalDiscountValue) {
    if (typeof generalDiscountValue == "string") {
      if (generalDiscountValue.indexOf("%")) {
        generalDiscountValue = generalDiscountValue.slice(0, generalDiscountValue.length - 1);
      } else {
        generalDiscountValue = parseFloat(generalDiscountValue);
      }
    } else if (typeof generalDiscountValue == "number") {
      if (generalDiscountValue < 1 && generalDiscountValue > 0) {
        return generalDiscountValue;
      }
    }
    generalDiscountValue = parseFloat(generalDiscountValue);
    if (!isNaN(generalDiscountValue)) {
      return generalDiscountValue / 100;
    }
    return 0
  }

  REMPTZ_INVOICING_LOGIC.createInvoicesArrays = createInvoicesArrays

  return REMPTZ_INVOICING_LOGIC
})
