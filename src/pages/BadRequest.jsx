import ErrorPage from "../components/ErrorPage";

export default function BadRequest() {
  return (
    <ErrorPage
      code="400"
      description="Bad Request!"
      image="/img/ghost2.png"
    />
  );
}