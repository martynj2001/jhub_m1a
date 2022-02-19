
console.log("Welcome to Mission Command!");

const duration = document.querySelector("#duration");
const pers = document.querySelector("#pers_data");
const suData = document.querySelector("#su_data")
const tablePers = document.querySelector("#tablePers");
const tableEquip = document.querySelector("#tableEquip");
const tableTotal = document.querySelector("#tableTotal");
const reset = document.querySelector("#reset")

let noDays = 1;
let Bg_input = false;
let Ps_input = false;
let equip = {
		totalFuel: 0,
        totalUST: 0
};
let person = { };

duration.addEventListener('input', function(){
    noDays = duration.value;
    console.log(`Mission Duration: ${noDays}`);
    console.log(Bg_input);
    console.log(Ps_input);
    if (Bg_input && Ps_input){
        calcPerson(pers.elements.pers_num.value);
        calcBG();
        displayPersCalc(person);
        displayBGCalc(equip);
        displayTotalCalc(equip, person);
    }
});

pers.addEventListener('input', function(e){
    if (noDays === 0){
        alert("No Mission duration set!");
    } else {
        e.preventDefault();
        calcPerson(pers.elements.pers_num.value);
        //console.log (persCon);
        displayPersCalc(person);
        displayTotalCalc(equip, person);
    }
});

suData.addEventListener("input", function(e){
	if (noDays === 0){
        alert("No Mission duration set!");
    } else {
        e.preventDefault();
        
		calcBG();
        displayBGCalc(equip);
        displayTotalCalc(equip, person);
        console.dir(equip);
    }
});
reset.addEventListener("click", function(){
    suData.reset();
    pers.reset();

    equip = {
        su_1: {
            ammo:   0,
            type:   '',
            fuel:    0,
            fuelUST: 0
        },
        su_2: {
            ammo:   0,
            type:   '',
            fuel:    0,
            fuelUST: 0
        },
        su_3: {
            ammo:   0,
            type:   '',
            fuel:    0,
            fuelUST: 0
        },
        totalAmmo: 0,
        totalFuel: 0,
        totalUST: 0
    };
    person = {
        noRatPallets: 0,
        noWaterPallets: 0,
        rations: 0,
        waterCook: 0,
        waterDrink: 0,
        waterTotal: 0
    };
    noDays = 1;
    duration.value = 1;
    displayBGCalc(equip);
    displayPersCalc(person);
    displayTotalCalc(equip, person);
});


function displayPersCalc(data){
    //Display calcutaed data in a table.
    tablePers.rows[1].cells[1].innerText = data.rations;
    tablePers.rows[1].cells[2].innerText = data.noRatPallets;
    tablePers.rows[2].cells[1].innerText = data.waterDrink;
    tablePers.rows[3].cells[1].innerText = data.waterCook;
    tablePers.rows[4].cells[1].innerText = data.waterTotal;
    tablePers.rows[4].cells[2].innerText = data.noWaterPallets;
}

function displayBGCalc(data){
    tableEquip.rows[1].cells[1].innerText = equip.su_1.type;
    tableEquip.rows[1].cells[2].innerText = equip.su_1.fuel;
    tableEquip.rows[1].cells[3].innerText = equip.su_1.ammo;

    tableEquip.rows[2].cells[1].innerText = equip.su_2.type;
    tableEquip.rows[2].cells[2].innerText = equip.su_2.fuel;
    tableEquip.rows[2].cells[3].innerText = equip.su_2.ammo;

    tableEquip.rows[3].cells[1].innerText = equip.su_3.type;
    tableEquip.rows[3].cells[2].innerText = equip.su_3.fuel;
    tableEquip.rows[3].cells[3].innerText = equip.su_3.ammo;   
}

function displayTotalCalc(Bg, Ps)
{
    if (Bg_input){
        tableTotal.rows[1].cells[1].innerText = equip.su_1.type;
        tableTotal.rows[1].cells[2].innerText = equip.su_1.fuel;
        tableTotal.rows[1].cells[3].innerText = "N/A";
        tableTotal.rows[1].cells[4].innerText = "N/A";
        tableTotal.rows[1].cells[5].innerText = equip.su_1.ammo;

        tableTotal.rows[2].cells[1].innerText = equip.su_2.type;
        tableTotal.rows[2].cells[2].innerText = equip.su_2.fuel;
        tableTotal.rows[2].cells[3].innerText = "N/A";
        tableTotal.rows[2].cells[4].innerText = "N/A";
        tableTotal.rows[2].cells[5].innerText = equip.su_2.ammo;

        tableTotal.rows[3].cells[1].innerText = equip.su_3.type;
        tableTotal.rows[3].cells[2].innerText = equip.su_3.fuel;
        tableTotal.rows[3].cells[3].innerText = "N/A";
        tableTotal.rows[3].cells[4].innerText = "N/A";
        tableTotal.rows[3].cells[5].innerText = equip.su_3.ammo; 
    }
    
    if (Ps_input && Bg_input){
        tableTotal.rows[4].cells[2].innerText = (Bg.totalFuel);
        tableTotal.rows[4].cells[3].innerText = (Ps.waterTotal);
        tableTotal.rows[4].cells[4].innerText = (Ps.noRatPallets);
        tableTotal.rows[4].cells[5].innerText = (Bg.totalAmmo);
    }
}

function calcPerson(noPers) {
    
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
    Ps_input = true;
    console.dir(person);
    return person;
}

function calcBG(){
    equip.su_1 = calcSU(suData.elements.su_1.value);
    equip.su_2 = calcSU(suData.elements.su_2.value);
    equip.su_3 = calcSU(suData.elements.su_3.value);

    equip.totalFuel = equip.su_1.fuel + equip.su_2.fuel + equip.su_3.fuel;
    equip.totalUST = equip.su_1.fuelUST + equip.su_1.fuelUST + equip.su_1.fuelUST;
    equip.totalAmmo = equip.su_1.ammo + equip.su_1.ammo + equip.su_1.ammo;
    Bg_input = true;
}

function calcSU(su){
	subunit = {};
	switch (su){
		case "ARM":
            subunit.type = "Armoured";
			subunit.fuel = Math.ceil(1000 * (noDays * 24));
			subunit.fuelUST = Math.ceil(0.2 * (noDays * 24));
			subunit.ammo = Math.ceil(2 * (noDays * 24));	
			break;
		case "AI":
            subunit.type = "Armoured Infantry";
			subunit.fuel = Math.ceil(500 * (noDays * 24));
			subunit.fuelUST = Math.ceil(0.1 * (noDays * 24));
			subunit.ammo = Math.ceil(5 * (noDays * 24));	
			break;
		case "LI":
            subunit.type = "Light Infantry";
			subunit.fuel = Math.ceil(250 * (noDays * 24));
			subunit.fuelUST = Math.ceil(0.05 * (noDays * 24));
			subunit.ammo = Math.ceil(3 * (noDays * 24));	
			break;
		case "AVN":
            subunit.type = "Aviation";
			subunit.fuel = Math.ceil(3000 * (noDays * 24));
			subunit.fuelUST = Math.ceil(0.6 * (noDays * 24));
			subunit.ammo = Math.ceil(4 * (noDays * 24));	
			break;
	}
	return subunit;
}
