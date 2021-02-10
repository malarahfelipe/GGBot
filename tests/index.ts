import { Healer } from '../electron/modules/Healer/Healer'

(async () => {
  const healer = await Healer.getInstance()
  console.log('starting healer')
  setTimeout(() => healer.start(), 3000)
})()
