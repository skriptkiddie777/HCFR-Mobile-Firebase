//This is a paediatric dosing calculator, written by Dr. Jeremy Steinberg
//Contact me for any queries, http://www.jackofallorgans.com/contact/
//I am happy to allow re-use of the code for non-commercial organisations, but please contact me first.

//Set up the drug object with all their values
let drug_options = {
	"Adenosine1": {
		"mlsvar": 0.05,
		"mgsvar": 0.1,
		"numberOfTimesADay": " IV Push"
	},
	"Adenosine2": {
		"mlsvar": 0.1,
		"mgsvar": 0.2,
		"numberOfTimesADay": " IV Push",
		"mlsmax": 20,
		"mgsmax": 1000
	},
	"Amiodarone": {
		"mlsvar": 0.05,
		"mgsvar": 5,
		"numberOfTimesADay": " IV Push"
	},
	"Atropine": {
		"mlsvar": 0.2,
		"mgsvar": 0.02,
		"numberOfTimesADay": " IV Push"
  },
	"Dextrose10": {
		"mlsvar": 1,
		"mgsvar": 0.25,
    "numberOfTimesADay": " IV Push"
	},
	"Dextrose25": {
		"mlsvar": 1,
		"mgsvar": 1,
		"numberOfTimesADay": " IV Push"
  },
	"Diphenhydramine-anaphylaxis": {
		"mlsvar": 0.02,
		"mgsvar": 1,
		"numberOfTimesADay": " IV Push"
	},
	"Diphenhydramine-dystonia": {
		"mlsvar": 0.01,
		"mgsvar": 0.5,
		"numberOfTimesADay": " IV Push"
	},
	"Epinephrine1000": {
		"mlsvar": 0.01,
		"mgsvar": 0.01,
		"numberOfTimesADay": " IV Push"
	},
	"Epinephrine10000": {
		"mlsvar": 0.1,
		"mgsvar": 0.01,
		"numberOfTimesADay": " IV Push"
	},
	"Fentanyl": {
		"mlsvar": 0.02,
		"mgsvar": 1,
		"numberOfTimesADay": "",
    "messageshow": true,
    "messageMls": " IV Push",
    "messageMgs": " Dose is in Micrograms"
	},
	"Lidocaine": {
		"mlsvar": 0.05,
		"mgsvar": 1,
		"numberOfTimesADay": " IV Push"
	},
	"Magnesium": {
		"mlsvar": 0.08,
		"mgsvar": 40,
		"numberOfTimesADay": " IV Push"
	},
	"Methylprednisolone": {
		"mlsvar": 0.016,
		"mgsvar": 1,
		"numberOfTimesADay": " IV Push"
	},
	"Midazolam": {
		"mlsvar": 0.04,
		"mgsvar": 0.2,
		"numberOfTimesADay": " IV Push"
	},
	"Morphine": {
		"mlsvar": 0.1,
		"mgsvar": 0.1,
		"numberOfTimesADay": " IV Push"
	},
	"Naloxone": {
		"mlsvar": 0.1,
		"mgsvar": 0.1,
    "numberOfTimesADay": " IV Push"
	},
	"Ondansetron": {
		"mlsvar": 0.2,
		"mgsvar": 0.1,
		"numberOfTimesADay": " IV Push"
	},
	"Adult": {
		"mlsvar": 0.2,
		"mgsvar": 0.1,
		"numberOfTimesADay": " IV Push"
	},
}
 
// for creating a new drug if required: e.g. var Prednislone = new Drug (....), then drug_options.Prednisolone = Prednisolone; 
function Drug(mlsvar, mgsvar, mcgsvar, numberOfTimesADay, mlsmax, mgsmax, mlsmaxhigh, mgsmaxhigh, highrange, messageshow, messageMls, messageMgs) {
 this.mlsvar = mlsvar;
 this.mgsvar = mgsvar;
 this.mcgsvar = mcgsvar;
 this.numberOfTimesADay = numberOfTimesADay;
 this.mlsmax = mlsmax;
 this.mgsmax = mgsmax;
 this.mlsmaxhigh = mlsmaxhigh;
 this.mgsmaxhigh = mgsmaxhigh;
 this.highrange = highrange;
 this.messageshow = messageshow;
 this.messageMls = messageMls;
 this.messageMgs = messageMgs;
}




//get the frequency from the drug object in the drug_options object
function getFrequency() {
 let theDrug = document.getElementById("drug").value;
 let frequency = drug_options[theDrug].numberOfTimesADay;
 return frequency;
}

// getWeight() finds the weight from the form
function getWeight() {
 let weight = Number(document.getElementById("theweight").value);
 return weight;
}

// getMlsValue() finds the Mls value from the drug_options object
function getMlsValue() {
 let drugSelect = document.getElementById("drug");
 return drug_options[drugSelect.value].mlsvar;
}

//find the MgsValue
function getMgsValue() {
 let drugSelect = document.getElementById("drug");
 return drug_options[drugSelect.value].mgsvar;
}

//find the McgsValue
function getMcgsValue() {
 let drugSelect = document.getElementById("drug");
 return drug_options[drugSelect.value].mcgsvar;
}


//rounding function
function round(value, step) {
 step || (step = 1.0);
 let inv = 1.0 / step;
 return Math.round(value * inv) / inv;
}

// calculateTotalMls() calculate the dose and set the maximums
function calculateTotalMls() {
 let totalMls = parseFloat(getMlsValue() * getWeight());
 let messageMls = "";
 let totalhighMls = parseFloat((totalMls * 2).toFixed(1));
 let theDrug = document.getElementById("drug").value;
 let highMls = "";
 let mls = " mLs";
 let totalhighsachets = (totalMls * 3).toFixed(1);
 let weight = getWeight();
 totalMls = totalMls || ""; // removes NaN messageMgs

 // set maximum doses

 if (totalMls > drug_options[theDrug].mlsmax) {
 totalMls = drug_options[theDrug].mlsmax;
 }

 if (totalhighMls > drug_options[theDrug].mlsmaxhigh) {
 totalhighMls = drug_options[theDrug].mlsmaxhigh;
 }

 if (totalhighsachets > drug_options[theDrug].sachetsmax) {
 totalhighsachets = parseFloat(drug_options[theDrug].sachetsmax);
 }

 //check if there is a high range and then add the high range string

 if (drug_options[theDrug].highrange == true && totalMls < totalhighMls) {
 highMls = " - " + String(totalhighMls);
 }

 //check if there is a message and then add the message string

 if (drug_options[theDrug].messageshow == true) {
 messageMls = drug_options[theDrug].messageMls;
 }
 
 //work out the dosing for drugs with weight cut offs 
 if (drug_options[theDrug].weightrange == true) {
 if (weight < drug_options[theDrug].rangeWeightCutOff) {
 totalMls = drug_options[theDrug].range1doseMls;
 messageMls = drug_options[theDrug].messageMls;
 } else if (weight >= drug_options[theDrug].rangeWeightCutOff && weight < drug_options[theDrug].rangeWeightCutOff2) {
 totalMls = drug_options[theDrug].range2doseMls;
 messageMls = drug_options[theDrug].messageMls;
 } else {
 totalMls = "unexpected error"
 }
 }

 //set strings and display range for when there is a range for drugs with a weight cut off rather than a calculation

 if (document.getElementById("drug").value == "Ibuprofen100" && weight < 10) {
 messageMls =
 "<br><br>Maximum " + totalMls.toFixed(1) + " mLs if under THREE months";
 }
 
 if (document.getElementById("drug").value == "Prednisolone") {
 let veryhighdosepred = parseFloat((weight * 0.4).toFixed(1));
 if (veryhighdosepred >= 12){
 veryhighdosepred = 12;
 }
 messageMls = 
 "<br><br>If child has already been taking for more than a few days, give " + veryhighdosepred + "mL once daily (2mg/kg with a 60mg/12mL maximum)";
 }



 if (document.getElementById("drug").value == "Macrogol") {
 mls = " sachets";
 }

 if (document.getElementById("drug").value == "Macrogol") {
 messageMls =
 " (disolved in " +
 String(round(125 * totalMls, 10)) +
 " mLs of water)" +
 "<br><br>OR<br>" +
 "<br>Disimpaction Dose: " +
 String(round(totalhighsachets, 0.25)) +
 " sachets daily until passes soft stool" +
 " (disolved in " +
 String(round(125 * totalhighsachets, 10)) +
 " mLs of water)";
 }

 //the bit that puts it in the div

 displayMls(totalMls, highMls, mls, messageMls);
}

//error display
function showError(message){
 var error = document.getElementById("error-message");
 error.innerHTML = message;
 document.getElementById("Result").innerHTML = "";
 document.getElementById("ResultMgs").innerHTML = "";
 error.style.display = "block";
}

function clearResults(){
 document.getElementById("ResultMgs").innerHTML = "";
 document.getElementById("Result").innerHTML = "" ;
 document.getElementById("warning-message").innerHTML = "" ;
 document.getElementById("error-message").innerHTML = "" ;
 document.getElementById("error-message").style.display = "none";
 document.getElementById("warning-message").style.display = "none";

}


//display the result for Mls
function displayMls(totalMls, highMls, mls, messageMls) {
 let totalEl = document.getElementById("Result");
 let frequency = getFrequency();
 totalEl.style.display = "block";


 
 if (document.getElementById("drug").value == "None") {
 
 showError("Please select a drug and input a weight");
 
 } else if (document.getElementById("theweight").value == "") {
 
 showError("Please select a drug and input a weight");
 } else if (document.getElementById("theweight").value < 0) {
 
 showError("Cannot be negative weight");
 } else if (document.getElementById("theweight").value > 100) {
 showError("Please enter a weight below 100kg");
 
 } else {
 document.getElementById("Result").innerHTML =
 parseFloat(totalMls.toFixed(1)) +
 highMls +
 mls +
 frequency +
 messageMls;
 document.getElementById("error-message").style.display = "none";
 
 }
 
 //this will then make all '.' letters and numbers and dashes bigger 
 let element = document.querySelector('#Result');
 element.innerHTML = element.innerHTML.replace(/(\d+)(\.)?(\d+)?(\s\-\s)?/g, 
 '<span style="font-size:1.00rem;">$1</span><span style="font-size:1.00rem;">$2</span><span style="font-size:1.00rem;">$3</span><span style="font-size:1.00rem;">$4</span>');


}

//hide the mls result
//function hideTotal() {
// let totalEl = document.getElementById("Result");
// totalEl.style.display = "none";
//}

//calculate Milligram total

function calculateMgsTotal() {
 let totalMgs = parseFloat((getMgsValue() * getWeight()).toFixed(1));
 let messageMgs = "";
 let totalhigh = parseFloat((totalMgs * 2).toFixed(0));
 let totalhighsachets = (totalMgs * 3).toFixed(0);
 let theDrug = document.getElementById("drug").value;
 let highMgs = "";
 let mgs = " mgs";
 let weight = getWeight();

 // set maximum doses

 if (totalMgs > drug_options[theDrug].mgsmax) {
 totalMgs = drug_options[theDrug].mgsmax;
 }

 if (totalhigh > drug_options[theDrug].mgsmaxhigh) {
 totalhigh = drug_options[theDrug].mgsmaxhigh;
 }

 if (totalhighsachets > drug_options[theDrug].mgsmax) {
 totalhighsachets = parseFloat(drug_options[theDrug].mgsmax);
 }

 //check if there is a high range and then add the high range string

 if (drug_options[theDrug].highrange == true && totalMgs < totalhigh) {
 highMgs = " - " + String(totalhigh);
 }

 //check if there is a message and then add the message string

 if (drug_options[theDrug].messageshow == true) {
 messageMgs = drug_options[theDrug].messageMgs;
 }

 //work out the dosing for drugs with weight cut offs 
 if (drug_options[theDrug].weightrange == true) {
 if (weight < drug_options[theDrug].rangeWeightCutOff) {
 totalMgs = drug_options[theDrug].range1doseMgs;
 messageMgs = drug_options[theDrug].messageMgs;
 } else if (weight >= drug_options[theDrug].rangeWeightCutOff && weight < drug_options[theDrug].rangeWeightCutOff2){
 totalMgs = drug_options[theDrug].range2doseMgs;
 messageMgs = drug_options[theDrug].messageMgs;
 } else {
 totalMgs = "unexpected error"
 }
 }
 
 
 if (document.getElementById("drug").value == "Ibuprofen100" && weight < 10) {
 messageMgs =
 "<br><br>Maximum " + totalMgs.toFixed(0) + " mgs if under THREE months";
 }

 if (document.getElementById("drug").value == "Prednisolone") {
 let veryhighdosepred = parseFloat((weight * 2).toFixed(1));
 if (veryhighdosepred >= 60){
 veryhighdosepred = 60;
 }
 messageMgs = 
 "<br><br>If child has already been taking for more than a few days, give " + veryhighdosepred + "mg once daily (2mg/kg with a 60mg maximum)";
 } 
 
 
 if (
 document.getElementById("drug").value == "Coamoxiclav125-31.25" ||
 document.getElementById("drug").value == "Coamoxiclav250-62.5"
 ) {
 messageMgs =
 " of the amoxicillin component" +
 "<br>" +
 "OR" +
 "<br>" +
 totalMgs * 1.25 +
 " mgs of the total component";
 }


 if (document.getElementById("drug").value == "Macrogol") {
 messageMgs =
 "<br><br> (or " +
 String(round(totalhighsachets, 0.25)) +
 " mgs daily for disimpaction until passes soft stool)";
 }

 displayMgs(totalMgs, highMgs, mgs, messageMgs);
}

//show the mgs result
function displayMgs(totalMgs, highMgs, mgs, messageMgs) {
 let totalElMgs = document.getElementById("ResultMgs");
 let frequency = getFrequency();

 if (document.getElementById("drug").value == "None") {
 return;
 } else if (document.getElementById("theweight").value == "") {
 return;
 } else if (document.getElementById("theweight").value < 0) {
 return;
 } else if (document.getElementById("theweight").value > 100) {
 return;
 } else {
 totalElMgs.style.display = "block";
 document.getElementById("ResultMgs").innerHTML =
 totalMgs + highMgs + mgs + frequency + messageMgs;
 
 }
 

 //this will then make all '.' letters and numbers and dashes bigger 
 let element = document.querySelector('#ResultMgs');
 element.innerHTML = element.innerHTML.replace(/(\d+)(\.)?(\d+)?(\s\-\s)?/g, 
 '<span style="font-size:1.25rem;">$1</span><span style="font-size:1.25rem;">$2</span><span style="font-size:1.25rem;">$3</span><span style="font-size:1.25rem;">$4</span>');


 
 
}



//hide the mgs result
//function hideTotalMgs() {
 // let totalElMgs = document.getElementById("ResultMgs");
 //totalElMgs.style.display = "none";
//}
