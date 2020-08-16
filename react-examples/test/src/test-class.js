class TestPropMethod {

  constructor (message) {
    this.message = message
    this.printMessage = this.printMessage.bind(this)
  }
  printMessage () {
    console.log(this.message)
  }

  printMessage2 = () => {
    console.log(this.message)
  }
}


const test1 = new TestPropMethod('hello')

console.log(TestPropMethod.prototype)
