import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 300)
    clearTimeout(timers.current[id])
  }, [])

  const toast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, type, title, message, exiting: false }])
    timers.current[id] = setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  const success = useCallback((message, title = 'Success') =>
    toast({ type: 'success', title, message }), [toast])

  const error = useCallback((message, title = 'Error') =>
    toast({ type: 'error', title, message, duration: 5000 }), [toast])

  const info = useCallback((message, title = 'Info') =>
    toast({ type: 'info', title, message }), [toast])

  const warning = useCallback((message, title = 'Warning') =>
    toast({ type: 'warning', title, message }), [toast])

  return (
    <ToastContext.Provider value={{ toasts, toast, success, error, info, warning, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider')
  return ctx
}
