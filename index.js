// get data api
const getData = async() => {
  const api = "https://6023a95a6bf3e6001766b546.mockapi.io/todos"

  let response = await fetch(api)
  let results = await response.json()
  let user = document.querySelector(".list-user")

  user.innerHTML = "";

  results.map((result) => {
    let list = document.createElement("p")

    list.innerHTML = `<p>${result.name}</p>`
    user.appendChild(list)

    // Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteData("+ result.id + ")")
    let textDeleteButton = document.createTextNode("Delete");
    deleteButton.appendChild(textDeleteButton)
    user.appendChild(deleteButton)
    
    // Update Button
    let updateButton = document.createElement("button");
    updateButton.setAttribute("onclick", "updateData("+ result.id +")")
    let textUpdateButton = document.createTextNode("Update");
    updateButton.appendChild(textUpdateButton)
    user.appendChild(updateButton)
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
const deleteData = async(id) => {
  const api = "https://6023a95a6bf3e6001766b546.mockapi.io/todos"
  const response = await fetch(api+"/"+id, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  })
  const result = await response.json();
  getData()
}


// update data api
const updateData = async(id) => {
  const api = "https://6023a95a6bf3e6001766b546.mockapi.io/todos"
  const dataUpdate = prompt("Please input your new user name:")
  const updateDataObj = {
    name: dataUpdate
  }
  
  const response = await fetch(api+"/"+id, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updateDataObj)
  })
  const result = await response.json();
  getData()
}
