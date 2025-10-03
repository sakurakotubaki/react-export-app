export default function NameButton({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      {name}
    </button>
  )
}