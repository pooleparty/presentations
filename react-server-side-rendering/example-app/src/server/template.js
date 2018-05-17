function template(title, state = {}, content = '') {
  let scripts = '';
  if (content) {
    scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(state)}
                </script>
                <script src="public/scripts/clientSSR.js"></script>
                `;
  } else {
    scripts = ' <script src="public/scripts/clientCSR.js"> </script> ';
  }
  const page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
                <link href="public/styles/style.css" rel="stylesheet">
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      <!--- magic happens here -->  ${content}
                   </div>
                </div>

                  ${scripts}
              </body>
              `;

  return page;
}

module.exports = template;
