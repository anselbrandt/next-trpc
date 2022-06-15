import Layout from "../components/Layout";

export default function Page() {
  return (
    <Layout>
      <p>
        <em>You must be signed in to see responses.</em>
      </p>
      <h2>Session</h2>
      <p>/api/session</p>
      <iframe src="/api/session" />
      <h2>JSON Web Token</h2>
      <p>/api/token</p>
      <iframe src="/api/token" />
    </Layout>
  );
}
