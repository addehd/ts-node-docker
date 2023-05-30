import express, { Request, Response } from 'express'
import winston from 'winston'

const app = express()

console.log('Hello World!')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// If not in production log `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

app.get('/', (req: Request, res: Response) => {
  logger.info('Handling request for /')
  res.send('Hello World!')
})

app.listen(3011, () => {
  logger.info('App is listening on port 3011')
})