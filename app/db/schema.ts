import { decimal, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

export const typeEnum = pgEnum('type', [
  'oficial',
  'blue',
  'mep',
  'cocos',
  'tarjeta',
  'mayorista',
  'ccl',
  'cripto',
])

export const historicalPrices = pgTable('historical-prices', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: typeEnum('type').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true })
    .defaultNow()
    .notNull(),
  ask: decimal('ask'),
  bid: decimal('bid'),
})

export type HistoricalPricesType = typeof historicalPrices.$inferInsert
