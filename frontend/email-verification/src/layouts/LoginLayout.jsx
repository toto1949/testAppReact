import { Outlet } from "react-router-dom";

function LoginLayout() {
  return (
    <div>
      <header>Login Header</header>
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
}

export default LoginLayout;
