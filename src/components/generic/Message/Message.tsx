interface props {
  color: string;
  message: string;
  fontSize?: string;
  fontStyle?: 'italic' | 'bold' | 'normal' | 'oblique';
}

export default function Message({ color, message }: props) {
  return (
    <div data-cy="errorMessage" className={`message message-color__${color}`}>
      {message}
    </div>
  );
}
