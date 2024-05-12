class Example {
  #id = 0;

  addID() {
    return this.#id += 1;
  }
}

let obj = new Example();

console.log(obj.addID());
console.log(obj.addID());
console.log(obj.addID());
console.log(obj.addID());