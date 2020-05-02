
$(() => {
  $(".post").on("click", (event) => {
    event.preventDefault()
    const secretText = $("#secretText").val().trim()
    const category = $("#categorySelect").val()

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
    $("#secretText").val("")
    $("#categorySelect").val("notValid")

    console.log("Posted")
  })
});



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