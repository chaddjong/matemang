interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return <p className="text-sm text-gray-500 text-center py-4">{message}</p>;
}
