import landingPageComponents from "./components";
function page() {
  const { First, Second, Third } = landingPageComponents;
  return (
    <main>
      <First />
    </main>
  );
}

export default page;
