import DemoRequestForm from "../components/common/DemoRequestForm";

export default function DemoRequestPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      <div className="container-shell py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">BOOK A SCHOOL DEMO</p>
          <h1 className="section-title">Schedule a tailored walkthrough for your school.</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Tell us about your school, your goals, and the kind of learning experience you want to shape.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <DemoRequestForm />
        </div>
      </div>
    </main>
  );
}
