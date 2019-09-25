import {MarvelService} from './service/marvel-service'

const svc = new MarvelService()
const base = {
  a: 'allo',
  b: 'bonjour'
}

const augmented = {
  ...base,
  c: 'Salut'
}

console.log(JSON.stringify(augmented))






