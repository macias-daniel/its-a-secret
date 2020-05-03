const secretTextBox = $("#secretText")
const categorySelect = $("#categorySelect")
const searchCategorySelect = $("#searchCategorySelect")
const postSecretButton = $(".post")
const switchViewButton = $(".switch-view")
const searchSecretButton = $(".search-secret")
const exitSecretButton = $(".exit-icon")
const postSecretView = $(".new-post-container")
const searchSecretView = $(".search-secret-container")
const viewSecretView = $(".view-secret-container")
const spinner = $(".spinner")
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
      secretContent: secretText,
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
  console.log((date + "").slice(0, 15), time, secret.secretContent)
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