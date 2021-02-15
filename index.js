// get data api
const getData = async() => {
  const api = "https://6023a95a6bf3e6001766b546.mockapi.io/todos"

  let response = await fetch(api)
  let results = await response.json()

  results.map((result) => {
    let user = document.querySelector(".list-user")
    let list = document.createElement("p")

    list.innerHTML = `
      <p>${result.name}</p>
      <button id="delete-button">Delete</button>
      <button id="update-button">Update</button>
    `
    user.appendChild(list)
  })
}
getData()

// create data api
let addButton = document.querySelector("#add-user")

const addData = async(e) => {
  e.preventDefault();
  
  let dataForm = document.querySelector("#input-user").value
  
  let dataObj = {
    name: dataForm
  }
  let dataJson = JSON.stringify(dataObj)
  const api = "https://6023a95a6bf3e6001766b546.mockapi.io/todos"
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJson,
  };
  try {
    const response = await fetch(api, options)
    const results = await response.json()

    getData()

    document.querySelector("#input-user").value = "";
    return results;
  }catch(error) {
    console.log(error)
    alert("Server Error")
  }

}
addButton.addEventListener("click", addData)

// delete data api
let deleteButton = document.querySelector("")
