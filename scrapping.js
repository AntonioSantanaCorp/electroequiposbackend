const puppeteer = require("puppeteer");

async function scrappingTiempo() {
  let data = [];
  let tiempoUrl = "https://www.eltiempo.com/tecnosfera/novedades-tecnologia";
  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(tiempoUrl, { waitUntil: "networkidle2" });

  data = await page.evaluate(() => {
    const infoExportar = [];

    //encabezado
    const encabezado = document.querySelector("div.apertura-seccion");
    infoExportar.push({
      imagen:
        encabezado.querySelector('div.recurso meta[itemprop="url"]')?.content ||
        "",
      fechaTexto:
        encabezado.querySelector("div.seccion-fecha span.actualizacion")
          ?.textContent || "",
      fecha:
        encabezado.querySelector("meta[itemprop='datePublished']")?.content ||
        "",
      titulo: encabezado.querySelector("h3.titulo a.boton")?.textContent || "",
      descripcion:
        encabezado.querySelector("div.lead a.boton")?.textContent || "",
    });

    let ultimasNoticias = document.querySelectorAll(
      "div.notas.mas-notas-bk div.nota.listing[itemscope]"
    );

    for (contenido of ultimasNoticias) {
      infoExportar.push({
        imagen:
          contenido.querySelector('div.recurso meta[itemprop="url"]')
            ?.content || "",
        fechaTexto:
          contenido.querySelector(
            "div.informacion div.seccion-fecha span.actualizacion"
          )?.textContent || "",
        fecha:
          contenido.querySelector(
            "div.informacion div.seccion-fecha meta[itemprop='datePublished']"
          )?.content || "",
        titulo:
          contenido.querySelector("div.informacion h3.titulo a.boton")
            ?.textContent || "",
        descripcion:
          contenido.querySelector("div.informacion div.lead a.boton")
            ?.textContent || "",
      });
    }

    return infoExportar;
  });

  await browser.close();
  return data;
}

module.exports = {
  Tiempo: scrappingTiempo,
};
