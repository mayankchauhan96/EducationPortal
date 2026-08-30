import ContactForm from "../components/common/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-50 pt-28">
      <div className="container-shell py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">CONTACT</p>
          <h1 className="section-title">Let’s talk about your school’s next STEM step.</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Share a few details and we’ll help you explore the best fit for your students, teachers, and learning goals.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
