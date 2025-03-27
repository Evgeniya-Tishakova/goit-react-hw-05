import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>
        404 Not Found! Please foolow this <Link to="/">Home</Link>
      </p>
    </div>
  );
}
