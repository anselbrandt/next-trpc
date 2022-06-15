import Layout from "../../components/Layout";

export default function Page() {
  return (
    <Layout>
      <h1>This page is protected by Middleware</h1>
      <p>Only admin users can see this page.</p>
    </Layout>
  );
}
