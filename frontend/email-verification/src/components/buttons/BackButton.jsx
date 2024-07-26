import { useNavigate } from "react-router-dom";

import backButton from "../../assets/button-back.png";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <img
      src={backButton}
      alt="Back Button"
      onClick={() => navigate(-1)}
      style={{ cursor: "pointer" }}
    />
  );
}
