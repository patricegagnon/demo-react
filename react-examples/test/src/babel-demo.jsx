
class ListeDeNombres {
  constructor(values) {
    this.values = values
  }
  somme () {
    if (!this.values) {
      return -1
    }
    return this.values.reduce((result, item) => result + item)
  }
  max () {
    if (!this.values) {
      return -1
    }
    return this.values.reduce((result, item) => result > item ? reesult : item)
  }
  getProperties() {
    const somme = liste.somme()
    const max = liste.max()
    return {
      somme, max
    }
  }
}
const listeBase = [1,2]
const liste = new ListeDeNombres([...listeBase,5])


const props = liste.getProperties()

console.log(`Props: ${JSON.stringify(props)}`)
const printListeProps = ({somme, max}) => {

  console.log(`Somme: ${somme}`)
  console.log(`Max: ${max}`)
}

printListeProps(props)
