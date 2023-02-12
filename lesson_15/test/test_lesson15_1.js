var Horse = artifacts.require("Horse");
var Dog = artifacts.require("Dog");
var Farmer = artifacts.require("Farmer");

let horse = null;
let dog = null;
let farmer = null;

contract("Horse and Farmer", async(accounts)=>{

	it("Horse has the correct name",async()=>{
		horse = await Horse.deployed();
		let name = await getName(horse);
		let name_ = "Spirit";
		assert.equal(name, name_ ,"Incorrect Horse name");
	});

	it("Horse can sleep",async()=>{
		horse = await Horse.deployed();
		let sleep_ = await sleep(horse);
		assert.equal(sleep_, "Z-z-z..." ,"Horse doesn't slepp");
	});

	it("Horse can eat plant",async()=>{
		horse = await Horse.deployed();
		let eat_ = await horse.eat("plant");
		assert.equal(eat_, "Nom-Nom", "Horse can not eat this");
	});

	it("Horse cannot eat ”meat”, ”not-food”, ”plastic”", async()=>{
        horse = await Horse.deployed();
        await testNotEat(horse, "meat");
        await testNotEat(horse, "not-food");
        await testNotEat(horse, "plastic");
    });

    it("Farmer can call Horse, Horse responds correctly", async()=>{
        horse = await Horse.deployed();
        farmer = await Farmer.deployed();
        let call_ = await testCall(horse);
        assert.equal(call_, "Igogo", "It isn't a horse");
    });

    it("Farmer can feed Horse with plant", async()=>{
        horse = await Horse.deployed();
        farmer = await Farmer.deployed();
        await testCanFeed(horse, "plant");
    });

       it("Farmer can not feed Horse with anything else", async()=>{
        horse = await Horse.deployed();
        farmer = await Farmer.deployed();
        await testCanNotFeed(horse, "meat");
        await testCanNotFeed(horse, "fingers");
        await testCanNotFeed(horse, "plastic");
    });
});

contract("Dog and Farmer", async(accounts)=>{

    it("Gog has the correct name",async()=>{
        dog = await Dog.deployed();
        let name = await getName(dog);
        let name_ = "Sharik";
        assert.equal(name, name_ ,"Incorrect Dog name");
    });

    it("Dog can sleep",async()=>{
        dog = await Dog.deployed();
        let sleep_ = await sleep(dog);
        assert.equal(sleep_, "Z-z-z..." ,"Dog doesn't slepp");
    });

    it("Dog can eat plant",async()=>{
        dog = await Dog.deployed();
        let eat_ = await dog.eat("plant");
        assert.equal(eat_, "Nom-Nom", "Dog can not eat this");
    });

    it("Dog can eat meat",async()=>{
        dog = await Dog.deployed();
        let eat_ = await dog.eat("meat");
        assert.equal(eat_, "Nom-Nom", "Dog can not eat this");
    });

    it("Horse cannot eat ”chocolate”, ”not-food”, ”plastic”", async()=>{
        dog = await Dog.deployed();
        await testNotEat(dog, "chocolate");
        await testNotEat(dog, "not-food");
        await testNotEat(dog, "plastic");
    });

    it("Farmer can call Dog, Dog responds correctly", async()=>{
        dog = await Dog.deployed();
        farmer = await Farmer.deployed();
        let call_ = await testCall(dog);
        assert.equal(call_, "Woof", "It isn't a dog");
    });

    it("Farmer can feed Dog with plant, meat", async()=>{
        dog = await Dog.deployed();
        farmer = await Farmer.deployed();
        await testCanFeed(dog, "plant");
        await testCanFeed(dog, "meat");
    });

    it("Farmer can not feed Dog with ”not-food”, ”plastic” and anything else", async()=>{
        dorse = await Dog.deployed();
        farmer = await Farmer.deployed();
        await testCanNotFeed(dog, "not-food");
        await testCanNotFeed(dog, "plastic");
    });
})

async function getName(animal) {
	return await animal.getName();
}

async function sleep(animal) {
	return await animal.sleep();
}

async function eat(food) {
	return await animal.eat(food);
}

async function testNotEat(animal, food) {
    let notEat = "Can not eat";
    try{
        notEat = await animal.eat(food);
    }catch(e){
        //console.log(e.message);
    }
    assert.notEqual(notEat, "Nom-Nom", "Can eat this");
}

async function testCall(animal) {
    let call_ = "Hi";
    try{
        call_ = await farmer.call(animal.address);
    }catch(e){
        console.log(e.message);
    }
    assert.notEqual(call_, "Hi", "Can't call");
    return call_;
}

async function testCanFeed(animal, food) {
    let feed_ = "Good food";
    try{
        feed_ = await farmer.feed(animal.address, food);
    }catch(e){
        //console.log(e.message);
    }
    assert.equal(feed_, "Nom-Nom", "Can't feed");
}

async function testCanNotFeed(animal, food) {
    let feed_ = "Bad food";
    try{
        feed_ = await farmer.feed(animal.address, food);
    }catch(e){
        //console.log(e.message);
    }
    assert.notEqual(feed_, "Nom-Nom", "Can eat this");
}
