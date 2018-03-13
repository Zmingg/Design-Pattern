class Singleton {
	constructor(){
		if (typeof Singleton.instance === 'object') {
			return Singleton.instance;
		}
		Singleton.instance = this;
		return this;
	}
}

let single1 = new Singleton();
let single2 = new Singleton();
console.log(single1 === single2);