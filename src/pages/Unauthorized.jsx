import ErrorPage from "../components/ErrorPage";

export default function Unauthorized() {
  return (
    <ErrorPage
      code="401"
      description="Unauthorized Access!"
      image="/img/ghost2.png"
    />
  );
}