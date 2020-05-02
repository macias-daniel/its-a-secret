const secretTextBox = $("#secretText")
const categorySelect = $("#categorySelect")
const postSecretButton = $(".post")
const switchViewButton = $(".switch-view")
let isMainView = true

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
  switchViewButton.on("click", (event => {
    event.preventDefault()
    switchView()

    if (isMainView === true) {
      switchViewButton.text("Post a Secret")
      isMainView = false
    } else {
      switchViewButton.text("View Secrets")
      isMainView = true
    }

  }))
});

function switchView() {
  $(".new-post-container").toggle()
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