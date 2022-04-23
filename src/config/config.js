// eslint-disable-next-line no-process-env
export const BFF_URL = process.env.NODE_ENV === 'production'
  ? 'https://shivipoetry-bff.herokuapp.com'
  : 'http://localhost:3001'

