
const f = async () => {
  return new Promise((resolve, reject) => {
    resolve("Hello!")
  })
}




const main = async () => {
  const message = await f()
  console.log(message)
}

main()
