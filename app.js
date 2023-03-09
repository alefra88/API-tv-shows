const d = document,
  $shows = d.getElementById("shows"),
  $template = d.getElementById("show-template"),
  $fragment = d.createDocumentFragment();

d.addEventListener("keypress", async (e) => {
  if (e.target.matches("#search")) {
    // console.log(e.key, e.keyCode);
    if (e.key === "Enter") {
      try {
        $shows.innerHTML = `<img class="loader" src="https://raw.githubusercontent.com/alefra88/Proyectos-DOM-JavaScript/d8db6f6012761ba766fa5fd07692037dee898e51/assets/loader.svg" alt="cargando...">`;

        let query = e.target.value.toLowerCase(),
          api = `https://api.tvmaze.com/search/shows?q=${query}`,
          res = await fetch(api),
          json = await res.json();

        console.log(api, res, json);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        if (json.length === 0) {
          $shows.innerHTML = `<h2>No existen resultados para tu busqueda <mark>${query}</mark></h2>`;
        } else {
          json.forEach((el) => {
            $template.content.querySelector("h3").textContent = el.show.name;
            $template.content.querySelector("img").src = el.show.image.medium
              ? el.show.image.medium
              : "No image";
            $template.content.querySelector("div").innerHTML = el.show.summary
              ? el.show.summary
              : "without description";
            $template.content.querySelector("img").alt = el.show.name;
            $template.content.querySelector("img").style.maxWidth = "100%";
            $template.content.querySelector("a").href = el.show.url
              ? el.show.url
              : "#";
            $template.content.querySelector("a").target = el.show.url
              ? "_blank"
              : "_self";
            $template.content.querySelector("a").textContent = el.show.url
              ? "show more..."
              : "";

            let $clone = $template.content.cloneNode(true);
            $fragment.appendChild($clone);
          });
          $shows.innerHTML = "";
          $shows.appendChild($fragment);
        }
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $shows.innerHTML = `<p>Error${err.status}: ${message}</p>`;
      }
    }
  }
});
