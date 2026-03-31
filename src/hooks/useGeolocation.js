import { useCallback, useRef, useState } from 'react'

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 12000,
  maximumAge: 60000,
}

export function useGeolocation() {
  const [state, setState] = useState({
    coords: null,
    error: null,
    loading: false,
    granted: false,
    denied: false,
  })
  const watchId = useRef(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        denied: true,
      }))
      return
    }

    // Live GPS requires a secure context (HTTPS or localhost). Render / production URLs are HTTPS.
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setState(prev => ({
        ...prev,
        error:
          'Location needs a secure connection (HTTPS). Open this app using https:// or contact the site owner.',
        denied: true,
        loading: false,
      }))
      return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
          error: null,
          loading: false,
          granted: true,
          denied: false,
        })
      },
      (err) => {
        let message = 'Unable to retrieve your location.'
        if (err.code === err.PERMISSION_DENIED) {
          message = 'Location permission denied. Please enable it in your browser settings.'
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = 'Location information is unavailable.'
        } else if (err.code === err.TIMEOUT) {
          message = 'Location request timed out. Please try again.'
        }
        setState({
          coords: null,
          error: message,
          loading: false,
          granted: false,
          denied: err.code === err.PERMISSION_DENIED,
        })
      },
      GEOLOCATION_OPTIONS,
    )
  }, [])

  const watchPosition = useCallback(() => {
    if (!navigator.geolocation) return

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        setState(prev => ({
          ...prev,
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
          granted: true,
        }))
      },
      (err) => {
        console.warn('Watch position error:', err)
      },
      GEOLOCATION_OPTIONS,
    )
  }, [])

  const clearWatch = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clearWatch()
    setState({ coords: null, error: null, loading: false, granted: false, denied: false })
  }, [clearWatch])

  return {
    ...state,
    requestLocation,
    watchPosition,
    clearWatch,
    reset,
  }
}
