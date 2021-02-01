import React from 'react'
import ReactDOM from 'react-dom'

export interface IOpenModal {
  title: string,
  children: JSX.Element,
  onConfirm: () => void
  onCancel?: () => void
}

export const Modal: React.FC<IOpenModal> = ({ title, children, onConfirm, onCancel }) =>
  <div className="modal z-50 opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center text-black">
    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

      <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        <span className="text-sm">(Esc)</span>
      </div>
      <div className="modal-content py-4 text-left px-6">
        <div className="flex justify-between items-center pb-3">
          <p className="text-2xl font-bold">{ title }</p>
          <div className="modal-close cursor-pointer z-50">
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>

        { children }

        <div className="flex justify-end pt-2">
          <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={onCancel}>Cancelar</button>
          <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={onConfirm}>Confirmar</button>
        </div>

      </div>
    </div>
  </div>

export const openConfirmModal = ({ title, children, onConfirm, onCancel }: IOpenModal): void => {
  const toggleModal = () => {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
  }

  document.onkeydown = (evt: KeyboardEvent) => {
    const { key, keyCode } = evt || (window.event as KeyboardEvent)
    const isEscape = key === 'Escape' || key === 'Esc' || keyCode === 27
    if (isEscape && document.body.classList.contains('modal-active'))
      return toggleModal()
  }

  const onConfirmModal = () => {
    toggleModal()
    onConfirm()
  }

  const onCancelModal = () => {
    toggleModal()
    if (onCancel)
      onCancel()
  }

  ReactDOM.render(
    // eslint-disable-next-line react/no-children-prop
    <Modal title={title} children={children} onConfirm={onConfirmModal} onCancel={onCancelModal}/>,
    document.getElementById('modal'),
    toggleModal
  )
}
