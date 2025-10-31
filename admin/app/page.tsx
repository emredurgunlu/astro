import JsonViewer from "../components/JsonViewer";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">JSON Viewer Demo</h1>
      <div className="w-full max-w-4xl">
        <JsonViewer />
      </div>
    </main>
  );
}
