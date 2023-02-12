var Cow = artifacts.require("Cow");
var Horse = artifacts.require("Horse");
var Wolf = artifacts.require("Wolf");
var Dog = artifacts.require("Dog");
var Farmer = artifacts.require("Farmer");
var StringComparer = artifacts.require("StringComparer");

let cow = null;
let horse = null;
let wolf = null;
let dog = null;
let farmer = null;
let stringcomparer = null;


module.exports = async(deployer)=>{

	await deployer.deploy(StringComparer);
	stringcomparer = await StringComparer.deployed()
	await deployer.link (stringcomparer, [Cow, Horse, Wolf, Dog])
	console.log("-----------------");

	await deployer.deploy(Cow, "Milka");
	cow = await Cow.deployed();
	console.log("Address of Cow: " + cow.address);
	console.log("-----------------");

	await deployer.deploy(Horse, "Spirit");
	horse = await Horse.deployed();
	console.log("Address of Horse: " + horse.address);
	console.log("-----------------");

	await deployer.deploy(Wolf, "Seriy");
	wolf = await Wolf.deployed();
	console.log("Address of Wolf: " + wolf.address);
	console.log("-----------------");

	await deployer.deploy(Dog, "Sharik");
	dog = await Dog.deployed();
	console.log("Address of Dog: " + dog.address);
	console.log("-----------------");

	await deployer.deploy(Farmer);
	farmer = await Farmer.deployed();
	console.log("Address of Farmer: " + farmer.address);
	console.log("-----------------");

	console.log("Cow:", await call (cow));
        console.log("-----------------");
        console.log("Horse:", await call (horse));
        console.log("-----------------");


	console.log("Wolf", await feed (wolf, "meat"));
        console.log("-----------------");
        
        try {
        	console.log(await feed (wolf, "plant"));
        } catch (e){
        	console.log("Wolf can NOT eat plant")
        }
       

        
}


async function call(animal){
        return await farmer.call(animal.address);
 }


async function feed(animal, food){
        return await farmer.feed(animal.address, food);
	}


