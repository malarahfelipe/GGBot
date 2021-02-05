
export interface ICounter {
  onReachZero: () => void
  count?: number
}
export interface ICounterResponse {
  start: () => void
}

export const Counter = ({ onReachZero, id = 'counter', count = 3 }: ICounter & { id?: string }): ICounterResponse => {
  const start = () => {
    const element = document.createElement('div')
    element.setAttribute('id', id)
    element.classList.add('absolute', 'w-full', 'h-full', 'max-h-full', 'flex', 'top-0', 'bg-blur')
    document.body.appendChild(element)
    let counter = count
    const interval = setInterval(() => {
      if (!document.getElementById(id)) return

      const childs = document.getElementById(id).childNodes
      const oldSpan = childs && childs[0]
      if (oldSpan)
        document.getElementById(id).removeChild(oldSpan)

      const span = document.createElement('span')
      span.classList.add('text-7xl', 'm-auto', 'text-white', 'animate-ping')
      span.innerText = counter.toString()
      document.getElementById(id).appendChild(span)

      console.log('counter', counter)
      if (counter <= 0) {
        clearInterval(interval)
        onReachZero()
      } else counter = counter - 1
    }, 1000)
    setTimeout(() => document.getElementById(id).remove(), (count + 1) * 1000)
  }
  return {
    start
  }
}
