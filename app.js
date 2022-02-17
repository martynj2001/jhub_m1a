
console.log("Welcome to Mission Command!");

const duration = document.querySelector("#duration");
const pers = document.querySelector("#pers_data");
const suData = document.querySelector("#su_data")
const tablePers = document.querySelector("#tablePers");
const tableEquip = document.querySelector("#tableEquip");

let noDays = 0;
let equip = {
		// Make this an empty objectand populate as we go.
		// su_1: 	"",
		// su_2: 	"",
		// su_3: 	"",
		// fuelSu_1:	0,
		// ammoSu_1:	0,
		// fuelSu_2:	0,
		// ammoSu_2:	0,
		// fuelSu_3:	0,
		// ammoSu_3:	0,
		// ammoTotal:	0,
		// fuelTotal:	0,
		// total:		0
};

duration.addEventListener('input', function(){
    noDays = duration.value;
    console.log(`Mission Duration: ${noDays}`);
    //displayPersCalc();
});

pers.addEventListener('input', function(e){
    if (noDays === 0){
        alert("No Mission duration set!");
    } else {
        e.preventDefault();
        const persCon = calcPerson(pers.elements.pers_num.value);
        //console.log (persCon);
        displayPersCalc(persCon);
    }
});

suData.addEventListener("input", function(e){
	if (noDays === 0){
        alert("No Mission duration set!");
    } else {
        e.preventDefault();
        console.dir(suData);
		// equip.su_1 = 0;
		// equip.su_2 = 0;
		// equip.su_3 = 0;
        let su_1 = suData.elements.su_1.value;
        console.log(su_1);//calcSU(equip);
    }
});

function displayPersCalc(data){
    //Display calcutaed data in a table.
    //tablePers.classList.styles.visibility = visable;
    tablePers.rows[1].cells[1].innerText = data.rations;
    tablePers.rows[1].cells[2].innerText = data.noRatPallets;
    tablePers.rows[2].cells[1].innerText = data.waterDrink;
    tablePers.rows[3].cells[1].innerText = data.waterCook;
    tablePers.rows[4].cells[1].innerText = data.waterTotal;
    tablePers.rows[4].cells[2].innerText = data.noWaterPallets;
 
}

function calcPerson(noPers) {
    let person = {
        rations: 0,
        waterDrink: 0, 
        waterCook: 0, 
        waterTotal: 0,
        noRatPallets: 0,
        noWaterPallets: 0
    };
    person.rations = noPers * noDays;
    person.waterDrink = (noPers * 5) * noDays;
    if (noPers <= 5) {									//use individual water value
        person.waterCook = (noPers * 10) * noDays;
    } else {											//use subunit water value
        person.waterCook = noDays * 50;
    }  
    person.waterTotal = person.waterCook + person.waterDrink;
    person.noRatPallets = Math.ceil(person.rations/350);
    person.noWaterPallets = Math.ceil(person.waterTotal/792);
    return person;
}

function calcSU(su, suData){
	
	switch (su){
		case "Armoured":
			
			break;
	}
	
	
}
