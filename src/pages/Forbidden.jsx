import ErrorPage from "../components/ErrorPage";

export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      description="Forbidden Page!"
      image="/img/ghost2.png"
    />
  );
}