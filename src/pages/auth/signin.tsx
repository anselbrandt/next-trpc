import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import nextAuthLogo from "../../../public/logo-sm.png";

const Signin = ({ csrfToken, providers }: any) => {
  if (!providers) return null;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 border rounded-md border-slate-300">
        <div className="text-center">
          <Image
            src={nextAuthLogo}
            alt="NextAuth Logo"
            width={136}
            height={150}
          />
        </div>
        <div className="mt-10">
          {Object.values(providers).map((provider: any) => (
            <div
              key={provider.id}
              className="bg-blue-500 hover:bg-blue-700 text-white text-lg  py-2 px-3 rounded w-auto inline-block"
            >
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
