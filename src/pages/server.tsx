import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};
