export default function SubmitButton({ buttonText, buttonValue }) {
  return (
    <button
      className="btn fw-bold mb-2 bg-main-purple w-100"
      type="submit"
      value={buttonValue}
    >
      {buttonText}
    </button>
  );
}
