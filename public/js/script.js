//Content selctions
const secretTextBox = $("#secretText")
const categorySelect = $("#categorySelect")
const searchCategorySelect = $("#searchCategorySelect")

//Buttons
const postSecretButton = $(".post")
const switchViewButton = $(".switch-view")
const searchSecretButton = $(".search-secret")
const exitSecretButton = $(".exit-icon")

//Containers
const postSecretView = $(".new-post-container")
const searchSecretView = $(".search-secret-container")
const viewSecretView = $(".view-secret-container")

//Individual Element selector
const spinner = $(".spinner")
const secretAppend = $(".secret-append")

//Variable declaration
let isMainView = true
let isSearchDataView = false



$(() => {
  //Post secret button
  postSecretButton.on("click", (event) => {
    event.preventDefault()

    const secretText = secretTextBox.val().trim()
    const category = categorySelect.val()

    //Check if fields are empty
    if (category === "notValid" || secretText === "") {
      return console.log("Invalid input")
    }

    const newSecret = {
      content: secretText,
      category: category
    }

    postNewSecret(newSecret)

    //Clear text and category fields
    secretTextBox.val("")
    categorySelect.val("notValid")

    console.log("Posted")
  })


  //Switch view button
  switchViewButton.on("click", event => {
    event.preventDefault()
    toggleView()

    if (isMainView === true) {
      switchViewButton.text("Post a Secret")
      isMainView = false
    } else {
      switchViewButton.text("View Secrets")
      isMainView = true
    }

  })

  //Search for Secret button
  searchSecretButton.on("click", event => {
    event.preventDefault()

    const category = searchCategorySelect.val()

    if (category === "notValid") {
      return console.log("Invalid search option")
    }

    //Hide ssearch section and show search data section
    toggleSecretDisplay()
    toggleSpinner()

    //Get secret data
    getSecrets(category).then(secrets => {
      toggleSpinner()
      //searching for random only gives 1 secret so no array mustt be calle on its own
      if (category === "random") {
        displayIndividualSecret(secrets)
        return
      } else {
        secrets.forEach(secret => {
          displayIndividualSecret(secret)
        });
      }
    })
  })

  //Exit Secret View button
  exitSecretButton.on("click", event => {
    event.preventDefault()
    //Display search section and hide serach data section
    secretAppend.empty()
    toggleSecretDisplay()
  })
});


//========================================== Function Definitions ==========================================
function toggleSpinner() {
  spinner.toggle()
}

function toggleSecretDisplay() {
  switchViewButton.toggle()
  searchSecretView.toggle()
  viewSecretView.toggle()

}
function toggleView() {
  postSecretView.toggle()
  searchSecretView.toggle()
}


function displayIndividualSecret(secret) {
  const date = new Date(secret.dateCreated)
  const time = date.toLocaleTimeString()
  const dateString = (date + "").slice(3, 15)


  const secretDiv = $("<div class= 'secretContent'>")
  const timeSection = $(`<p>${dateString} ${time}</p>`)
  const secretContent = $(`<p>${secret.content}</p>`)

  secretDiv.append(timeSection, secretContent, $("<hr>"))

  secretAppend.append(secretDiv)
}

async function getSecrets(category) {
  const getUrl = `/api/secret/${category}`

  let secretData
  try {
    secretData = await fetch(getUrl)
  } catch (err) {
    console.log(err)
  }

  return secretData.json()
}



function postNewSecret(newSecret, cb) {
  try {
    fetch("/api/secret", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSecret)
    })
  } catch (err) {
    console.log(err)
  }
}