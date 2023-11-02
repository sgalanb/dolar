import { motion } from 'framer-motion'

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#001739"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void
  isOpen: boolean
}) => (
  <motion.button
    onClick={toggle}
    initial={false}
    animate={isOpen ? 'open' : 'closed'}
    className="flex h-12 w-12 items-center justify-center pr-1"
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        variants={{
          closed: { d: 'M 2 3 L 22 3' },
          open: { d: 'M 3 21 L 21 3' },
        }}
      />
      <Path
        d="M 2 12 L 22 12"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 21 L 22 21' },
          open: { d: 'M 3 3 L 21 21' },
        }}
      />
    </svg>
  </motion.button>
)
