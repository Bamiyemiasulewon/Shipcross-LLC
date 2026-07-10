interface BadgeProps {
  type: 'new' | 'bestseller'
  className?: string
}

export default function Badge({ type, className = '' }: BadgeProps) {
  const styles = {
    new: 'bg-accent text-white',
    bestseller: 'bg-foreground text-background',
  }

  const text = type === 'new' ? 'New' : 'Bestseller'

  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded ${styles[type]} ${className}`}>
      {text}
    </span>
  )
}