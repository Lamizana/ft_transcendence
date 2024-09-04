async function init_language(language, o) {

  if (id) {

    if (!o) {

      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

      const lang = {
        method: "PUT",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          language: language.toUpperCase(),
        }),
        credentials: "same-origin"
      }
      await fetch(`/game/language/${id}/`, lang)
    }
    urlLocationHandler();
  }


}