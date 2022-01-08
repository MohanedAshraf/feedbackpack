const keys = require('../../config/keys')

module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style="text-align:center;">
        <h3> I'd like your input! </h3>
        <p> Please answer the following question: </p>
        <p> ${survey.body} </p>
        <diV>
          <a href="${keys.redirectDomain}/api/surveys/thanks"> Yes </a>
        </div>
        <diV>
          <a href="${keys.redirectDomain}/api/surveys/thanks"> No </a>
        </div>       
      </div>
    </body>

  </html>

  `
}
