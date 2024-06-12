interface Tinybird {
  trackEvent: (eventName: string, params: Record<string, any>) => void
}

declare var Tinybird: Tinybird | undefined | null
