// API responses
export interface CocosMEPResponse {
  // Regular MEP
  open: {
    ask: number
    bid: number
  }
  // Cocos MEP 24/7
  overnight: {
    ask: number
    bid: number
  }
}

export interface CriptoYaResponse {
  mayorista: {
    price: number
    variation: number
    timestamp: number
  }
  oficial: {
    price: number
    variation: number
    timestamp: number
  }
  ahorro: {
    ask: number
    bid: number
    variation: number
    timestamp: number
  }
  tarjeta: {
    price: number
    variation: number
    timestamp: number
  }
  blue: {
    ask: number
    bid: number
    variation: number
    timestamp: number
  }
  cripto: {
    ccb: {
      ask: number
      bid: number
      variation: number
      timestamp: number
    }
    usdt: {
      ask: number
      bid: number
      variation: number
      timestamp: number
    }
    usdc: {
      ask: number
      bid: number
      variation: number
      timestamp: number
    }
  }
  mep: {
    al30: {
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
    gd30: {
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
    lede: {
      name: string
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
    bpo27: {
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
  }
  ccl: {
    al30: {
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
    gd30: {
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
    lede: {
      name: string
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
    bpo27: {
      '24hs': {
        price: number
        variation: number
        timestamp: number
      }
      ci: {
        price: number
        variation: number
        timestamp: number
      }
    }
  }
}
