import express, { Request, Response } from 'express'
import { logger } from './lib/logger'

const app = express()

app.get('/', (req: Request, res: Response) => {
  logger.info('Handling request for /')
  res.send('Hello, World!')
})

app.listen(3000, () => {
  logger.info('App is listening on port 3000')
})