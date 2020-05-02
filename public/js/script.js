const secretTextBox = $("#secretText")
const categorySelect = $("#categorySelect")
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

  //Search for secret button
  searchSecretButton.on("click", event => {
    event.preventDefault()
    toggleSecretDisplay()
  })

  //Exit secret data view button
  exitSecretButton.on("click", event => {
    event.preventDefault()
    toggleSecretDisplay()
  })
});




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

function postNewSecret(newSecret) {
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