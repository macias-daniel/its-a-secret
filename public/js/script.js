
$(() => {
  $(".post").on("click", (event) => {
    event.preventDefault()
    getAll()

  })
});