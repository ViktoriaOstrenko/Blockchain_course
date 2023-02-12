pragma solidity 0.8.17;

contract HasName{
    string internal _name;

    constructor(string memory name){
        _name=name;
    }

    function getName() view public returns(string memory){
        return _name;
    }
}

abstract contract Animal{

    function eat(string memory food) view virtual public returns(string memory){
        return "Nom-Nom";
    }

    function sleep() view public returns(string memory){
        return "Z-z-z...";
    }

    function speak() view virtual public returns(string memory){
        return "...";
    }
}

library StringComparer{
    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}

abstract contract Herbivore is Animal, HasName{
    string constant PLANT = "plant";

    modifier eatOnlyPlant(string memory food){
        require(StringComparer.compare(food,PLANT),"Can only eat plant food");
        _;
    }

    function eat(string memory food) view override public eatOnlyPlant(food) returns(string memory){
        return super.eat(food);
    }
}

abstract contract Carnivora is Animal, HasName{
    string constant MEAT = "meat";

    modifier eatOnlyMeat(string memory food){
        require(StringComparer.compare(food,MEAT),"Can only eat meat food");
        _;
    }

    function eat(string memory food) view override eatOnlyMeat(food) public returns(string memory){
        return super.eat(food);
    }
}

abstract contract Omnivore is Animal, HasName{
    string constant FOOD1 = "plant";
    string constant FOOD2 = "meat";

    modifier PlantOrMeat(string memory food){
        require(StringComparer.compare(food,FOOD1) || StringComparer.compare(food,FOOD2), "Can eat this food");
        _;
    }

    function eat(string memory food) view override PlantOrMeat(food) public returns(string memory){
        return super.eat(food);
    }
}

contract Cow is Herbivore{

    constructor(string memory name) HasName(name){
    }

    function speak() view override public returns(string memory){
        return "Mooo";
    }
}

contract Horse is Herbivore{

    constructor(string memory name) HasName(name){
    }

    function speak() view override public returns(string memory){
        return "Igogo";
    }

}

contract Wolf is Carnivora{
    constructor(string memory name) HasName(name){
    }

    function speak() view override public returns(string memory){
        return "Awoo";
    }
}

contract Dog is Omnivore{
    constructor(string memory name) HasName(name){
    }

    function speak() view override public returns(string memory){
        return "Woof";
    }
}

contract Farmer{
    function feed(address animal, string memory food) view public returns(string memory){
        return Animal(animal).eat(food);
    }

    function call(address animal) view public returns(string memory){
        return Animal(animal).speak();
    }
}


