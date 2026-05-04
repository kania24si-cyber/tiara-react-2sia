import ErrorPage from "../components/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      description="You mustn't be here!"
      image="/img/ghost2.png"
    />
  );
}