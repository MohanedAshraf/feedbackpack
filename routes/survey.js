const { Path } = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireCredits = require('../middlewares/requireCredits')
const requireLogin = require('../middlewares/requireLogin')

const Survey = mongoose.model('surveys')
const Mailer = require('../services/Mailer')

const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')
    const events = [...new Set(req.body.map(({ url, email }) => {
      const match = p.test(new URL(url).pathname)

      return match ? { email, surveyId: match.surveyId, choice: match.choice } : undefined
    }).filter(item => item))]

    events.forEach(({ surveyId, email, choice }) => {
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: { email: email, responded: false }
        }
      }, {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date()
      }).exec()

      console.log({ surveyId, email, choice })
    })

    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dataSent: Date.now()
    })
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()
      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
