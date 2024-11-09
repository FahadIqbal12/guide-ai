import React from 'react'
import { Dialog,DialogBackdrop } from '@headlessui/react'

const Modal = (props) => {
  return (
    <>
    <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
    <DialogBackdrop
    transition
    className="fixed inset-0 bg-gray-500 bg-opacity-55 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
  />
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    {props.children}
    </div>
    </Dialog>
    </>
  )
}

export default Modal