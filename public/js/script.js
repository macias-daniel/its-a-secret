$(() => {
  $(".post").on("click", (event) => {
    event.preventDefault()
    console.log("HELLO")
  })
});