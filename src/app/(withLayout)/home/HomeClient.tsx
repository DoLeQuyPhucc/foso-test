import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="py-8 flex-grow">
        <div className="mx-auto px-[15%]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to SUNEIL
          </h1>
          <p className="text-gray-600">
            This is the main content area. The header component has been
            implemented above with the exact design and colors from your
            reference image.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
